const MAGIC_RESPONSES = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
];

function randomResponse() {
  let r = Math.floor(Math.random() * MAGIC_RESPONSES.length);
  return MAGIC_RESPONSES[r];
}

/**
 *
 * @param {NodeJS.ReadStream} stdin
 * @param {NodeJS.WritableStream} stdout
 * @param {NodeJS.WritableStream} stderr
 */
function handleQuestion(question, stdin, stdout, stderr) {
  if (!question.trim().endsWith('?')) {
    stderr.write("🛑  That doesn't seem like a question. Try again\n > ");
  } else {
    stdout.write(`🗣  ${randomResponse()}\n`);
    stdin.destroy();
  }
}

/**
 *
 * @param {NodeJS.ReadStream} stdin
 * @param {NodeJS.WritableStream} stdout
 * @param {NodeJS.WritableStream} stderr
 */
function main(stdin, stdout, stderr) {
  stdout.write('🔮  What do you wish to ask the oracle?\n > ');
  process.openStdin();
  stdin.on('data', function(key) {
    handleQuestion(key.toString(), stdin, stdout, stderr);
  });
}

module.exports = {
  main,
  handleQuestion,
  randomResponse
};
