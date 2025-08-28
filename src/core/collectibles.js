/**
 * Collectibles Module
 * Manages different types of collectible objects with various properties and effects
 */

export class Collectible {
    constructor(x, y, type = 'pixel') {
        this.x = x;
        this.y = y;
        this.active = true;
        this.collected = false;
        this.collectionTime = 0;
        
        // Base properties
        this.type = type;
        this.size = 8;
        this.value = 10;
        
        // Animation properties
        this.animationFrame = 0;
        this.animationSpeed = 0.1;
        this.bobOffset = 0;
        this.bobSpeed = 2;
        this.rotation = 0;
        this.rotationSpeed = 0;
        
        // Visual properties
        this.color = '#f1c40f';
        this.glowIntensity = 0;
        this.pulseEffect = 0;
        
        // Effects
        this.effects = [];
        
        // Initialize based on type
        this.initializeType(type);
    }
    
    /**
     * Initialize collectible based on type
     */
    initializeType(type) {
        const typeConfigs = {
            pixel: {
                name: 'Pixel',
                size: 8,
                value: 10,
                color: '#f1c40f',
                rotationSpeed: 0,
                effects: []
            },
            gem: {
                name: 'Gem',
                size: 12,
                value: 50,
                color: '#e74c3c',
                rotationSpeed: 2,
                effects: []
            },
            star: {
                name: 'Star',
                size: 15,
                value: 100,
                color: '#f39c12',
                rotationSpeed: 3,
                effects: []
            },
            powerUp: {
                name: 'Power-Up',
                size: 14,
                value: 25,
                color: '#9b59b6',
                rotationSpeed: 1.5,
                effects: [{
                    type: 'powerUp',
                    speedBoost: 1.5,
                    duration: 5000
                }]
            },
            formChange: {
                name: 'Form Change',
                size: 16,
                value: 75,
                color: '#3498db',
                rotationSpeed: 2.5,
                effects: [{
                    type: 'formChange',
                    form: 'circle'
                }]
            },
            health: {
                name: 'Health',
                size: 10,
                value: 30,
                color: '#2ecc71',
                rotationSpeed: 1,
                effects: [{
                    type: 'powerUp',
                    healthBoost: 1,
                    duration: 0
                }]
            },
            speedBoost: {
                name: 'Speed Boost',
                size: 11,
                value: 40,
                color: '#e67e22',
                rotationSpeed: 2,
                effects: [{
                    type: 'powerUp',
                    speedBoost: 2.0,
                    duration: 8000
                }]
            },
            jumpBoost: {
                name: 'Jump Boost',
                size: 11,
                value: 35,
                color: '#8e44ad',
                rotationSpeed: 1.8,
                effects: [{
                    type: 'powerUp',
                    jumpBoost: 1.8,
                    duration: 6000
                }]
            },
            invincibility: {
                name: 'Invincibility',
                size: 13,
                value: 60,
                color: '#f1c40f',
                rotationSpeed: 4,
                effects: [{
                    type: 'powerUp',
                    invincible: true,
                    duration: 4000
                }]
            },
            magnet: {
                name: 'Magnet',
                size: 12,
                value: 45,
                color: '#34495e',
                rotationSpeed: 2.2,
                effects: [{
                    type: 'powerUp',
                    magnet: true,
                    duration: 7000
                }]
            }
        };
        
        const config = typeConfigs[type] || typeConfigs.pixel;
        
        this.name = config.name;
        this.size = config.size;
        this.value = config.value;
        this.color = config.color;
        this.rotationSpeed = config.rotationSpeed;
        this.effects = config.effects;
        
        // Set animation speed based on type
        this.animationSpeed = 0.1 + (this.rotationSpeed * 0.05);
    }
    
    /**
     * Update collectible animation
     */
    update(dt) {
        if (!this.active) return;
        
        // Update animation frame
        this.animationFrame += dt * this.animationSpeed;
        
        // Update bob effect
        this.bobOffset = Math.sin(this.animationFrame * this.bobSpeed) * 2;
        
        // Update rotation
        this.rotation += this.rotationSpeed * dt;
        
        // Update glow effect
        this.glowIntensity = 0.5 + Math.sin(this.animationFrame * 3) * 0.3;
        
        // Update pulse effect
        if (this.pulseEffect > 0) {
            this.pulseEffect -= dt * 3;
        }
    }
    
