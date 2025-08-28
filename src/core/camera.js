/**
 * Camera Module
 * Manages camera movement and viewport calculations
 */

export class Camera {
    constructor() {
        // Camera position
        this.x = 0;
        this.y = 0;
        
        // Target position (where camera wants to be)
        this.targetX = 0;
        this.targetY = 0;
        
        // Camera settings
        this.smoothness = 0.05;
        this.offsetX = 0;
        this.offsetY = 0;
        
        // Viewport dimensions
        this.width = 0;
        this.height = 0;
        
        // Render buffer for off-screen objects
        this.renderBuffer = 0;
        
        // Parallax settings
        this.parallaxLayers = {
            sky: { speed: 0 },
            clouds: { speed: 0.02 },
            distantMountains: { speed: 0.03 },
            mountains: { speed: 0.05 },
            treesAndBushes: { speed: 0.1 / 3 }
        };
    }
    
    /**
     * Initialize camera with canvas dimensions
     */
    init(canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.renderBuffer = canvasWidth * 0.5;
        
        // Calculate camera offset based on aspect ratio
        const aspectRatio = canvasWidth / canvasHeight;
        if (aspectRatio < 1) { // Portrait mode
            this.offsetX = canvasWidth / 2.8;
            this.offsetY = canvasHeight / 1.6;
        } else { // Landscape mode
            this.offsetX = canvasWidth / 3.5;
            this.offsetY = canvasHeight / 1.8;
        }
    }
    
    /**
     * Update camera position
     */
    update(dt) {
        // Calculate smooth factor based on frame rate
        const smoothFactor = 1 - Math.pow(1 - this.smoothness, dt * 60);
        
        // Smoothly move camera towards target
        this.x += (this.targetX - this.x) * smoothFactor;
        this.y += (this.targetY - this.y) * smoothFactor;
    }
    
    /**
     * Follow a target (usually the player)
     */
    follow(target) {
        this.targetX = target.x - this.offsetX;
        this.targetY = target.y - this.offsetY;
    }
    
    /**
     * Set camera position directly
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
    }
    
    /**
     * Reset camera to initial position
     */
    reset() {
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
    }
    
    /**
     * Get camera bounds for culling
     */
    getBounds() {
        return {
            left: this.x - this.renderBuffer,
            right: this.x + this.width + this.renderBuffer,
            top: this.y - this.renderBuffer,
            bottom: this.y + this.height + this.renderBuffer
        };
    }
    
    /**
     * Check if an object is visible
     */
    isVisible(object) {
        const bounds = this.getBounds();
        
        return object.x + object.width > bounds.left &&
               object.x < bounds.right &&
               object.y + object.height > bounds.top &&
               object.y < bounds.bottom;
    }
    
    /**
     * Get world position from screen position
     */
    screenToWorld(screenX, screenY) {
        return {
            x: screenX + this.x,
            y: screenY + this.y
        };
    }
    
    /**
     * Get screen position from world position
     */
    worldToScreen(worldX, worldY) {
        return {
            x: worldX - this.x,
            y: worldY - this.y
        };
    }
    
    /**
     * Get parallax offset for a layer
     */
    getParallaxOffset(layerName) {
        const layer = this.parallaxLayers[layerName];
        if (!layer) return { x: 0, y: 0 };
        
        return {
            x: this.x * layer.speed,
            y: this.y * layer.speed
        };
    }
    
    /**
     * Get camera center position
     */
    getCenter() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    
    /**
     * Get camera position
     */
    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }
    
    /**
     * Get camera dimensions
     */
    getDimensions() {
        return {
            width: this.width,
            height: this.height
        };
    }
    
    /**
     * Set camera smoothness
     */
    setSmoothness(smoothness) {
        this.smoothness = Math.max(0, Math.min(1, smoothness));
    }
    
    /**
     * Set camera offset
     */
    setOffset(offsetX, offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    
    /**
     * Set render buffer size
     */
    setRenderBuffer(buffer) {
        this.renderBuffer = buffer;
    }
    
    /**
     * Shake camera effect
     */
    shake(intensity = 5, duration = 0.1) {
        // This would be implemented for screen shake effects
        // For now, just a placeholder
    }
    
    /**
     * Get camera transform matrix for rendering
     */
    getTransform() {
        return {
            x: -this.x,
            y: -this.y
        };
    }
}
