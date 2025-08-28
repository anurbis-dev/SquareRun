# SquareRun

A 2D scroller game about the square-shaped character who can run and jump collecting different items. His goal is to reach the teleport at the end of each level.

## 🎮 Game Features

- **Smooth Platformer Physics**: Realistic jumping and movement mechanics
- **Procedural Level Generation**: Each level is uniquely generated with increasing difficulty
- **Procedural Music**: Dynamic music generation using Tone.js
- **Parallax Scrolling**: Beautiful background layers with depth effect
- **Collectible System**: Collect yellow pixels for points
- **Progressive Difficulty**: Speed increases with each level
- **Mobile Support**: Touch controls and responsive design
- **Telegram Mini App Support**: Optimized for Telegram Web Apps

## 🏗️ Project Structure

```
SquareRun/
├── index.html                 # Main game file
├── package.json              # Project dependencies
├── README.md                 # This file
├── game_structure_analysis.md # Detailed code analysis
├── assets/
│   └── styles/
│       └── main.css          # Game styles
└── src/
    ├── core/                 # Core game systems
    │   ├── game.js          # Main game controller
    │   ├── game-state.js    # Game state management
    │   ├── player.js        # Player character
    │   └── camera.js        # Camera system
    ├── audio/               # Audio system
    │   └── audio-manager.js # Sound and music management
    ├── physics/             # Physics engine
    │   └── physics-engine.js # Collision detection and physics
    ├── rendering/           # Rendering system
    │   └── renderer.js      # Canvas rendering
    ├── ui/                  # User interface
    │   └── ui-manager.js    # Menu and UI management
    ├── levels/              # Level system
    │   └── level-manager.js # Level generation and management
    └── utils/               # Utility functions
        └── input-manager.js # Input handling
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser with HTML5 Canvas support
- Node.js (optional, for development server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anurbis-dev/SquareRun.git
cd SquareRun
```

2. Install dependencies (optional):
```bash
npm install
```

### Running the Game

#### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

#### Option 2: Development Server (Recommended)
```bash
npm start
```
Then open `http://localhost:8080` in your browser.

## 🎯 How to Play

- **Click/Tap**: Jump
- **2 Fingers**: Toggle fullscreen
- **Right Mouse Button/Menu Icon**: Pause game
- **Space**: Jump (keyboard)
- **Escape**: Pause (keyboard)

## 🎵 Audio System

The game uses Tone.js for:
- Procedural music generation
- Sound effects (jump, landing, collect, death)
- Adaptive audio based on game state

## 🎨 Rendering System

- **Pre-rendered Platforms**: Static level elements are pre-rendered for performance
- **Active Object System**: Only nearby objects are processed for physics
- **Parallax Layers**: Multiple background layers with different scroll speeds
- **Particle Effects**: Explosion particles and visual feedback

## 🔧 Technical Details

### Performance Optimizations
- Pre-rendering of static level elements
- Active object culling for physics calculations
- Efficient collision detection
- Optimized rendering pipeline

### Mobile Optimizations
- Touch-friendly controls
- Responsive design
- Telegram Mini App compatibility
- iOS-specific fixes

### Browser Compatibility
- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Telegram Web App environment

## 📝 Development

### Code Structure
The game is organized into modular components:
- **Core**: Main game logic and coordination
- **Audio**: Sound and music management
- **Physics**: Collision detection and physics simulation
- **Rendering**: Canvas drawing and visual effects
- **UI**: Menu system and user interface
- **Levels**: Procedural level generation
- **Utils**: Helper functions and input handling

### Adding New Features
1. Create new module in appropriate directory
2. Import and integrate with main game controller
3. Update documentation

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Known Issues

- Some audio features may not work in all browsers due to autoplay policies
- Performance may vary on older devices

## 📞 Support

For issues and questions, please use the GitHub Issues page.
