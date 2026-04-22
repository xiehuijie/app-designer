# App Designer VS Code Extension

VS Code extension that bundles App Designer JSON schemas so project files validate automatically and ships a starter command for quick smoke testing.

## Features

- Validates `appmeta.json` files against the bundled App Designer schema.
- Validates `*.type.json`, `*.field.json`, and `*.struct.json` files against the bundled type schemas.
- Provides the `Hello World` command (`test.helloWorld`) to confirm the extension loads.

## Usage

Open an App Designer workspace and edit your `appmeta` or type definition JSON files; VS Code uses the packaged schemas for validation and IntelliSense. Run **Hello World** from the command palette to verify the extension is active.
