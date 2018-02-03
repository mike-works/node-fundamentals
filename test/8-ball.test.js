const { Writable, Readable } = require('stream');
const through = require('through');
const { assert } = require('chai');
const eightBall = require('../src/8-ball/8-ball');

describe('Exercise 1: Magic 8-ball', function() {
  after(function() {
    process.stdin.pause();
  });
  describe('exports', function() {
    it('should export a function called "main"', function() {
      assert.ok(eightBall.main, 'main export is found');
      assert.equal(typeof eightBall.main, 'function', '"main" is a function');
    });
  });

  describe('#main()', function() {
    let outData = '';
    let errData = '';
    let inn = through(
      writeData => {
        outData += writeData;
      },
      () => {
        // @ts-ignore
        this.queue(null);
      }
    );
    let out = through(writeData => {
      outData += writeData;
    });
    let err = through(writeData => {
      errData += writeData;
    });
    it('Should begin by asking the user "What do you wish to ask the oracle?"', function() {
      eightBall.main(inn, out, err);
      assert.ok(outData, 'something was written to process.stdout');
      assert.include(outData, 'What do you wish to ask');
      assert.notOk(errData, 'nothing was written to process.stderr');
      outData = '';
    });

    it('Should then emit an error message on stderr if question doesn\'t end with a "?"', function() {
      inn.emit('data', 'this is not a question');
      assert.include(
        errData,
        "That doesn't seem like a question",
        'Error message "That doesn\'t seem like a question" sent to stderr'
      );
      assert.notOk(outData, 'stdout has no additional content if question is not formatted correctly');
      errData = '';
      outData = '';
    });

    it('Should then emit an answer to stdout if question ends with a "?"', function() {
      inn.emit('data', 'is this a question?');
      assert.ok(outData, '8-ball answer written to stdout');
      assert.notOk(errData, 'stderr has no additional content if question is formatted correctly');
    });
  });
});
