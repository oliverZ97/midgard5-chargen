const readline = require('readline');
const { DIVIDER } = require('../utils/display');
const racesData = require('../data/races.json');

/**
 * Gets the valid range for a stat based on character's race
 * @param {string} statName - Name of the stat (st, gs, gw, ko, in, zt)
 * @param {Object} character - Character object with race property
 * @returns {Object} { min, max } range for the stat
 */
function getStatRange(statName, character) {
    const raceData = racesData[character.race];

    if (!raceData || !raceData.statLimits || !raceData.statLimits[statName]) {
        // Default range if no race data found
        return { min: 1, max: 100 };
    }

    return {
        min: raceData.statLimits[statName].min,
        max: raceData.statLimits[statName].max
    };
}

/**
 * Asks for a specific stat with validation based on race limits
 * @param {readline.Interface} rl - Readline interface
 * @param {string} statName - Name of the stat (st, gs, gw, ko, in, zt)
 * @param {string} statLabel - Display label for the stat
 * @param {Object} character - Character object
 * @returns {Promise<number>} Stat value
 */
async function askForStat(rl, statName, statLabel, character) {
    const range = getStatRange(statName, character);

    while (true) {
        const answer = await question(
            rl,
            `Enter ${statLabel} (${statName.toUpperCase()}) stat (${range.min}-${range.max}): `
        );

        const value = parseInt(answer);

        if (isNaN(value)) {
            console.log(`Invalid input. Please enter a number between ${range.min} and ${range.max}.`);
            continue;
        }

        if (value < range.min || value > range.max) {
            console.log(`Value must be between ${range.min} and ${range.max} for your race (${character.race}).`);
            continue;
        }

        return value;
    }
}

/**
 * Creates a readline interface with promises
 */
function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

/**
 * Asks a question and returns a promise with the answer
 * @param {readline.Interface} rl - Readline interface
 * @param {string} question - Question to ask
 * @returns {Promise<string>} User's answer
 */
function question(rl, questionText) {
    return new Promise((resolve) => {
        rl.question(questionText, (answer) => {
            resolve(answer.trim());
        });
    });
}

/**
 * Asks a question with a default value
 * @param {readline.Interface} rl - Readline interface
 * @param {string} questionText - Question to ask
 * @param {string} defaultValue - Default value if user presses enter
 * @returns {Promise<string>} User's answer or default
 */
async function questionWithDefault(rl, questionText, defaultValue) {
    const answer = await question(rl, questionText);
    return answer === '' ? defaultValue : answer;
}

/**
 * Asks a yes/no confirmation question
 * @param {readline.Interface} rl - Readline interface
 * @param {string} questionText - Question to ask
 * @returns {Promise<boolean>} True if yes, false if no
 */
async function confirmQuestion(rl, questionText) {
    const answer = await question(rl, questionText);
    return answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y' || answer === '';
}

/**
 * Asks for character gender
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<string>} Gender
 */
async function askGender(rl) {
    let gender = await questionWithDefault(
        rl,
        "First of all, should your character be male, female, or diverse? (default: male) ",
        "male"
    );

    const confirmed = await confirmQuestion(
        rl,
        `So your character will be ${gender}. Is that correct? (yes/no) `
    );

    if (!confirmed) {
        gender = await question(rl, "Please enter the correct gender: ");
    }

    return gender;
}

/**
 * Asks for character name
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<string>} Name
 */
async function askName(rl, gender) {
    let name = await questionWithDefault(
        rl,
        gender === "female"
            ? "What name should your character have? (default: Iuno Lunae) "
            : "What name should your character have? (default: John McCormack) ",
        gender === "female" ? "Iuno Lunae" : "John McCormack"
    );

    const confirmed = await confirmQuestion(
        rl,
        `So the name is ${name}? (yes/no) `
    );

    if (!confirmed) {
        name = await question(rl, "Please enter the correct name: ");
    }

    return name;
}

/**
 * Asks for character race
 * @param {readline.Interface} rl - Readline interface
 * @param {Array} availableRaces - Array of available race names
 * @returns {Promise<string>} Race
 */
async function askRace(rl, availableRaces) {
    const answer = await question(
        rl,
        "Which race should your character be? (or press enter for random) "
    );

    if (answer === '') {
        const randomIndex = Math.floor(Math.random() * availableRaces.length);
        return availableRaces[randomIndex];
    }

    // Try to match the input to an available race (case-insensitive)
    const matchedRace = availableRaces.find(
        race => race.toLowerCase() === answer.toLowerCase()
    );

    return matchedRace || answer;
}

/**
 * Asks for character height
 * @param {readline.Interface} rl - Readline interface
 * @param {number} min - Minimum height
 * @param {number} max - Maximum height
 * @param {number} randomDefault - Random default height
 * @returns {Promise<number>} Height
 */
async function askHeight(rl, min, max, randomDefault) {
    const answer = await question(
        rl,
        `Please choose the height of the character in cm (${min}-${max}, or press enter for random): `
    );

    if (answer === '') {
        return randomDefault;
    }

    const height = parseInt(answer);
    if (isNaN(height)) {
        return randomDefault;
    }

    return Math.min(Math.max(height, min), max);
}

