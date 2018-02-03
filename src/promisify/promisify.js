const { join } = require('path');
const fs = require('fs');

function promisify(fn) {
  return function() {
    let args = [...arguments];
    return new Promise((resolve, reject) => {
      fn(
        ...[
          ...args,
          (err, data) => {
            if (err) reject(err);
            resolve(data);
          }
        ]
      );
    });
  };
}

/**
 *
 * @param {NodeJS.ReadStream} stdin
 * @param {NodeJS.WritableStream} stdout
 */
module.exports.main = function main(stdin, stdout) {
  let pReadDir = promisify(fs.readdir);
  stdout.write('Reading some files\n');
  pReadDir(join(__dirname, '..', '..')).then(res => {
    stdout.write(`res -> ${res}\n`);
  });
};
