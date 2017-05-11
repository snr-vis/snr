import {get, post} from 'axios';

// http://mediatemple.net/blog/tips/loading-and-using-external-data-in-react/
/**
 * @param {string} address: Address of OpenCPU format without trailing '/ocpu', e.g. `http://localhost:8004`
 */
class OpenCPUBridge {
	constructor(address) {
		this.address = address;
		this.isOnline = false;
		this.isOnlinePromise = this.checkServer();
	}

	/**
	 * Usage:
	 * runRCommand("stats", "rnorm", { n: 10, mean: 5 }).then(output => { 
	 *  console.log(output);
	 * });
	 * @param  {string} rpackage: Name of the `R` package ("stats")
	 * @param  {string} rfunction: Name of the `R` function ("rnorm")
	 * @param  {Object} params: JSON object of the parameters ("{ n: 10, mean: 5 }"")
	 * @param  {Boolean} measureTime: Measure execution time of command and output it in the console
	 * @return {Object} openCPU output
	 */
	async runRCommand(rpackage, rfunction, params, measureTime = true) {
		if (measureTime) console.time(`Measure Time: openCPURequest${rpackage}${rfunction}${JSON.stringify(params)}`);
		// Only proceed with the request when the OpenCPU server is online
		await this.isOnlinePromise;
		let response = await post(`${this.address}/ocpu/library/${rpackage}/R/${rfunction}`, params);
		// Check if we have the proper error code
		if (response.status !== 201)
			throw new Error(`openCPURequest${rpackage}${rfunction}${JSON.stringify(params)} gave response status ${response.status}, expected '201'`);
		let openCpuOutput = this.getOcpuOutput(response.data);
		// Now we have URLs for the output of the openCPU command, we get the output of those
		try	{
			await Promise.all(openCpuOutput.promises);
		} catch (error) { console.log(error); }
		
		// Remove the promises array since it is not needed anymore
		delete openCpuOutput.promises;
		if (measureTime) console.timeEnd(`Measure Time: openCPURequest${rpackage}${rfunction}${JSON.stringify(params)}`);
		return(openCpuOutput);
	}

	/**
	/* Checks availability of the OpenCPU server and returns a promise
	/* @return: {Promise} isOnline
	**/ 
	checkServer() {
		return get(`${this.address}/ocpu`)
			.then((response) => {
				// If status is 200, everything is fine, otherwise return error
				response.status === 200 ? this.isOnline = true : console.error(`OpenCPU returns status ${response.status}, connection cannot be established`);
			})
			.catch((error) => {
				// Server cannot be reached
				console.error(`OpenCPU Server ${this.address} cannot be reached`);
				console.error(error);
				this.isOnline = false;
			});
	}

	/**
	 * The output of a successfull OpenCPU POST looks like this:
	 * /ocpu/tmp/x028712f57c/R/.val
	 * /ocpu/tmp/x028712f57c/stdout
	 * /ocpu/tmp/x028712f57c/source
	 * /ocpu/tmp/x028712f57c/console
	 * /ocpu/tmp/x028712f57c/info
	 * /ocpu/tmp/x028712f57c/files/DESCRIPTION
	 * This function gets the information for all these URLs and puts them into an object like the following:
	 * {
	 *   .val: ..GET URL..
	 *   stdout: ..GET URL..
	 *   source: ..GET URL..
	 *   console: ..GET URL..
	 *   info: ..GET URL..
	 *   DESCRIPTION: ..GET URL..
	 * }
	 * Note: Images are stored in the array 'graphics', contain only their URL and are not fetched from the server
	 * @param  {Object} Answer from OpenCPU request
	 * @return {Object} Data from OpenCPU request as well as associated promises
	 **/
	getOcpuOutput(data) {
		// Data is provided as relative URLs divided by newlines
		data = data.split('\n');
		// prepare empty result as well as the associated promises
		let result = {promises: []};
		for (let i in data) {
			const url = data[i];
			// Only proceed if the URL contains non-whitespaces
			if (/\S/.test(url)) {
				// Split at forward slashes and get the last element as key /ocpu/tmp/x028712f57c/R/.val => .val
				let key = url.split('/');
				key = key[key.length - 1];
				// We have to handle graphics output separately
				if (/graphics/.test(url)) {
					// If we find a graphics object we only store the URL in a separate "graphics" object
					if (!('graphics' in result))
						result.graphics = [];
					result.graphics.push(this.address + url);
					// Do not perform the `get` on this URL, so continue with the next item in data
					continue;
				}
				// Initiate the get for the current key
				const promise = get(this.address + url)
					.then((response) => { result[key] = response.data; })
					.catch((error) => { console.error(`Could not access ${url}`); });
				result.promises.push(promise);
			}
		}
		return result;
	}
}

export default OpenCPUBridge;