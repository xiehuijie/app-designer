import { Command } from 'commander';
import inquirer from 'inquirer';
import { printInfo, printSuccess, printSection, colors } from '../utils.js';

export function createInitCommand(): Command {
  const command = new Command('init')
    .description('Initialize a new app project')
    .option('-n, --name <name>', 'Project name')
    .action(async (options) => {
      printSection('Initializing New Project');
      
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name:',
          default: options.name || 'my-app',
          validate: (input) => input.trim().length > 0 || 'Project name cannot be empty',
        },
        {
          type: 'input',
          name: 'description',
          message: 'Project description:',
          default: 'A new App Designer project',
        },
        {
          type: 'input',
          name: 'author',
          message: 'Author name:',
          default: '',
        },
        {
          type: 'input',
          name: 'email',
          message: 'Author email:',
          default: '',
        },
        {
          type: 'list',
          name: 'template',
          message: 'Select a template:',
          choices: [
            { name: 'Basic', value: 'basic' },
            { name: 'Vue Component', value: 'vue' },
            { name: 'API Schema', value: 'api' },
          ],
          default: 'basic',
        },
      ]);
      
      // Placeholder implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      printSection('Project Configuration');
      printInfo(`Name: ${colors.muted(answers.name)}`);
      printInfo(`Description: ${colors.muted(answers.description)}`);
      if (answers.author) {
        printInfo(`Author: ${colors.muted(answers.author)}`);
      }
      if (answers.email) {
        printInfo(`Email: ${colors.muted(answers.email)}`);
      }
      printInfo(`Template: ${colors.muted(answers.template)}`);
      
      printSuccess('Project initialized successfully');
    });

  return command;
}
