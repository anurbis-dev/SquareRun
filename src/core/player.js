/**
 * Player Module
 * Manages player character physics, movement, and state
 */

export class Player {
    constructor() {
        // Physical properties
        this.x = 150;
        this.y = 100;
        this.width = 40;
        this.height = 40;
        this.dx = 300; // Horizontal speed
        this.dy = 0;   // Vertical velocity
        
        // Physics constants
        this.gravity = 1800;
        this.jumpForce = -700;
        this.maxSpeed = 300;
        this.rotationSpeed = 6;
        
        // State
        this.onGround = false;
        this.wasOnGround = false;
        this.angle = 0;
        this.flashTime = 0;
        this.isDead = false;
        this.isRespawning = false;
        
        // Visual effects
        this.particles = [];
        this.lastSafePlatform = null;
        
        // Respawn properties
        this.respawnX = 150;
        this.respawnY = 100;
        this.consecutiveDeaths = 0;
        this.lastDeathPlatformId = -1;
    }
    
    /**
     * Update player physics and state
     */
    update(dt) {
        if (this.isDead || this.isRespawning) {
            this.updateParticles(dt);
            return;
        }
        
        // Apply gravity
        this.dy += this.gravity * dt;
        
        // Update position
        this.x += this.dx * dt;
        this.y += this.dy * dt;
        
        // Update rotation
        if (this.onGround) {
            this.angle = Math.round(this.angle / (Math.PI / 2)) * (Math.PI / 2);
        } else {
            this.angle += this.rotationSpeed * dt;
        }
        
        // Update flash effect
        if (this.flashTime > 0) {
            this.flashTime -= dt * 60;
        }
        
        // Update ground state
        this.wasOnGround = this.onGround;
        this.onGround = false; // Will be set by collision detection
        
        // Update particles
        this.updateParticles(dt);
    }
    
    /**
     * Make the player jump
     */
    jump() {
        if (this.onGround && !this.isDead && !this.isRespawning) {
            this.dy = this.jumpForce;
            this.onGround = false;
            return true; // Jump successful
        }
        return false; // Jump failed
    }
    
