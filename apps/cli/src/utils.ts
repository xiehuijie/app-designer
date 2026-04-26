import { bold, green, red, yellow, blue, gray } from "colorette";
import type { Ora } from "ora";
import ora from "ora";

export const colors = {
  success: green,
  error: red,
  warning: yellow,
  info: blue,
  muted: gray,
  bold,
  blue,
};

export function printSuccess(message: string): void {
  console.log(colors.success(`✓ ${message}`));
}

export function printError(message: string): void {
  console.log(colors.error(`✗ ${message}`));
}

export function printWarning(message: string): void {
  console.log(colors.warning(`⚠ ${message}`));
}

export function printInfo(message: string): void {
  console.log(colors.info(`ℹ ${message}`));
}

export function printMuted(message: string): void {
  console.log(colors.muted(message));
}

export function createSpinner(text: string): Ora {
  return ora(text);
}

export function printSection(title: string): void {
  console.log();
  console.log(colors.bold(colors.blue(`▶ ${title}`)));
  console.log();
}

export function printSeparator(): void {
  console.log();
}
