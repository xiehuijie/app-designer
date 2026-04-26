import { Command } from "commander";
import { printInfo, printSuccess, printSection, colors } from "../utils.js";

export function createPreviewCommand(): Command {
  const command = new Command("preview")
    .description("Preview the app in development mode")
    .option("-h, --host <host>", "Server host", "localhost")
    .option("-p, --port <port>", "Server port", "3000")
    .option("--open", "Automatically open in browser", false)
    .action(async (options) => {
      printSection("Starting Preview Server");

      const host = options.host;
      const port = options.port;
      const url = `http://${host}:${port}`;

      printInfo(`Server is running at: ${colors.bold(colors.blue(url))}`);

      // Placeholder implementation
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (options.open) {
        printInfo(`Opening in browser: ${colors.muted(url)}`);
      }

      printSuccess("Preview server started");
      printInfo("Press Ctrl+C to stop the server");

      // Keep the server running
      await new Promise(() => {
        // Never resolve - keep server running
      });
    });

  return command;
}
