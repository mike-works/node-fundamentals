const { join } = require('path');
const fs = require('fs');
var inquirer = require('inquirer');

function getAllExercises() {
  let files = fs.readdirSync(__dirname);
  return files.filter(f => fs.statSync(join(__dirname, f)).isDirectory());
}

/**
 * Show the main exercise selection menu
 */
function showSelect() {
  let exerciseNames = getAllExercises();
  inquirer
    .prompt({
      name: 'ex',
      message: 'Which exercise do you want to run?',
      type: 'list',
      choices: exerciseNames
    })
    .then(({ ex }) => {
      require(`./${ex}/index`);
    });
}

showSelect();
