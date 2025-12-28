const Character = require('../models/Character');
const racesData = require('../data/races.json');
const classesData = require('../data/classes.json');
const {
    generateBaseStats,
    applyRaceStatLimits,
    generateSecondaryStats,
    calculateLP,
    calculateAP,
    calculateAllBonuses,
    calculateBornAbilities,
    determineSocialStatus,
    rollDice
} = require('../utils/calculations');

/**
 * Service for managing character creation and business logic
 */
class CharacterService {
    /**
     * Creates a new character with default values
     * @returns {Character} New character instance
     */
    createNewCharacter() {
        return new Character();
    }

    /**
     * Gets available races
     * @returns {Array<string>} Array of race names
     */
    getAvailableRaces() {
        return Object.keys(racesData);
    }

    /**
     * Gets race data
     * @param {string} raceName - Name of the race
     * @returns {Object} Race data
     */
    getRaceData(raceName) {
        return racesData[raceName];
    }

    /**
     * Gets allowed classes for a race
     * @param {string} raceName - Name of the race
     * @returns {Array<string>} Array of allowed class shortcuts
     */
    getAllowedClasses(raceName) {
        const raceData = racesData[raceName];
        return raceData ? raceData.allowedClasses : [];
    }

    /**
     * Gets class data
     * @param {string} classShortcut - Class shortcut (e.g., "Kr")
     * @returns {Object} Class data
     */
    getClassData(classShortcut) {
        return classesData[classShortcut];
    }

    /**
     * Sets basic character information
     * @param {Character} character - Character instance
     * @param {string} name - Character name
     * @param {string} gender - Character gender
     * @param {string} race - Character race
     */
    setBasicInfo(character, name, gender, race) {
        character.name = name;
        character.gender = gender;
        character.race = race;
    }

    /**
     * Generates and sets character stats based on race
     * @param {Character} character - Character instance
     */
    generateStats(character) {
        const baseStats = generateBaseStats();
        const adjustedStats = applyRaceStatLimits(baseStats, character.race);

        character.st = adjustedStats.st;
        character.gs = adjustedStats.gs;
        character.gw = adjustedStats.gw;
        character.ko = adjustedStats.ko;
        character.in = adjustedStats.in;
        character.zt = adjustedStats.zt;

        const secondaryStats = generateSecondaryStats(adjustedStats, character.race);
        character.au = secondaryStats.au;
        character.pa = secondaryStats.pa;
        character.wk = secondaryStats.wk;
    }

    /**
     * Sets character physical characteristics
     * @param {Character} character - Character instance
     * @param {number} height - Height in cm (optional, will generate random if not provided)
     * @param {string} stature - Stature description (optional)
     * @param {number} age - Age (optional, will use minimum if not provided)
     */
    setCharacteristics(character, height, stature, age) {
        const raceData = racesData[character.race];

        if (!height) {
            const range = raceData.heightRange;
            height = Math.round(Math.random() * range.randomRange + range.randomBase);
        }

        character.height = height;
        character.stature = stature || 'normal';

        // Calculate age with race multiplier
        const baseAge = age || 18;
        character.age = baseAge * (raceData.ageMultiplier || 1);

        // Determine weapon hand
        if (raceData.weaponHand) {
            character.whand = raceData.weaponHand;
        } else {
            const roll = Math.round(Math.random() * 100 + 1);
            if (roll <= 75) {
                character.whand = 'R';
            } else if (roll <= 95) {
                character.whand = 'L';
            } else {
                character.whand = 'B';
            }
        }
    }

    /**
     * Sets character class and determines class type
     * @param {Character} character - Character instance
     * @param {string} classShortcut - Class shortcut
     */
    setClass(character, classShortcut) {
        const classData = classesData[classShortcut];

        if (!classData) {
            throw new Error(`Invalid class: ${classShortcut}`);
        }

        character.class = classShortcut;
        character.clType = classData.type;
    }

    /**
     * Determines and sets character social status
     * @param {Character} character - Character instance
     */
    setStatus(character) {
        character.status = determineSocialStatus(character.class);
    }

    /**
     * Sets character rank
     * @param {Character} character - Character instance
     * @param {number} rank - Character rank
     */
    setRank(character, rank) {
        character.rank = rank;
    }

    /**
     * Calculates and sets combat stats (LP, AP)
     * @param {Character} character - Character instance
     */
    calculateCombatStats(character) {
        character.lp = calculateLP(character);
        character.ap = calculateAP(character);
    }

    /**
     * Calculates and sets all bonuses
     * @param {Character} character - Character instance
     */
    calculateBonuses(character) {
        const bonuses = calculateAllBonuses(character);

        character.ab = bonuses.ab;
        character.schb = bonuses.schb;
        character.anb = bonuses.anb;
        character.abb = bonuses.abb;
        character.zaub = bonuses.zaub;
        character.resbg = bonuses.resbg;
        character.resbk = bonuses.resbk;
        character.b = bonuses.b;
    }

    /**
     * Calculates and sets born abilities
     * @param {Character} character - Character instance
     */
    setBornAbilities(character) {
        const abilities = calculateBornAbilities(character);

        character.bashing = abilities.bashing;
        character.drinking = abilities.drinking;
        character.recognition = abilities.recognition;
    }

    /**
     * Loads special abilities from JSON files
     * @param {Character} character - Character instance
     */
    loadSpecialAbilities(character) {
        try {
            const raceAbilities = require('../../lib/race_abilities.json');
            const classAbilities = require('../../lib/class_abilities.json');

            const raceAbils = raceAbilities[character.race] || {};
            const classAbils = classAbilities[character.class] || {};

            const abilities = [];

            // Extract race abilities (typ_abil array)
            if (raceAbils.typ_abil && Array.isArray(raceAbils.typ_abil)) {
                abilities.push(...raceAbils.typ_abil);
            }

            // Extract class abilities (typ_abil array)
            if (classAbils.typ_abil && Array.isArray(classAbils.typ_abil)) {
                abilities.push(...classAbils.typ_abil);
            }

            character.specialAbilities = abilities;
        } catch (error) {
            console.log("Could not load special abilities:", error.message);
            character.specialAbilities = [];
        }
    }

    /**
     * Completes character creation by calculating all remaining stats
     * @param {Character} character - Character instance
     */
    completeCharacter(character) {
        this.calculateCombatStats(character);
        this.calculateBonuses(character);
        this.setBornAbilities(character);
        this.loadSpecialAbilities(character);

        // Calculate XP sum (placeholder - needs actual XP calculation logic)
        character.xpSum = 0;
    }

    /**
     * Validates character data
     * @param {Character} character - Character instance
     * @returns {Object} { valid: boolean, errors: string[] }
     */
    validateCharacter(character) {
        return character.validate();
    }
}

module.exports = new CharacterService();
