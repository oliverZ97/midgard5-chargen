const racesData = require('../data/races.json');
const classesData = require('../data/classes.json');

/**
 * Clamps a value between min and max
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Rolls a random number between min and max (inclusive)
 */
function rollDice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Rolls a d100 (1-100)
 */
function rollD100() {
    return Math.round(Math.random() * 100 + 1);
}

/**
 * Generates random base stats with proper limits
 */
function generateBaseStats() {
    return {
        st: Math.min(rollD100(), 100),
        gs: Math.min(rollD100(), 100),
        gw: Math.min(rollD100(), 100),
        ko: Math.min(rollD100(), 100),
        in: Math.min(rollD100(), 100),
        zt: Math.min(rollD100(), 100)
    };
}

/**
 * Applies race-specific stat limits
 * @param {Object} stats - Base stats
 * @param {string} race - Race name
 * @returns {Object} Modified stats
 */
function applyRaceStatLimits(stats, race) {
    const raceData = racesData[race];
    if (!raceData) return stats;

    const limits = raceData.statLimits;
    return {
        st: clamp(stats.st, limits.st.min, limits.st.max),
        gs: clamp(stats.gs, limits.gs.min, limits.gs.max),
        gw: clamp(stats.gw, limits.gw.min, limits.gw.max),
        ko: clamp(stats.ko, limits.ko.min, limits.ko.max),
        in: clamp(stats.in, limits.in.min, limits.in.max),
        zt: clamp(stats.zt, limits.zt.min, limits.zt.max)
    };
}

/**
 * Generates secondary stats (AU, pA, wK)
 * @param {Object} baseStats - Base character stats
 * @param {string} race - Race name
 * @returns {Object} Secondary stats
 */
function generateSecondaryStats(baseStats, race) {
    let au = rollD100();
    let pa = rollD100();
    let wk = rollD100();

    // Apply race-specific modifiers
    switch (race) {
        case 'Elf':
            au = Math.max(au, 61);
            pa = Math.max(pa, 51);
            break;
        case 'Dwarf':
            au = Math.min(au, 80);
            pa = Math.min(pa, 80);
            break;
        case 'Halfling':
            au = Math.max(au, 51);
            pa = Math.max(pa, 51);
            break;
        case 'Gnome':
            if (au > 90) au = 90;
            if (pa > 70) pa = 70;
            break;
    }

    return { au, pa, wk };
}

/**
 * Calculates bonus value from a stat
 * @param {number} value - Stat value
 * @returns {number} Bonus value
 */
function calcBonusValue(value) {
    if (value <= 0) return -2;
    if (value <= 5) return -1;
    if (value <= 20) return 0;
    if (value <= 80) return 0;
    if (value <= 95) return 1;
    return 2;
}

/**
 * Calculates Life Points (LP)
 * @param {Object} character - Character object
 * @returns {number} Life points
 */
function calculateLP(character) {
    let lp = 0;

    switch (character.race) {
        case 'Elf':
            lp = rollDice(1, 6) + rollDice(1, 6) + Math.floor(character.ko / 10);
            break;
        case 'Dwarf':
            lp = rollDice(1, 6) + rollDice(1, 6) + rollDice(1, 6) + Math.floor(character.ko / 10);
            break;
        case 'Halfling':
            lp = rollDice(1, 6) + rollDice(1, 6) + Math.floor(character.ko / 10);
            break;
        case 'Gnome':
            lp = rollDice(1, 6) + Math.floor(character.ko / 10);
            break;
        case 'Mupigwi':
            lp = rollDice(1, 6) + rollDice(1, 6) + Math.floor(character.ko / 10) + 2;
            break;
        default: // Human
            lp = rollDice(1, 6) + rollDice(1, 6) + Math.floor(character.ko / 10);
    }

    // Add rank-based LP
    for (let i = 2; i <= character.rank; i++) {
        lp += rollDice(1, 6) + Math.floor(character.ko / 10);
    }

    return lp;
}

/**
 * Calculates Endurance Points (AP)
 * @param {Object} character - Character object
 * @returns {number} Endurance points
 */
function calculateAP(character) {
    let ap = 0;

    switch (character.clType) {
        case 'Warrior':
            ap = rollDice(1, 6) + rollDice(1, 6) + rollDice(1, 6) + rollDice(1, 6);
            for (let i = 2; i <= character.rank; i++) {
                ap += rollDice(1, 6) + rollDice(1, 6);
            }
            break;
        case 'maWarrior':
            ap = rollDice(1, 6) + rollDice(1, 6) + rollDice(1, 6);
            for (let i = 2; i <= character.rank; i++) {
                ap += rollDice(1, 6);
            }
            break;
        case 'Wizard':
            ap = rollDice(1, 6) + rollDice(1, 6);
            for (let i = 2; i <= character.rank; i++) {
                ap += rollDice(1, 6);
            }
            break;
    }

    return ap;
}

