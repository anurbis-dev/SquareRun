# Forms and Collectibles System

## Overview

The game features a dynamic system where the player character can change forms and collect various types of objects with different properties and effects.

## Player Forms System

### Available Forms

#### 1. **Square** (Default)
- **Size**: 40x40 pixels
- **Color**: Blue (#3498db)
- **Jump Force**: -700
- **Max Speed**: 300
- **Rotation Speed**: 6
- **Special Ability**: None
- **Description**: Balanced form with no special abilities

#### 2. **Circle**
- **Size**: 35x35 pixels
- **Color**: Red (#e74c3c)
- **Jump Force**: -600
- **Max Speed**: 350
- **Rotation Speed**: 8
- **Special Ability**: Bounce
- **Description**: Faster but lower jump, bounces off platforms

#### 3. **Triangle**
- **Size**: 45x40 pixels
- **Color**: Orange (#f39c12)
- **Jump Force**: -800
- **Max Speed**: 280
- **Rotation Speed**: 4
- **Special Ability**: Glide
- **Description**: Higher jump but slower, can glide through air

#### 4. **Star**
- **Size**: 38x38 pixels
- **Color**: Purple (#9b59b6)
- **Jump Force**: -750
- **Max Speed**: 320
- **Rotation Speed**: 10
- **Special Ability**: Double Jump
- **Description**: Can perform a second jump while in air

### Form Properties

Each form has the following properties:
- **Physical Dimensions**: Width and height
- **Visual Properties**: Color and appearance
- **Physics Properties**: Jump force, max speed, rotation speed
- **Special Abilities**: Unique gameplay mechanics
- **Animation Properties**: Rotation and visual effects

### Form Change Mechanics

- Forms can be changed by collecting specific collectibles
- Some forms are temporary (power-ups)
- Original form is restored when temporary effects expire
- Each form affects gameplay differently

## Collectibles System

### Collectible Types

#### 1. **Pixel** (Basic)
- **Size**: 8 pixels
- **Value**: 10 points
- **Color**: Yellow (#f1c40f)
- **Effects**: None
- **Rarity**: Common
- **Description**: Basic collectible for points

#### 2. **Gem**
- **Size**: 12 pixels
- **Value**: 50 points
- **Color**: Red (#e74c3c)
- **Effects**: None
- **Rarity**: Uncommon
- **Description**: Higher value collectible

#### 3. **Star**
- **Size**: 15 pixels
- **Value**: 100 points
- **Color**: Orange (#f39c12)
- **Effects**: None
- **Rarity**: Rare
- **Description**: High value collectible

#### 4. **Power-Up**
- **Size**: 14 pixels
- **Value**: 25 points
- **Color**: Purple (#9b59b6)
- **Effects**: Speed boost (1.5x for 5 seconds)
- **Rarity**: Uncommon
- **Description**: Temporary speed increase

#### 5. **Form Change**
- **Size**: 16 pixels
- **Value**: 75 points
- **Color**: Blue (#3498db)
- **Effects**: Changes player form
- **Rarity**: Rare
- **Description**: Permanently changes player form

#### 6. **Health**
- **Size**: 10 pixels
- **Value**: 30 points
- **Color**: Green (#2ecc71)
- **Effects**: Health boost
- **Rarity**: Uncommon
- **Description**: Restores player health

#### 7. **Speed Boost**
- **Size**: 11 pixels
- **Value**: 40 points
- **Color**: Orange (#e67e22)
- **Effects**: Speed boost (2.0x for 8 seconds)
- **Rarity**: Uncommon
- **Description**: Significant speed increase

#### 8. **Jump Boost**
- **Size**: 11 pixels
- **Value**: 35 points
- **Color**: Purple (#8e44ad)
- **Effects**: Jump boost (1.8x for 6 seconds)
- **Rarity**: Uncommon
- **Description**: Enhanced jumping ability

#### 9. **Invincibility**
- **Size**: 13 pixels
- **Value**: 60 points
- **Color**: Yellow (#f1c40f)
- **Effects**: Invincibility for 4 seconds
- **Rarity**: Rare
- **Description**: Temporary invincibility

#### 10. **Magnet**
- **Size**: 12 pixels
- **Value**: 45 points
- **Color**: Dark Gray (#34495e)
- **Effects**: Attracts nearby collectibles
- **Rarity**: Rare
- **Description**: Collectibles are drawn to player

### Collectible Properties

Each collectible has:
- **Physical Properties**: Size, position
- **Visual Properties**: Color, animation, glow effects
- **Value**: Points awarded when collected
- **Effects**: Gameplay modifications
- **Animation**: Rotation, bobbing, pulsing
- **Rarity**: Spawn frequency

### Collectible Effects

#### Effect Types

1. **Form Change**
   - Permanently changes player form
   - Example: `{ type: 'formChange', form: 'circle' }`

2. **Power-Up**
   - Temporary gameplay modifications
   - Examples:
     - `{ type: 'powerUp', speedBoost: 1.5, duration: 5000 }`
     - `{ type: 'powerUp', jumpBoost: 1.8, duration: 6000 }`
     - `{ type: 'powerUp', invincible: true, duration: 4000 }`

3. **Health Boost**
   - Restores player health
   - Example: `{ type: 'powerUp', healthBoost: 1, duration: 0 }`

#### Effect Duration

- **Instant**: Effects applied immediately (form changes, health)
- **Temporary**: Effects with duration timers (speed, jump boosts)
- **Permanent**: Effects that last until changed (form changes)

## Implementation Details

### Player Form System

```javascript
// Change player form
player.changeForm('circle');

// Add power-up effect
player.addPowerUp({
    speedBoost: 1.5,
    duration: 5000
});

// Get current form info
const formInfo = player.getCurrentForm();
```

### Collectible System

```javascript
// Create collectible
const collectible = new Collectible(x, y, 'gem');

// Add to manager
collectibleManager.addCollectible(x, y, 'powerUp');

// Check collection progress
const progress = collectibleManager.getCollectionProgress();
```

### Rendering

```javascript
// Get render data for player
const playerData = player.getRenderData();
// Includes: position, size, color, form, effects

// Get render data for collectibles
const collectibleData = collectible.getRenderData();
// Includes: position, size, color, animation, effects
```

## Extensibility

### Adding New Forms

```javascript
// Add new form to player
player.addForm('diamond', {
    name: 'Diamond',
    width: 42,
    height: 42,
    color: '#1abc9c',
    jumpForce: -750,
    maxSpeed: 310,
    rotationSpeed: 7,
    specialAbility: 'teleport'
});
```

### Adding New Collectible Types

```javascript
// Add custom collectible type
collectibleManager.addCollectibleType('crystal', {
    name: 'Crystal',
    size: 18,
    value: 150,
    color: '#00ff00',
    rotationSpeed: 4,
    effects: [{
        type: 'powerUp',
        speedBoost: 2.5,
        duration: 10000
    }]
});
```

## Game Balance

### Form Balance
- Each form has trade-offs (speed vs jump, etc.)
- Special abilities provide unique gameplay
- No form is strictly better than others

### Collectible Balance
- Rarity corresponds to value and effects
- Power-ups provide temporary advantages
- Form changes offer strategic choices

### Progression
- Early levels: Basic collectibles
- Mid levels: Power-ups and form changes
- Late levels: Rare collectibles and combinations

## Future Enhancements

### Planned Features
- **Form Combinations**: Multiple forms active simultaneously
- **Collectible Sets**: Collecting sets provides bonuses
- **Evolution System**: Forms evolve with use
- **Custom Forms**: Player-created forms
- **Seasonal Collectibles**: Limited-time collectibles

### Technical Improvements
- **Particle Effects**: Enhanced visual feedback
- **Sound Effects**: Unique sounds for each type
- **Achievements**: Collectible-based achievements
- **Statistics**: Detailed collection tracking
