# Project Structure Documentation

## Overview

SquareRun is organized into a modular architecture with clear separation of concerns. Each module handles a specific aspect of the game, making the codebase maintainable and extensible.

## Directory Structure

```
SquareRun/
├── index.html                 # Main entry point
├── package.json              # Project configuration
├── README.md                 # Project documentation
├── PROJECT_STRUCTURE.md      # This file
├── game_structure_analysis.md # Original code analysis
├── .gitignore               # Git ignore rules
├── assets/                  # Static assets
│   └── styles/
│       └── main.css         # Game styles
└── src/                     # Source code
    ├── core/                # Core game systems
    ├── audio/               # Audio management
    ├── physics/             # Physics engine
    ├── rendering/           # Rendering system
    ├── ui/                  # User interface
    ├── levels/              # Level system
    └── utils/               # Utility functions
```

## Module Breakdown

### 🎯 Core Module (`src/core/`)

**Purpose**: Central game logic and coordination

**Files**:
- `game.js` - Main game controller and loop
- `game-state.js` - Game state management and statistics
- `player.js` - Player character physics and behavior
- `camera.js` - Camera system and viewport management

**Responsibilities**:
- Game initialization and lifecycle
- State transitions (menu → playing → pause → etc.)
- Player physics and movement
- Camera following and parallax
- Statistics tracking (score, deaths, time)

**Key Features**:
- Modular game loop with delta time
- Smooth camera following
- Player collision detection
- State machine for game flow

### 🎵 Audio Module (`src/audio/`)

**Purpose**: Sound and music management

**Files**:
- `audio-manager.js` - Audio system controller

**Responsibilities**:
- Tone.js integration
- Procedural music generation
- Sound effects (jump, landing, collect, death)
- Audio state management (play, pause, stop)
- Volume control and adaptive audio

**Key Features**:
- Procedural music with different scales
- Sound effect management
- Audio context initialization
- Mobile audio compatibility

### ⚡ Physics Module (`src/physics/`)

**Purpose**: Collision detection and physics simulation

**Files**:
- `physics-engine.js` - Physics system

**Responsibilities**:
- Platform collision detection
- Collectible collision detection
- Teleport collision detection
- Gravity and movement physics
- Active object management for performance

**Key Features**:
- Efficient collision detection
- Active object culling
- Physics constants management
- Performance optimization

### 🎨 Rendering Module (`src/rendering/`)

**Purpose**: Canvas rendering and visual effects

**Files**:
- `renderer.js` - Main rendering system

**Responsibilities**:
- Canvas setup and management
- Background rendering (sky, clouds, mountains)
- Platform and grass rendering
- Player and particle rendering
- Parallax effect implementation
- Pre-rendered level optimization

**Key Features**:
- Pre-rendered static elements
- Parallax scrolling layers
- Particle effects
- Performance-optimized rendering
- Responsive canvas sizing

### 🖥️ UI Module (`src/ui/`)

**Purpose**: User interface and menu system

**Files**:
- `ui-manager.js` - UI system controller

**Responsibilities**:
- Menu management (main, pause, level complete)
- Button event handling
- Statistics display
- Screen transitions
- Responsive UI scaling

**Key Features**:
- Menu state management
- Button event system
- Statistics display
- Screen fade effects
- Mobile-friendly UI

### 🏁 Levels Module (`src/levels/`)

**Purpose**: Level generation and management

**Files**:
- `level-manager.js` - Level system controller

**Responsibilities**:
- Procedural level generation
- Platform placement and sizing
- Collectible placement
- Teleport placement
- Difficulty scaling
- Level statistics tracking

**Key Features**:
- Procedural generation algorithms
- Difficulty progression
- Platform variety (gaps, slopes)
- Collectible distribution
- Level completion detection

### 🛠️ Utils Module (`src/utils/`)

**Purpose**: Utility functions and input handling

**Files**:
- `input-manager.js` - Input system controller

**Responsibilities**:
- Keyboard input handling
- Mouse input handling
- Touch input handling
- Fullscreen management
- Input event coordination

**Key Features**:
- Multi-platform input support
- Touch gesture recognition
- Fullscreen toggle
- Input event management
- Mobile optimization

## Data Flow

```
User Input → Input Manager → Game Controller → State Manager
                                                    ↓
Rendering ← Renderer ← Camera ← Player ← Physics Engine
    ↓
UI Manager → Menu System
```

## Module Dependencies

```
Game Controller (core/game.js)
├── Game State (core/game-state.js)
├── Player (core/player.js)
├── Camera (core/camera.js)
├── Audio Manager (audio/audio-manager.js)
├── Physics Engine (physics/physics-engine.js)
├── Renderer (rendering/renderer.js)
├── UI Manager (ui/ui-manager.js)
├── Level Manager (levels/level-manager.js)
└── Input Manager (utils/input-manager.js)
```

## Performance Considerations

### Rendering Optimizations
- **Pre-rendered Platforms**: Static level elements are rendered once
- **Active Object Culling**: Only visible objects are processed
- **Parallax Layers**: Background elements move at different speeds
- **Particle Management**: Limited particle count for effects

### Physics Optimizations
- **Spatial Partitioning**: Objects are organized by position
- **Collision Culling**: Only nearby objects are checked
- **Delta Time Scaling**: Smooth physics regardless of frame rate

### Audio Optimizations
- **Lazy Loading**: Audio is initialized on first use
- **Volume Scaling**: Audio adapts to game state
- **Context Management**: Audio context is managed efficiently

## Extension Points

### Adding New Features
1. **New Game Mechanics**: Add to appropriate core module
2. **New Visual Effects**: Extend rendering module
3. **New Audio**: Extend audio module
4. **New UI Elements**: Extend UI module
5. **New Level Types**: Extend levels module

### Adding New Modules
1. Create new directory in `src/`
2. Implement module with clear interface
3. Import and integrate with game controller
4. Update documentation

## Testing Strategy

### Unit Testing
- Each module can be tested independently
- Mock dependencies for isolated testing
- Test public interfaces of each module

### Integration Testing
- Test module interactions
- Test complete game flow
- Test performance under load

### Browser Testing
- Test on multiple browsers
- Test on mobile devices
- Test in Telegram Web App environment

## Future Enhancements

### Planned Modules
- **Save System**: Game progress persistence
- **Achievement System**: Player accomplishments
- **Settings Module**: Game configuration
- **Analytics Module**: Game statistics tracking

### Performance Improvements
- **WebGL Rendering**: Hardware acceleration
- **Web Workers**: Background processing
- **Service Workers**: Offline support
- **WebAssembly**: Critical path optimization
