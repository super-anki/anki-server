# Anki Server

Backend server to manage Anki Overdrive cars via HTTP API.

## Overview

This server provides a REST API to control Anki Overdrive cars using the [@super-anki/anki-sdk](https://github.com/super-anki/anki-sdk). It allows you to connect to cars, control their speed, lights, lane changes, and more through simple HTTP endpoints.

## Features

- 🚗 Discover and connect to Anki Overdrive cars
- 🎮 Control car speed, lights, and lane changes
- 📡 Real-time car battery and version information
- 🛤️ Track scanning capabilities
- 🔄 Auto-discovery of cars via Bluetooth
- 📝 Comprehensive logging

## Prerequisites

- Node.js 18+ or 20+
- Bluetooth adapter (for car communication)
- Anki Overdrive cars and track

## Installation

### From GitHub Packages

```bash
npm install @super-anki/anki-server
```

### From Source

```bash
git clone https://github.com/super-anki/anki-server.git
cd anki-server
npm install
npm run build
```

## Usage

### As a Standalone Server

#### Development Mode (with auto-reload)

```bash
npm start
```

#### Production Mode

```bash
npm run build
node dist/cli.js
# Or if installed globally/locally:
npx anki-server
```

### As a Library

You can also use this package as a library in your Node.js application:

```javascript
import { ApiService, LoggerFactory } from '@super-anki/anki-server';
import { CarStore } from '@super-anki/anki-sdk';

// Start the API service
const logger = LoggerFactory.getInstance();
const port = 3000;

logger.info("Starting server...");
CarStore.getInstance().startLooking();

new ApiService(port);
```

### Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (production or development)

Example:

```bash
PORT=8080 NODE_ENV=production node dist/cli.js
```

## API Endpoints

> **Note:** Most endpoints use POST methods, even for read operations. This is intentional as the car communication requires sending commands to the Bluetooth device, making these operations more like RPC calls than traditional REST operations.

### Cars

#### List Available Cars

```http
GET /cars
```

Returns a list of all discovered Anki cars.

#### Connect to a Car

```http
POST /cars/:id/connect
```

Connects to a specific car by ID.

#### Disconnect from a Car

```http
POST /cars/:id/disconnect
```

Disconnects from a specific car.

#### Set Car Speed

```http
POST /cars/:id/speed
```

**Body:**
```json
{
  "speed": 500,
  "acceleration": 1000
}
```

Controls the speed of the car (speed: 0-1000).

#### Control Car Lights

```http
POST /cars/:id/lights
```

**Body:**
```json
{
  "lights": 255
}
```

Set lights value for the car (numeric value).

#### Set Lights Pattern

```http
POST /cars/:id/lights-pattern
```

**Body:**
```json
{
  "redStart": 0,
  "redEnd": 255,
  "greenStart": 0,
  "greenEnd": 0,
  "blueStart": 0,
  "blueEnd": 0,
  "target": 0,
  "pattern": 1,
  "cycle": 1000
}
```

Apply custom light patterns to the car with RGB ranges and animation settings.

#### Change Lane

```http
POST /cars/:id/change-lane
```

**Body:**
```json
{
  "offset": 68.0,
  "speed": 500,
  "acceleration": 1000,
  "hopIntent": 0,
  "tag": 0
}
```

Changes the car's lane (positive values move right, negative move left). Optional parameters: `speed`, `acceleration`, `hopIntent`, and `tag`.

#### Cancel Lane Change

```http
POST /cars/:id/cancel-lane-change
```

Cancels an ongoing lane change.

#### Set Lane Offset

```http
POST /cars/:id/offset
```

**Body:**
```json
{
  "offset": 0.0
}
```

Fine-tune the car's position within its current lane.

#### Get Battery Level

```http
POST /cars/:id/battery
```

Returns the current battery level of the car.

#### Get Car Version

```http
POST /cars/:id/version
```

Returns firmware version information.

#### Ping Car

```http
POST /cars/:id/ping
```

Sends a ping to verify car connectivity.

#### Turn Car

```http
POST /cars/:id/turn
```

**Body:**
```json
{
  "direction": "left"
}
```

Controls car turning behavior. Valid directions: `"left"`, `"right"`, `"uturn"`, or `"uturn-jump"`.

### Track

#### Scan Track

```http
POST /track/scan
```

**Body:**
```json
{
  "carId": "car-id-here"
}
```

Initiates a track scan to map the track layout using the specified car.

## Development

### Available Scripts

- `npm start` - Start development server with auto-reload
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm test` - Run tests

### Project Structure

```
anki-server/
├── src/
│   ├── common/          # Shared utilities (logger, etc.)
│   ├── http/
│   │   └── handlers/    # API route handlers
│   │       ├── cars/    # Car control endpoints
│   │       └── track/   # Track-related endpoints
│   ├── services/        # Core services (API server)
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Application entry point
├── .github/
│   ├── workflows/       # GitHub Actions workflows
│   └── dependabot.yml   # Dependency update configuration
├── dist/                # Build output (generated)
└── logs/                # Server logs (generated)
```

### Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

Commit message format:
```
<type>(<scope>): <subject>

Examples:
feat: add new car speed control endpoint
fix: resolve connection timeout issue
docs: update API documentation
chore: update dependencies
```

## CI/CD

The project includes GitHub Actions workflows for:

- **CI** - Runs on every push and PR
  - Linting
  - Building
  - Testing

- **Release** - Runs on main branch
  - Automatic versioning using conventional commits
  - Changelog generation
  - Publishing to GitHub Packages
  - **Note**: First-time setup requires configuration. See [RELEASE_SETUP.md](RELEASE_SETUP.md) for details.

- **Dependabot** - Automatically updates dependencies
  - Daily checks for npm packages
  - Special handling for @super-anki/anki-sdk updates
  - Weekly checks for GitHub Actions

## Automatic SDK Updates

The server automatically receives updates when [@super-anki/anki-sdk](https://github.com/super-anki/anki-sdk) is updated through:

1. **Dependabot** - Creates PRs for @super-anki/anki-sdk updates daily
2. **Auto-merge** - Minor and patch updates can be configured for auto-merge
3. **CI Validation** - All updates are tested before merge

## Troubleshooting

### Bluetooth Issues

If cars are not discovered:
- Ensure Bluetooth is enabled on your system
- Check that your Bluetooth adapter supports BLE (Bluetooth Low Energy)
- Make sure cars are powered on and in range

### Connection Timeouts

If cars fail to connect:
- Restart the cars
- Restart the server
- Check logs in `logs/server.log`

### Port Already in Use

If you get a port conflict:
- Change the port using the `PORT` environment variable
- Kill any process using the default port 3000

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

MIT © Vincent Talbot

## Related Projects

- [@super-anki/anki-sdk](https://github.com/super-anki/anki-sdk) - Core SDK for Anki car communication

## Support

For issues and questions:
- GitHub Issues: https://github.com/super-anki/anki-server/issues
- Documentation: https://github.com/super-anki/anki-server#readme