/**
 * Asks for character stature
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<string>} Stature
 */
async function askStature(rl) {
    const validStatures = ['slim', 'normal', 'wide'];

    while (true) {
        const answer = await questionWithDefault(
            rl,
            "Please choose the stature (slim, normal, wide): ",
            "normal"
        );

        const stature = answer.toLowerCase();

        // Check if it's a valid stature
        if (validStatures.includes(stature)) {
            return stature;
        }

        console.log(`Invalid stature "${answer}". Please choose from: ${validStatures.join(', ')}`);
    }
}

/**
 * Asks for character age
 * @param {readline.Interface} rl - Readline interface
 * @param {number} min - Minimum age
 * @returns {Promise<number>} Age
 */
async function askAge(rl, min) {
    const answer = await question(
        rl,
        `Please choose the age of the character (minimum ${min}): `
    );

    if (answer === '') {
        return min;
    }

    const age = parseInt(answer);
    if (isNaN(age) || age < min) {
        return min;
    }

    return age;
}

/**
 * Asks for all basic stats manually
 * @param {readline.Interface} rl - Readline interface
 * @param {Object} character - Character object
 */
async function askManualBasicStats(rl, character) {
    console.log(`Entering manual stats for ${character.race}...`);
    console.log(DIVIDER);

    character.st = await askForStat(rl, 'st', 'Strength', character);
    character.gs = await askForStat(rl, 'gs', 'Dexterity', character);
    character.gw = await askForStat(rl, 'gw', 'Agility', character);
    character.ko = await askForStat(rl, 'ko', 'Constitution', character);
    character.in = await askForStat(rl, 'in', 'Intelligence', character);
    character.zt = await askForStat(rl, 'zt', 'Magic Talent', character);

    console.log(DIVIDER);
    console.log("Stats entered successfully!");
}

/**
 * Asks for basic stats input method
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<string>} 'manual' or 'random'
 */
async function askBasicStatsMethod(rl) {
    const answer = await questionWithDefault(
        rl,
        "Do you want to add basic stats manually or generate them randomly? (manual/random) Default is random: ",
        "random"
    );
    if (answer.toLowerCase() === 'manual' || answer.toLowerCase() === 'm') {
        return 'manual';
    }
    return 'random';
}

/**
 * Asks for basic stats input method
 * @param {readline.Interface} rl - Readline interface
 * @param {number} retriesLeft - Number of rerolls left
 * @returns {Promise<boolean>} 'true' if accepted, 'false' to reroll
 */
async function confirmBasicStats(rl, retriesLeft) {
    if (retriesLeft === 0) {
        console.log("No rerolls left. You must use the current stats.");
        console.log(DIVIDER);
        return true; // No rerolls left, must accept
    }
    const confirmed = await confirmQuestion(
        rl,
        `Are these stats acceptable? You can reroll ${retriesLeft} more time${retriesLeft > 1 ? 's' : ''} (yes/no): `,
    );
    return confirmed;
}

/**
 * Asks for character class
 * @param {readline.Interface} rl - Readline interface
 * @param {Array} allowedClasses - Array of allowed class shortcuts
 * @param {string} defaultClass - Default class
 * @returns {Promise<string>} Class shortcut
 */
async function askClass(rl, allowedClasses, defaultClass) {
    const answer = await questionWithDefault(
        rl,
        `Which class do you choose? Type in the shortcut (${allowedClasses.join(', ')}): `,
        defaultClass
    );

    // Validate the class (case-insensitive)
    const matchedClass = allowedClasses.find(
        cls => cls.toLowerCase() === answer.toLowerCase()
    );

    if (matchedClass) {
        return matchedClass;
    }

    return defaultClass;
}

/**
 * Asks for character rank
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<number>} Rank
 */
async function askRank(rl) {
    const answer = await question(
        rl,
        "What rank should your character have? (default: 1) "
    );

    if (answer === '') {
        return 1;
    }

    const rank = parseInt(answer);
    if (isNaN(rank) || rank < 1) {
        console.log("Invalid rank. Using rank 1.");
        return 1;
    }

    return rank;
}

/**
 * Asks if user wants to continue with abilities
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<boolean>} True if continue
 */
async function askContinueAbilities(rl) {
    return await confirmQuestion(
        rl,
        "Do you want to add learned abilities? (yes/no) "
    );
}

/**
 * Asks if user wants to save the character
 * @param {readline.Interface} rl - Readline interface
 * @returns {Promise<boolean>} True if save
 */
async function askSaveCharacter(rl) {
    return await confirmQuestion(
        rl,
        "Do you want to save this character? (yes/no) "
    );
}

module.exports = {
    createInterface,
    question,
    questionWithDefault,
    confirmQuestion,
    askGender,
    askName,
    askRace,
    askHeight,
    askStature,
    askAge,
    askBasicStatsMethod,
    confirmBasicStats,
    askForStat,
    askManualBasicStats,
    getStatRange,
    askClass,
    askRank,
    askContinueAbilities,
    askSaveCharacter
};
