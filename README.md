# MIDGARD 5 Character Generator - Refactored

A character creation tool for the MIDGARD 5 tabletop RPG system, now with modern architecture and maintainable code.

## Version 2.0.0 - Major Refactor

This version represents a complete restructure of the codebase for better maintainability and future development.

## Quick Start

```bash
# Run the new refactored version
node index.js
```

## New Architecture

### Directory Structure

```
midgard5-chargen/
├── index.js                    # New entry point (async/await)
├── Characters/                 # Saved character files
├── lib/                        # Original data files
│   ├── class_abilities.json
│   ├── race_abilities.json
│   ├── specialAbilities.json
│   └── xpCosts_Classes.json
└── src/                        # New modular code
    ├── models/
    │   └── Character.js        # Character class with validation
    ├── services/
    │   ├── CharacterService.js # Business logic
    │   └── FileService.js      # File operations
    ├── ui/
    │   └── prompts.js          # User interaction (async/await)
    ├── data/
    │   ├── races.json          # Race definitions
    │   └── classes.json        # Class definitions
    └── utils/
        ├── calculations.js     # Stat calculations
        └── display.js          # Display formatting
```

## Key Improvements

### 1. **Modular Architecture**
- **Separation of Concerns**: UI, business logic, and data are cleanly separated
- **Models**: Character class encapsulates all character data
- **Services**: Reusable business logic components
- **Utilities**: Shared helper functions

### 2. **Modern JavaScript**
- **Async/Await**: Replaced callback hell with clean async/await syntax
- **Classes**: OOP approach with Character model
- **Promises**: All async operations use promises

### 3. **Data-Driven Design**
- **JSON Configuration**: Race and class rules in JSON files
- **Easy to Extend**: Add new races/classes by editing JSON
- **No Hardcoded Logic**: Rules are data, not code

### 4. **Better Maintainability**
- **Single Responsibility**: Each file has one clear purpose
- **Reusable Components**: Services can be used independently
- **Testable**: Logic is decoupled from UI

### 5. **Enhanced Features**
- **JSON Export**: Characters saved in both text and JSON format
- **Validation**: Character data validation built-in
- **Error Handling**: Proper error handling throughout

## Code Organization

### Models (`src/models/`)
**Character.js** - Character data structure
- Properties for all character attributes
- `validate()` - Validates character data
- `toJSON()` - Exports to JSON
- `fromJSON()` - Imports from JSON

### Services (`src/services/`)
**CharacterService.js** - Character creation logic
- `createNewCharacter()` - Creates new character
- `generateStats()` - Generates base stats
- `setClass()` - Sets character class
- `completeCharacter()` - Finalizes all calculations

**FileService.js** - File operations
- `saveCharacter()` - Saves character as text
- `saveCharacterJSON()` - Saves as JSON
- `loadCharacter()` - Loads from JSON
- `listCharacters()` - Lists all saved characters

### UI (`src/ui/`)
**prompts.js** - User interaction
- All question prompts with async/await
- Input validation
- Default value handling

### Utils (`src/utils/`)
**calculations.js** - Stat calculations
- `generateBaseStats()` - Random stat generation
- `applyRaceStatLimits()` - Race-specific limits
- `calculateLP()` - Life points calculation
- `calculateAP()` - Endurance points
- `calculateAllBonuses()` - Combat bonuses

**display.js** - Display formatting
- `header()` - Game header
- `formatCharacterSheet()` - Character sheet display
- `displayRaceOptions()` - Race selection UI
- `displayClassOptions()` - Class selection UI

### Data (`src/data/`)
**races.json** - Race definitions
```json
{
  "Human": {
    "heightRange": { "min": 150, "max": 210 },
    "statLimits": { ... },
    "allowedClasses": ["As", "Bb", ...],
    "movementWidth": 20
  }
}
```

**classes.json** - Class definitions
```json
{
  "Kr": {
    "name": "Warrior",
    "type": "Warrior",
    "statusModifier": 0
  }
}
```

## Migration Guide

### For Users
Both versions work side-by-side:
- **Old**: `node chargen.js` (callback-based, single file)
- **New**: `node index.js` (async/await, modular)

### For Developers
To extend the new version:

#### Adding a New Race
Edit `src/data/races.json`:
```json
{
  "NewRace": {
    "name": "New Race",
    "heightRange": { "min": 100, "max": 200, "randomBase": 150, "randomRange": 50 },
    "ageMultiplier": 1,
    "statLimits": {
      "st": { "min": 1, "max": 100 },
      ...
    },
    "allowedClasses": ["Kr", "Ma"],
    "defaultClass": "Kr",
    "movementWidth": 20,
    "bornAbilities": {
      "bashing": 30,
      "drinking": 30,
      "recognition": 4
    }
  }
}
```

#### Adding a New Class
Edit `src/data/classes.json`:
```json
{
  "Nc": {
    "name": "New Class",
    "shortcut": "Nc",
    "type": "Warrior",
    "statusModifier": 0,
    "description": "A new type of warrior"
  }
}
```

#### Modifying Calculations
Edit `src/utils/calculations.js` and update the relevant function.

#### Changing UI Flow
Edit `index.js` and modify the `CharacterGenerator` class methods.

## Benefits of New Structure

### For Maintenance
- **Find bugs faster**: Issues are isolated to specific modules
- **Test individual components**: Each service can be tested independently
- **Update logic without breaking UI**: Separation of concerns

### For Development
- **Add features easily**: Drop in new services or utilities
- **Reuse code**: Services can be imported anywhere
- **Extend functionality**: Inherit from Character class

### For Collaboration
- **Clear file purpose**: Each file has one responsibility
- **Reduced conflicts**: Multiple developers can work on different modules
- **Better documentation**: Code is self-documenting

## Future Enhancements

With this new structure, future features are easier to add:

- **Character Editor**: Load and edit existing characters
- **Multiple Characters**: Manage a party of characters
- **Export Formats**: PDF, HTML character sheets
- **Web Interface**: Same business logic, different UI
- **Unit Tests**: Test services independently
- **API**: Expose services via REST API
- **Database**: Replace file storage with database
- **Import/Export**: From other character sheet formats

## Backward Compatibility

The original `chargen.js` is preserved and still functional. All existing character files in the `Characters/` folder remain compatible.

## License

Created by oliverZ97 | 2025 | Version 2.0.0

## Contributing

With the new modular structure, contributions are welcome! Each module is independent and can be improved separately.
