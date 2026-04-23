# App Designer CLI

A command-line interface tool for App Designer that provides utilities for validating, generating, and managing app configurations.

## Installation

```bash
npm install -g @app-designer/cli
# or
pnpm add -g @app-designer/cli
```

## Usage

### Global Installation

After installation, you can use the CLI directly:

```bash
app-designer-cli [command] [options]
```

### Local Development

For development, you can run commands using:

```bash
pnpm cli [command] [options]
```

## Commands

### validate

Validate app configuration and schema.

```bash
app-designer-cli validate [options]

Options:
  -f, --file <path>  Path to config file (default: appmeta.json)
  -h, --help        Display help for this command
```

Example:
```bash
app-designer-cli validate --file appmeta.json
```

### generate

Generate code from app definition.

```bash
app-designer-cli generate [options]

Options:
  -t, --type <type>    Generator type (e.g., zod, openapi)
  -o, --output <path>  Output directory
  -f, --file <path>    Input config file (default: appmeta.json)
  -h, --help          Display help for this command
```

Example:
```bash
app-designer-cli generate --type zod --output ./generated
```

### init

Initialize a new app project with interactive prompts.

```bash
app-designer-cli init [options]

Options:
  -n, --name <name>  Project name
  -h, --help        Display help for this command
```

Example:
```bash
app-designer-cli init --name my-project
```

### build

Build the app for production.

```bash
app-designer-cli build [options]

Options:
  -m, --minify      Minify output (default: enabled)
  -s, --sourcemap   Generate source maps
  -h, --help       Display help for this command
```

Example:
```bash
app-designer-cli build --minify --sourcemap
```

### preview

Preview the app in development mode.

```bash
app-designer-cli preview [options]

Options:
  -h, --host <host>  Server host (default: localhost)
  -p, --port <port>  Server port (default: 3000)
  --open            Automatically open in browser
  --help           Display help for this command
```

Example:
```bash
app-designer-cli preview --host 0.0.0.0 --port 8080 --open
```

### start

Start the app in development mode with file watching.

```bash
app-designer-cli start [options]

Options:
  -w, --watch  Watch for file changes (default: enabled)
  -h, --help  Display help for this command
```

Example:
```bash
app-designer-cli start --watch
```

## Help

Display general help:

```bash
app-designer-cli --help
# or
app-designer-cli -h
```

Display help for a specific command:

```bash
app-designer-cli [command] --help
# or
app-designer-cli [command] -h
```

Display version:

```bash
app-designer-cli --version
# or
app-designer-cli -v
```

## Features

- 📝 Beautiful colored output with icons for different message types
- ⚡ Fast command execution
- 🎯 Interactive prompts for project initialization
- 🔄 Parameter validation and help support
- 📦 Built with mature libraries (commander, colorette, inquirer, ora)

## Development

### Building

```bash
pnpm build
```

### Development Mode (watch mode)

```bash
pnpm dev
```

### Running CLI Locally

```bash
pnpm cli [command] [options]
```

## Dependencies

- **commander**: Command-line argument parsing
- **colorette**: Terminal colors and styling
- **chalk**: Alternative to colorette for coloring
- **inquirer**: Interactive command-line prompts
- **ora**: Elegant spinner and progress indicators

## License

MIT
