/**
 * Main Game Module
 * Coordinates all game systems and manages the game loop
 */

// Import all game modules
import { AudioManager } from '../audio/audio-manager.js';
import { PhysicsEngine } from '../physics/physics-engine.js';
import { Renderer } from '../rendering/renderer.js';
import { UIManager } from '../ui/ui-manager.js';
import { LevelManager } from '../levels/level-manager.js';
import { InputManager } from '../utils/input-manager.js';
import { GameState } from '../core/game-state.js';
import { Player } from '../core/player.js';
import { Camera } from '../core/camera.js';
import { CollectibleManager } from '../core/collectibles.js';

/**
 * Main Game Class
 * Manages the entire game lifecycle and coordinates all systems
 */
class Game {
    constructor() {
        // Initialize core systems
        this.state = new GameState();
        this.player = new Player();
        this.camera = new Camera();
        
        // Initialize managers
        this.audioManager = new AudioManager();
        this.physicsEngine = new PhysicsEngine();
        this.renderer = new Renderer();
        this.uiManager = new UIManager();
        this.levelManager = new LevelManager();
        this.inputManager = new InputManager();
        this.collectibleManager = new CollectibleManager();
        
        // Game loop variables
        this.lastTime = 0;
        this.deltaTime = 0;
        
        // Bind methods
        this.gameLoop = this.gameLoop.bind(this);
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        
        // Initialize the game
        this.init();
    }
    
    /**
     * Initialize the game
     */
    async init() {
        try {
            // Initialize all systems
            await this.audioManager.init();
            this.physicsEngine.init();
            this.renderer.init();
            this.uiManager.init();
            this.levelManager.init();
            this.inputManager.init();
            this.collectibleManager.init();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Start the game loop
            this.startGameLoop();
            
            console.log('Game initialized successfully');
        } catch (error) {
            console.error('Failed to initialize game:', error);
        }
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('resize', () => this.renderer.resize());
        
        // Input events
        this.inputManager.on('jump', () => this.player.jump());
        this.inputManager.on('pause', () => this.togglePause());
        this.inputManager.on('fullscreen', (enter) => this.toggleFullscreen(enter));
        
        // UI events
        this.uiManager.on('play', () => this.startGame());
        this.uiManager.on('pause', () => this.togglePause());
        this.uiManager.on('resume', () => this.resumeGame());
        this.uiManager.on('restart', () => this.restartLevel());
        this.uiManager.on('nextLevel', () => this.nextLevel());
        this.uiManager.on('exit', () => this.exitGame());
    }
    
    /**
     * Start the game loop
     */
    startGameLoop() {
        requestAnimationFrame(this.gameLoop);
    }
    
    /**
     * Main game loop
     */
    gameLoop(timestamp) {
        // Calculate delta time
        if (!this.lastTime) this.lastTime = timestamp;
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        
        // Cap delta time to prevent large jumps
        if (this.deltaTime > 0.1) this.deltaTime = 0.1;
        
        // Update and render
        this.update(this.deltaTime);
        this.render();
        
        // Continue the loop
        requestAnimationFrame(this.gameLoop);
    }
    
    /**
     * Update game state
     */
    update(dt) {
        // Only update if game is active
        if (!this.state.isActive()) return;
        
        // Update all systems
        this.player.update(dt);
        this.physicsEngine.update(dt);
        this.camera.update(dt);
        this.levelManager.update(dt);
        this.collectibleManager.update(dt);
        this.audioManager.update(dt);
        
        // Check collectible collisions
        this.collectibleManager.checkPlayerCollision(this.player);
        
        // Check for level completion
        if (this.levelManager.isLevelComplete()) {
            this.completeLevel();
        }
        
        // Check for player death
        if (this.player.isDead()) {
            this.handlePlayerDeath();
        }
    }
    
    /**
     * Render the game
     */
    render() {
        this.renderer.render(this.camera, this.player, this.levelManager, this.collectibleManager);
    }
    
    /**
     * Start a new game
     */
    startGame() {
        this.state.setGameState('playing');
        this.levelManager.loadLevel(1);
        this.player.reset();
        this.camera.reset();
        this.audioManager.playMusic();
        this.uiManager.hideAllMenus();
    }
    
    /**
     * Toggle pause state
     */
    togglePause() {
        if (this.state.isPaused()) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }
    
    /**
     * Pause the game
     */
    pauseGame() {
        this.state.setGameState('paused');
        this.audioManager.pauseMusic();
        this.uiManager.showPauseMenu();
    }
    
    /**
     * Resume the game
     */
    resumeGame() {
        this.state.setGameState('playing');
        this.audioManager.resumeMusic();
        this.uiManager.hideAllMenus();
    }
    
    /**
     * Restart current level
     */
    restartLevel() {
        this.levelManager.restartLevel();
        this.player.reset();
        this.camera.reset();
        this.uiManager.hideAllMenus();
    }
    
    /**
     * Go to next level
     */
    nextLevel() {
        const nextLevel = this.levelManager.getCurrentLevel() + 1;
        this.levelManager.loadLevel(nextLevel);
        this.player.reset();
        this.camera.reset();
        this.uiManager.hideAllMenus();
    }
    
    /**
     * Complete current level
     */
    completeLevel() {
        this.state.setGameState('levelComplete');
        this.audioManager.playVictorySound();
        this.uiManager.showLevelCompleteMenu();
    }
    
    /**
     * Handle player death
     */
    handlePlayerDeath() {
        this.state.setGameState('dead');
        this.audioManager.playDeathSound();
        this.uiManager.showDeathMenu();
        
        // Respawn after delay
        setTimeout(() => {
            this.player.respawn();
            this.state.setGameState('playing');
            this.uiManager.hideAllMenus();
        }, 1000);
    }
    
    /**
     * Toggle fullscreen
     */
    toggleFullscreen(enter = true) {
        if (enter && !document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (!enter && document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
    
    /**
     * Exit the game
     */
    exitGame() {
        this.state.setGameState('exiting');
        this.audioManager.stopAll();
        this.uiManager.showExitScreen();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});

// Export for testing
export { Game };