/**
 * Calculates damage bonus
 * @param {Object} character - Character object
 * @returns {number} Damage bonus
 */
function calculateDamageBonus(character) {
    let schb = 0;

    if (character.st >= 81) {
        schb += Math.floor((character.st - 80) / 5);
    }
    if (character.gs >= 81) {
        schb += Math.floor((character.gs - 80) / 5);
    }

    if (character.race === 'Dwarf') schb += 1;
    if (character.race === 'Halfling') schb -= 1;
    if (character.race === 'Gnome') schb -= 2;
    if (character.race === 'Mupigwi') schb += 1;

    return schb;
}

/**
 * Calculates endurance bonus
 * @param {Object} character - Character object
 * @returns {number} Endurance bonus
 */
function calculateEnduranceBonus(character) {
    return Math.floor(character.ko / 20) + calcBonusValue(character.ko);
}

/**
 * Calculates movement width
 * @param {string} race - Race name
 * @returns {number} Movement width
 */
function calculateMovementWidth(race) {
    const raceData = racesData[race];
    if (!raceData) return 16;

    // Base movement + 4d3 roll
    const diceRoll = rollDice(1, 3) + rollDice(1, 3) + rollDice(1, 3) + rollDice(1, 3);
    return (raceData.movementWidth || 16) + diceRoll;
}

/**
 * Calculates resistance bonuses
 * @param {Object} character - Character object
 * @returns {Object} { mind, body } resistance bonuses
 */
function calculateResistances(character) {
    let mind = 0;
    let body = 0;

    if (character.race === 'Human') {
        mind = calcBonusValue(character.in);
        body = calcBonusValue(character.ko);
    } else {
        switch (character.race) {
            case 'Elf':
                mind = 2;
                body = 2;
                break;
            case 'Dwarf':
                mind = 3;
                body = 3;
                break;
            case 'Halfling':
                mind = 4;
                body = 4;
                break;
            case 'Gnome':
                mind = 4;
                body = 4;
                break;
            case 'Mupigwi':
                mind = -1;
                body = 3;
                break;
        }
    }

    // Class type modifiers
    if (character.clType === 'Wizard') {
        mind += 2;
        body += 2;
    }
    if (character.clType === 'Warrior') {
        body += 1;
    }

    return { mind, body };
}

/**
 * Calculates all combat bonuses
 * @param {Object} character - Character object
 * @returns {Object} All bonuses
 */
function calculateAllBonuses(character) {
    const resistances = calculateResistances(character);

    return {
        ab: calculateEnduranceBonus(character),
        schb: calculateDamageBonus(character),
        anb: calcBonusValue(character.gs),
        abb: calcBonusValue(character.gw),
        zaub: calcBonusValue(character.zt),
        resbg: resistances.mind,
        resbk: resistances.body,
        b: calculateMovementWidth(character.race)
    };
}

/**
 * Calculates born abilities
 * @param {Object} character - Character object
 * @returns {Object} Born abilities
 */
function calculateBornAbilities(character) {
    const raceData = racesData[character.race];
    let bashing = Math.floor((character.st + character.gw) / 20 + character.anb);

    if (raceData && raceData.bornAbilities) {
        return {
            bashing: bashing + (raceData.bornAbilities.bashing || 0) / 10,
            drinking: Math.floor(character.ko / 10) + (raceData.bornAbilities.drinking || 0) / 10,
            recognition: raceData.bornAbilities.recognition || 6
        };
    }

    return {
        bashing: bashing + 3,
        drinking: Math.floor(character.ko / 10) + 3,
        recognition: 6
    };
}

/**
 * Determines character social status
 * @param {string} classShortcut - Character class shortcut
 * @returns {string} Social status
 */
function determineSocialStatus(classShortcut) {
    const classData = classesData[classShortcut];
    let roll = rollD100();

    if (classData) {
        roll += classData.statusModifier || 0;
    }

    roll = clamp(roll, 1, 100);

    if (roll <= 10) return 'Unfree People';
    if (roll <= 50) return 'Lower Class';
    if (roll <= 90) return 'Middle Class';
    return 'Aristocracy';
}

module.exports = {
    clamp,
    rollDice,
    rollD100,
    generateBaseStats,
    applyRaceStatLimits,
    generateSecondaryStats,
    calcBonusValue,
    calculateLP,
    calculateAP,
    calculateDamageBonus,
    calculateEnduranceBonus,
    calculateMovementWidth,
    calculateResistances,
    calculateAllBonuses,
    calculateBornAbilities,
    determineSocialStatus
};
