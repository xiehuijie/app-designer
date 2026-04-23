#!/usr/bin/env node

import { program } from 'commander';
import { createValidateCommand } from './commands/validate.js';
import { createGenerateCommand } from './commands/generate.js';
import { createInitCommand } from './commands/init.js';
import { createBuildCommand } from './commands/build.js';
import { createPreviewCommand } from './commands/preview.js';
import { createStartCommand } from './commands/start.js';
import { bold, blue, gray } from 'colorette';
import pkg from '../package.json' with { type: 'json' };

const version = pkg.version;

function printWelcome(): void {
  console.log();
  console.log(bold(blue('╔════════════════════════════════════════╗')));
  console.log(bold(blue('║     App Designer CLI v' + version.padEnd(17) + '║')));
  console.log(bold(blue('╚════════════════════════════════════════╝')));
  console.log();
}

program
  .name('app-designer-cli')
  .description('CLI tool for App Designer')
  .version(version, '-v, --version', 'Display version')
  .hook('preAction', () => {
    // Print welcome on first action (not on --version or --help)
  });

// Register commands
program.addCommand(createValidateCommand());
program.addCommand(createGenerateCommand());
program.addCommand(createInitCommand());
program.addCommand(createBuildCommand());
program.addCommand(createPreviewCommand());
program.addCommand(createStartCommand());

// Custom help
program.on('--help', () => {
  console.log();
  console.log(gray('Examples:'));
  console.log(gray('  $ app-designer-cli init'));
  console.log(gray('  $ app-designer-cli validate --file appmeta.json'));
  console.log(gray('  $ app-designer-cli generate --type zod --output ./generated'));
  console.log(gray('  $ app-designer-cli build --minify'));
  console.log(gray('  $ app-designer-cli preview --port 3000 --open'));
  console.log(gray('  $ app-designer-cli start --watch'));
  console.log();
});

// Show help if no command is provided
if (process.argv.length <= 2) {
  printWelcome();
  program.outputHelp();
  process.exit(0);
}

// Parse arguments
program.parse(process.argv);
