# CodeX API Integration

This project now includes the CodeX API backend for local development.

## Quick Start

The frontend is configured to use the local API at `http://localhost:3001` by default. If the local API is not running, you can switch to the remote API.

## Running the API Locally

### Option 1: Using Docker (Recommended - Easiest)

**Prerequisites:** Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)

```bash
# Build and run the Docker container
cd CodeX-API
docker build --no-cache -t codex-api .
docker run -p 3001:8080 codex-api
```

Or use the npm script:
```bash
npm run api:docker
```

### Option 2: Using Node.js (Requires all language compilers installed)

**Prerequisites:** You need to install all language compilers:
- **Java (JDK)**: `brew install openjdk` (Mac) or download from [Oracle](https://www.oracle.com/java/technologies/downloads/)
- **Python 3**: Usually pre-installed on Mac, or `brew install python3`
- **GCC** (for C/C++): `xcode-select --install` (Mac) or `sudo apt-get install build-essential` (Linux)
- **Go**: `brew install go` (Mac) or download from [golang.org](https://go.dev/dl/)
- **Mono** (for C#): `brew install mono` (Mac) or `sudo apt-get install mono-complete` (Linux)
- **Node.js**: Already installed

```bash
# Install dependencies (already done)
cd CodeX-API
npm install

# Start the API on port 3001
PORT=3001 npm start
```

Or use the npm script:
```bash
npm run api:start
```

### Option 3: Using the provided script

```bash
# From the project root
./start-api.sh
```

## Running Both Frontend and Backend

### Terminal 1 - Start the API:
```bash
cd CodeX-API
PORT=3001 npm start
```

### Terminal 2 - Start the Frontend:
```bash
yarn start
```

The frontend will run on `http://localhost:3000` and the API on `http://localhost:3001`.

## Configuration

The API URL is configured in `src/config/api.js`. You can:

1. **Use environment variable** (recommended):
   ```bash
   # Use local API
   REACT_APP_API_URL=http://localhost:3001 yarn start
   
   # Use remote API
   REACT_APP_API_URL=https://api.codex.jaagrav.in yarn start
   ```

2. **Modify `src/config/api.js` directly** to change the default URL.

## Using Remote API (Fallback)

If you don't want to run the local API, you can use the remote API:

```bash
REACT_APP_API_URL=https://api.codex.jaagrav.in yarn start
```

Or modify `src/config/api.js` and change the default return value to `'https://api.codex.jaagrav.in'`.

## API Endpoints

- `POST /` - Execute code
- `GET /list` - List supported languages

For more details, see the [CodeX-API README](CodeX-API/README.md).

