# Game Structure Analysis: "Geometric Jumper"

## General Architecture
The game is a platformer with infinite rightward movement, written in HTML5 Canvas with JavaScript.

## Main Code Blocks:

### 1. **VARIABLE INITIALIZATION** (lines 200-280)
- Global game variables
- Physics settings (gravity, jump force, player speed)
- Game states (gameState)
- Player, camera, statistics objects

### 2. **AUDIO SYSTEM** (lines 290-420)
- Tone.js initialization
- Creating synthesizers for various sounds
- Procedural music generation
- Sound effects (jump, landing, collect items, death)

### 3. **LEVEL GENERATION** (lines 430-650)
- Platform creation with procedural generation
- Collectible item placement (pixels)
- Teleport creation at level end
- Parallax element generation (clouds, mountains, trees)

### 4. **PHYSICS AND MOVEMENT** (lines 660-850)
- Player position updates
- Platform collision detection
- Jump and landing system
- Death and respawn handling

### 5. **CAMERA AND RENDERING** (lines 860-1100)
- Smooth camera following the player
- Rendering all game elements
- Parallax effects for background
- Rendering optimization through pre-rendering

### 6. **CONTROLS** (lines 1110-1250)
- Keyboard and mouse handling
- Touch screen support
- Fullscreen mode gestures
- Pause system

### 7. **GAME STATES** (lines 1260-1400)
- Transitions between menus, game, pause
- Level system and progression
- Level completion handling
- Statistics and bonuses

### 8. **USER INTERFACE** (lines 1410-1643)
- HTML menu markup
- CSS styles for responsiveness
- Button handlers
- Statistics display

## Key Features:

### **Player Character**
- Square character with physics
- Jump and landing system
- Air rotation
- Effects when collecting items

### **Camera**
- Smooth following of the player
- Settings for portrait/landscape mode
- Parallax effects

### **Levels**
- Procedural platform generation
- Increasing difficulty with each level
- Safe respawn point system

### **Audio and Music**
- Procedural music generation
- Various sound effects
- Adaptive portal volume

### **Collectibles**
- Yellow pixels to collect
- Score counting system
- Visual effects when collecting

### **Parallax System**
- Clouds, mountains, trees
- Different movement speeds
- Rendering optimization

### **Performance Optimization**
- Pre-rendering of static elements
- Active object system
- Rendering buffering
