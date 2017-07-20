import bcrypt from 'bcryptjs';

/**
 * Using bcryptjs implementation
 * Example: [https://www.npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs)
 * Exchange with Node server should follow [https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24](https://medium.com/@alexmngn/from-reactjs-to-react-native-what-are-the-main-differences-between-both-d6e8e88ebf24)
 */
class Authentication {
	/**
   * Authentication takes care of login and receiving and storing the login token
   * @param {Object} nodeBridge to the backend to perform login and receive the token
   */
	constructor(nodeBridge) {
		this.nodeBridge = nodeBridge;
	}

	async login(user, password) {
		const response = await this.nodeBridge.login(user, password);
		if (response.success) {
      localStorage.setItem(response.token, response.token);
      return true;
		} else {
      console.error(`Login failed`);
      return false;
		}
	}

	// TODO: Remove unused hashing code and remove bcrypt dependency
	/**
   * Create bcrypt hash from password
   * @param {String} password to hash
   * @return {String} hash of password
   */
	getHash(password) {
		// Generate a salt
		const salt = bcrypt.genSaltSync(10);
		// Hash the password with the salt
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	}

	/**
   * Check if password and hash are matching
   * @param {String} password to check
   * @param {String} hash to check
   * @return {Bool} result of check
   */
	checkPassword(password, hash) {
		return bcrypt.compareSync(password, hash);
	}

	/**
   * Testing function to see whether the hashing runs as expected
   * @param {String} password to run the test with
   */
	testLocalHashing(password) {
		const hash = this.getHash(password);
		const matchesShouldBeTrue = this.checkPassword(password, hash);
		const matchesShouldBeFalse = this.checkPassword(`${password}++`, hash);
		console.log(
			`Test hashing for password ${password}. Hash is ${hash}. Check with ${password} yields ${matchesShouldBeTrue}, check with ${password}++ yields ${matchesShouldBeFalse}.`
		);
	}
}

export default Authentication;