    /**
     * Handle collision with platform
     */
    handlePlatformCollision(platform) {
        // Check if landing on platform
        if (this.dy >= 0 && this.y + this.height >= platform.y && 
            this.y + this.height < platform.y + platform.height) {
            
            this.y = platform.y - this.height;
            this.dy = 0;
            this.onGround = true;
            this.lastSafePlatform = platform;
            return true;
        }
        
        // Check if hitting platform from below
        if (this.dy < 0 && this.y < platform.y + platform.height && 
            this.y > platform.y) {
            
            this.y = platform.y + platform.height;
            this.dy = 0;
            return true;
        }
        
        // Check if hitting platform from the side
        if (this.x + this.width > platform.x && this.x < platform.x + platform.width) {
            if (this.dx > 0 && this.x + this.width >= platform.x && 
                this.y + this.height > platform.y && this.y < platform.y + platform.height) {
                
                const ledgeHeight = (this.y + this.height) - platform.y;
                if (ledgeHeight > 0 && ledgeHeight < this.height / 2 && this.dy >= 0) {
                    this.y = platform.y - this.height;
                    this.dy = -120; // Small bounce
                    this.onGround = true;
                    this.lastSafePlatform = platform;
                    return true;
                } else {
                    this.die();
                    return false;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Handle collision with collectible
     */
    handleCollectibleCollision(collectible) {
        if (!collectible.active) return false;
        
        const dist = Math.hypot(
            this.x + this.width / 2 - collectible.x, 
            this.y + this.height / 2 - collectible.y
        );
        
        if (dist < this.width / 2 + collectible.size) {
            collectible.active = false;
            this.flashTime = 10;
            return true;
        }
        
        return false;
    }
    
    /**
     * Handle collision with teleport
     */
    handleTeleportCollision(teleport) {
        if (this.x + this.width > teleport.x && this.x < teleport.x + teleport.width &&
            this.y + this.height > teleport.y && this.y < teleport.y + teleport.height) {
            return true;
        }
        return false;
    }
    
    /**
     * Kill the player
     */
    die() {
        if (this.isDead) return;
        
        this.isDead = true;
        this.createExplosion();
        
        // Update consecutive deaths
        if (this.lastSafePlatform && this.lastSafePlatform.id === this.lastDeathPlatformId) {
            this.consecutiveDeaths++;
        } else {
            this.consecutiveDeaths = 1;
            this.lastDeathPlatformId = this.lastSafePlatform ? this.lastSafePlatform.id : -1;
        }
    }
    
    /**
     * Create explosion particles
     */
    createExplosion() {
        this.particles = [];
        const particleSize = this.width / 3;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.particles.push({
                    x: this.x + i * particleSize,
                    y: this.y + j * particleSize,
                    width: particleSize,
                    height: particleSize,
                    dx: (i - 1) * 200 + (Math.random() - 0.5) * 150,
                    dy: (j - 1) * 200 + (Math.random() - 0.5) * 150 - 250,
                    angle: 0,
                    angleV: (Math.random() - 0.5) * 20,
                    life: 1
                });
            }
        }
    }
    
    /**
     * Update explosion particles
     */
    updateParticles(dt) {
        this.particles.forEach(particle => {
            particle.x += particle.dx * dt;
            particle.y += particle.dy * dt;
            particle.dy += this.gravity * 0.8 * dt;
            particle.angle += particle.angleV * dt;
            particle.life -= dt;
        });
        
        this.particles = this.particles.filter(particle => particle.life > 0);
    }
    
    /**
     * Respawn the player
     */
    respawn() {
        this.isDead = false;
        this.isRespawning = false;
        this.particles = [];
        
        // Determine respawn position
        let respawnPlatform = this.lastSafePlatform;
        
        // If too many consecutive deaths, move back
        if (this.consecutiveDeaths > 6) {
            // This would need to be implemented with level manager
            this.consecutiveDeaths = 0;
        }
        
        if (!respawnPlatform) {
            // Default spawn position
            this.x = this.respawnX;
            this.y = this.respawnY;
        } else {
            this.x = respawnPlatform.x + 20;
            this.y = respawnPlatform.y - this.height - 20;
        }
        
        // Reset physics
        this.dx = this.maxSpeed;
        this.dy = 0;
        this.angle = 0;
        this.onGround = false;
        this.wasOnGround = false;
        this.flashTime = 0;
    }
    
    /**
     * Reset player to initial state
     */
    reset() {
        this.x = this.respawnX;
        this.y = this.respawnY;
        this.dx = this.maxSpeed;
        this.dy = 0;
        this.angle = 0;
        this.onGround = false;
        this.wasOnGround = false;
        this.flashTime = 0;
        this.isDead = false;
        this.isRespawning = false;
        this.particles = [];
        this.lastSafePlatform = null;
        this.consecutiveDeaths = 0;
        this.lastDeathPlatformId = -1;
    }
    
    /**
     * Set respawn position
     */
    setRespawnPosition(x, y) {
        this.respawnX = x;
        this.respawnY = y;
    }
    
    /**
     * Set last safe platform
     */
    setLastSafePlatform(platform) {
        this.lastSafePlatform = platform;
    }
    
    /**
     * Get player bounds for collision detection
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    /**
     * Get player center position
     */
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    
    /**
     * Check if player is on ground
     */
    isOnGround() {
        return this.onGround;
    }
    
    /**
     * Check if player just landed
     */
    justLanded() {
        return this.onGround && !this.wasOnGround;
    }
    
    /**
     * Check if player is dead
     */
    isDead() {
        return this.isDead;
    }
    
    /**
     * Check if player is respawning
     */
    isRespawning() {
        return this.isRespawning;
    }
    
    /**
     * Get player data for rendering
     */
    getRenderData() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            angle: this.angle,
            flashTime: this.flashTime,
            particles: this.particles
        };
    }
    
    /**
     * Increase player speed
     */
    increaseSpeed(amount) {
        this.maxSpeed += amount;
        this.dx = this.maxSpeed;
    }
    
    /**
     * Set player speed
     */
    setSpeed(speed) {
        this.maxSpeed = speed;
        this.dx = speed;
    }
}
