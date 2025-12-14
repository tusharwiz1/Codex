const {commandMap} = require("./instructions")
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const info = async (language) => {
    try {
        const {compilerInfoCommand} = commandMap('', language);
        const {stdout} = await exec(compilerInfoCommand);
        return stdout;
    } catch (error) {
        // Return a message if compiler is not installed
        return `Compiler not installed: ${language}`;
    }
}

module.exports = {info}