    /**
     * Collect the item
     */
    collect() {
        if (!this.active || this.collected) return false;
        
        this.active = false;
        this.collected = true;
        this.collectionTime = performance.now();
        this.pulseEffect = 1;
        
        return true;
    }
    
    /**
     * Get collectible bounds
     */
    getBounds() {
        return {
            x: this.x - this.size / 2,
            y: this.y - this.size / 2,
            width: this.size,
            height: this.size
        };
    }
    
    /**
     * Get render data
     */
    getRenderData() {
        return {
            x: this.x,
            y: this.y + this.bobOffset,
            size: this.size,
            color: this.color,
            rotation: this.rotation,
            glowIntensity: this.glowIntensity,
            pulseEffect: this.pulseEffect,
            type: this.type,
            active: this.active
        };
    }
    
    /**
     * Check if collectible is visible
     */
    isVisible(cameraBounds) {
        const bounds = this.getBounds();
        return bounds.x + bounds.width > cameraBounds.left &&
               bounds.x < cameraBounds.right &&
               bounds.y + bounds.height > cameraBounds.top &&
               bounds.y < cameraBounds.bottom;
    }
}

/**
 * Collectible Manager
 * Manages all collectibles in the level
 */
export class CollectibleManager {
    constructor() {
        this.collectibles = [];
        this.collectedCount = 0;
        this.totalCount = 0;
        this.collectionEffects = [];
    }
    
    /**
     * Add a collectible
     */
    addCollectible(x, y, type = 'pixel') {
        const collectible = new Collectible(x, y, type);
        this.collectibles.push(collectible);
        this.totalCount++;
        return collectible;
    }
    
    /**
     * Add multiple collectibles
     */
    addCollectibles(positions, type = 'pixel') {
        positions.forEach(pos => {
            this.addCollectible(pos.x, pos.y, type);
        });
    }
    
    /**
     * Update all collectibles
     */
    update(dt) {
        this.collectibles.forEach(collectible => {
            collectible.update(dt);
        });
        
        // Update collection effects
        this.collectionEffects = this.collectionEffects.filter(effect => {
            effect.life -= dt;
            return effect.life > 0;
        });
    }
    
    /**
     * Check collision with player
     */
    checkPlayerCollision(player) {
        this.collectibles.forEach(collectible => {
            if (collectible.active && player.handleCollectibleCollision(collectible)) {
                this.collectItem(collectible);
            }
        });
    }
    
    /**
     * Collect an item
     */
    collectItem(collectible) {
        if (collectible.collect()) {
            this.collectedCount++;
            
            // Add collection effect
            this.collectionEffects.push({
                x: collectible.x,
                y: collectible.y,
                value: collectible.value,
                life: 1.0,
                type: collectible.type
            });
        }
    }
    
    /**
     * Get visible collectibles
     */
    getVisibleCollectibles(cameraBounds) {
        return this.collectibles.filter(collectible => 
            collectible.isVisible(cameraBounds)
        );
    }
    
    /**
     * Get collection progress
     */
    getCollectionProgress() {
        return {
            collected: this.collectedCount,
            total: this.totalCount,
            percentage: this.totalCount > 0 ? (this.collectedCount / this.totalCount) * 100 : 0
        };
    }
    
    /**
     * Reset all collectibles
     */
    reset() {
        this.collectibles.forEach(collectible => {
            collectible.active = true;
            collectible.collected = false;
        });
        this.collectedCount = 0;
        this.collectionEffects = [];
    }
    
    /**
     * Clear all collectibles
     */
    clear() {
        this.collectibles = [];
        this.collectedCount = 0;
        this.totalCount = 0;
        this.collectionEffects = [];
    }
    
    /**
     * Get all collectibles
     */
    getAllCollectibles() {
        return this.collectibles;
    }
    
    /**
     * Get collection effects
     */
    getCollectionEffects() {
        return this.collectionEffects;
    }
    
    /**
     * Add custom collectible type
     */
    addCollectibleType(typeName, config) {
        // This would extend the typeConfigs in Collectible class
        console.log(`Added custom collectible type: ${typeName}`, config);
    }
    
    /**
     * Generate random collectible type
     */
    generateRandomType() {
        const types = ['pixel', 'gem', 'star', 'powerUp', 'formChange', 'health', 'speedBoost', 'jumpBoost'];
        const weights = [0.4, 0.2, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05];
        
        const random = Math.random();
        let cumulativeWeight = 0;
        
        for (let i = 0; i < types.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return types[i];
            }
        }
        
        return 'pixel';
    }
}
