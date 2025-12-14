# CodeX - Online Code Editor & Compiler

CodeX is a modern online code editor and compiler that allows you to write, execute, and share code in multiple programming languages. Built with React and Material-UI, it provides a seamless coding experience with real-time code execution.

## Features

- 🚀 **Multi-language Support**: Write and execute code in Java, C++, Python, C, Go, C#, and Node.js
- 💾 **Real-time Saving**: Your code automatically saves and updates in real-time
- 🔒 **Secure Sharing**: Share code links with friends without worrying about unauthorized changes
- 🎨 **Modern UI**: Beautiful dark-themed interface built with Material-UI
- ⚡ **Fast Execution**: Execute code instantly using the integrated CodeX API
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Screenshots

### Home Page
The main interface where you can create new code files and manage existing ones.

### Code Editor
A full-featured code editor with syntax highlighting, auto-completion, and code execution.

## Tech Stack

- **Frontend**: React 17, Material-UI 4
- **Code Editor**: React Ace Editor
- **Backend API**: CodeX API (included)
- **Database**: Firebase Realtime Database
- **Build Tool**: Create React App with CRACO

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn or npm
- Firebase account (for database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tusharwiz1/Codex.git
cd CodeX
```

2. Install dependencies:
```bash
yarn install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Update `src/components/firebase.js` with your Firebase configuration

4. Start the development server:
```bash
yarn start
```

The app will open at `http://localhost:3000`

### Running the API Locally

The project includes the CodeX API backend. To run it:

**Option 1: Using Docker (Recommended)**
```bash
npm run api:docker
```

**Option 2: Using Node.js**
```bash
npm run api:start
```

For more details, see [README-API.md](README-API.md)

## Project Structure

```
CodeX/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   │   ├── home/           # Home page
│   │   └── editor/        # Code editor page
│   ├── config/             # Configuration files
│   └── index.js            # Entry point
├── CodeX-API/              # Backend API (included)
└── package.json           # Dependencies
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `npm run api:start` - Start local API server
- `npm run api:docker` - Start API using Docker

## Configuration

### API Configuration

The API URL can be configured in `src/config/api.js` or via environment variable:

```bash
REACT_APP_API_URL=http://localhost:3001 yarn start
```

## Supported Languages

- **Java** - OpenJDK
- **Python** - Python 3
- **C++** - GCC/G++
- **C** - GCC
- **Go** - Go compiler
- **C#** - Mono compiler
- **Node.js** - Node.js runtime

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**Tushar Khanna**

- GitHub: [@tusharwiz1](https://github.com/tusharwiz1)

## Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [Material-UI](https://material-ui.com/)
- Code editor powered by [Ace Editor](https://ace.c9.io/)
- Backend API based on [CodeX-API](https://github.com/Jaagrav/CodeX-API)

---

Made with ❤️ by Tushar Khanna
# Codex
