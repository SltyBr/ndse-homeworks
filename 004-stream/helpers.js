const EXTENSION = '.txt';

const path = require('node:path');
const getFilePath = (filename) => `${path.join(__dirname, filename)}${EXTENSION}`;
const getFileName = (filepath) => path.basename(filepath);

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const yargsHelper = yargs(hideBin(process.argv));

exports.getFilePath = getFilePath;
exports.getFileName = getFileName;
exports.yargsHelper = yargsHelper;
