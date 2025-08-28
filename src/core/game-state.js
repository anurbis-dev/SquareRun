/**
 * Game State Management
 * Manages the current state of the game and transitions between states
 */

export class GameState {
    constructor() {
        // Game states
        this.states = {
            MAIN_MENU: 'mainMenu',
            PLAYING: 'playing',
            PAUSED: 'paused',
            DEAD: 'dead',
            LEVEL_COMPLETE: 'levelComplete',
            LEVEL_READY: 'levelReady',
            ENTERING_PORTAL: 'enteringPortal',
            EXITING: 'exiting'
        };
        
        // Current state
        this.currentState = this.states.MAIN_MENU;
        
        // Game statistics
        this.stats = {
            score: 0,
            currentLevel: 1,
            totalDeaths: 0,
            levelDeaths: 0,
            pixelsCollected: 0,
            totalPixelsInLevel: 0,
            levelStartTime: 0,
            consecutiveDeaths: 0
        };
        
        // Time scaling for pause effects
        this.timeScale = 1.0;
        this.timeScaleTarget = 1.0;
    }
    
    /**
     * Set the current game state
     */
    setGameState(state) {
        if (this.states[state.toUpperCase()]) {
            this.currentState = this.states[state.toUpperCase()];
        } else {
            this.currentState = state;
        }
        
        // Handle state-specific actions
        this.handleStateChange();
    }
    
    /**
     * Get current state
     */
    getCurrentState() {
        return this.currentState;
    }
    
    /**
     * Check if game is in specific state
     */
    isInState(state) {
        return this.currentState === state;
    }
    
    /**
     * Check if game is active (playing)
     */
    isActive() {
        return this.currentState === this.states.PLAYING;
    }
    
    /**
     * Check if game is paused
     */
    isPaused() {
        return this.currentState === this.states.PAUSED;
    }
    
    /**
     * Check if player is dead
     */
    isDead() {
        return this.currentState === this.states.DEAD;
    }
    
    /**
     * Check if level is complete
     */
    isLevelComplete() {
        return this.currentState === this.states.LEVEL_COMPLETE;
    }
    
    /**
     * Handle state change actions
     */
    handleStateChange() {
        switch (this.currentState) {
            case this.states.PLAYING:
                this.timeScaleTarget = 1.0;
                break;
            case this.states.PAUSED:
                this.timeScaleTarget = 0.0;
                break;
            case this.states.DEAD:
                this.stats.levelDeaths++;
                this.stats.totalDeaths++;
                this.stats.consecutiveDeaths++;
                break;
            case this.states.LEVEL_COMPLETE:
                this.timeScaleTarget = 0.0;
                break;
            case this.states.LEVEL_READY:
                this.timeScaleTarget = 1.0;
                this.stats.levelStartTime = performance.now();
                break;
        }
    }
    
    /**
     * Update time scale for smooth transitions
     */
    update(dt) {
        const timeScaleDiff = this.timeScaleTarget - this.timeScale;
        if (Math.abs(timeScaleDiff) > 0.01) {
            this.timeScale += timeScaleDiff * 0.1;
        } else if (this.timeScale !== this.timeScaleTarget) {
            this.timeScale = this.timeScaleTarget;
        }
    }
    
    /**
     * Get scaled delta time
     */
    getScaledDeltaTime(dt) {
        return dt * this.timeScale;
    }
    
    /**
     * Reset level statistics
     */
    resetLevelStats() {
        this.stats.levelDeaths = 0;
        this.stats.pixelsCollected = 0;
        this.stats.consecutiveDeaths = 0;
        this.stats.levelStartTime = 0;
    }
    
    /**
     * Add score
     */
    addScore(points) {
        this.stats.score += points;
    }
    
    /**
     * Get current score
     */
    getScore() {
        return this.stats.score;
    }
    
    /**
     * Set current level
     */
    setLevel(level) {
        this.stats.currentLevel = level;
    }
    
    /**
     * Get current level
     */
    getCurrentLevel() {
        return this.stats.currentLevel;
    }
    
    /**
     * Increment level
     */
    nextLevel() {
        this.stats.currentLevel++;
    }
    
    /**
     * Add collected pixel
     */
    addCollectedPixel() {
        this.stats.pixelsCollected++;
    }
    
    /**
     * Get collected pixels count
     */
    getCollectedPixels() {
        return this.stats.pixelsCollected;
    }
    
    /**
     * Set total pixels in level
     */
    setTotalPixelsInLevel(total) {
        this.stats.totalPixelsInLevel = total;
    }
    
    /**
     * Get total pixels in level
     */
    getTotalPixelsInLevel() {
        return this.stats.totalPixelsInLevel;
    }
    
    /**
     * Get level completion percentage
     */
    getLevelCompletionPercentage() {
        if (this.stats.totalPixelsInLevel === 0) return 0;
        return (this.stats.pixelsCollected / this.stats.totalPixelsInLevel) * 100;
    }
    
    /**
     * Get level time
     */
    getLevelTime() {
        if (this.stats.levelStartTime === 0) return 0;
        return (performance.now() - this.stats.levelStartTime) / 1000;
    }
    
    /**
     * Get level deaths
     */
    getLevelDeaths() {
        return this.stats.levelDeaths;
    }
    
    /**
     * Get total deaths
     */
    getTotalDeaths() {
        return this.stats.totalDeaths;
    }
    
    /**
     * Get consecutive deaths
     */
    getConsecutiveDeaths() {
        return this.stats.consecutiveDeaths;
    }
    
    /**
     * Reset consecutive deaths
     */
    resetConsecutiveDeaths() {
        this.stats.consecutiveDeaths = 0;
    }
    
    /**
     * Check if level was completed perfectly (no deaths)
     */
    isPerfectLevel() {
        return this.stats.levelDeaths === 0;
    }
    
    /**
     * Get all statistics
     */
    getStats() {
        return { ...this.stats };
    }
    
    /**
     * Reset all game statistics
     */
    resetAllStats() {
        this.stats = {
            score: 0,
            currentLevel: 1,
            totalDeaths: 0,
            levelDeaths: 0,
            pixelsCollected: 0,
            totalPixelsInLevel: 0,
            levelStartTime: 0,
            consecutiveDeaths: 0
        };
    }
}
