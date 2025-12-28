const CharacterService = require('./src/services/CharacterService');
const FileService = require('./src/services/FileService');
const { header, DIVIDER, formatCharacterSheet, displayRaceOptions, displayClassOptions, displayBasicStats } = require('./src/utils/display');
const { highlight, success, info } = require('./src/utils/colors');
const prompts = require('./src/ui/prompts');

/**
 * Main character generator application
 */
class CharacterGenerator {
    constructor() {
        this.rl = null;
        this.character = null;
        this.rerollCount = 2;
    }

    /**
     * Starts the character generator
     */
    async start() {
        console.clear();
        header();

        this.rl = prompts.createInterface();
        this.character = CharacterService.createNewCharacter();

        try {
            await this.createCharacter();
        } catch (error) {
            console.error("An error occurred:", error.message);
        } finally {
            this.rl.close();
        }
    }

    /**
     * Main character creation flow
     */
    async createCharacter() {
        // Step 1: Basic Information
        await this.selectBasicInfo();

        // Step 2: Basic Stats
        await this.selectBasicStats();

        // Step 3: Physical Characteristics
        await this.selectCharacteristics();

        // Step 4: Class Selection
        await this.selectClass();

        // Step 5: Social Status
        this.determineSocialStatus();

        // Step 6: Rank
        await this.selectRank();

        // Step 7: Calculate Stats
        this.calculateAllStats();

        // Step 8: Display and Save
        await this.displayAndSave();
    }

    /**
     * Step 1: Select basic information (gender, name, race)
     */
    async selectBasicInfo() {
        const gender = await prompts.askGender(this.rl);
        console.log(`Your character is ${highlight(gender)}.`);
        console.log(DIVIDER);

        const name = await prompts.askName(this.rl, gender);
        console.log(`Character name: ${highlight(name)}`);
        console.log(DIVIDER);

        displayRaceOptions();
        const availableRaces = CharacterService.getAvailableRaces();
        const race = await prompts.askRace(this.rl, availableRaces);

        CharacterService.setBasicInfo(this.character, name, gender, race);
        console.log(`Your character's race is ${highlight(race)}.`);
        console.log(DIVIDER);
    }

    /**
     * Step 2: Select or calculate Basic Stats
     */
    async selectBasicStats() {
        console.log("Now we'll determine the basic stats of your character.");
        const method = await prompts.askBasicStatsMethod(this.rl);
        console.log(DIVIDER);
        if (method === 'manual') {
            await prompts.askManualBasicStats(this.rl, this.character);
            displayBasicStats(this.character);
        } else {
            await this.rollStatsWithRerolls();
        }
    }

    async rollStatsWithRerolls() {
        while (this.rerollCount >= 0) {
            CharacterService.generateStats(this.character);
            displayBasicStats(this.character);
            const confirmed = await prompts.confirmBasicStats(this.rl, this.rerollCount);
            if (confirmed) {
                return;
            }
            this.rerollCount--;
        }
        console.log(info("No rerolls left. Proceeding with the current stats."));
    }

    /**
     * Step 2: Select physical characteristics
     */
    async selectCharacteristics() {
        console.log("Now we'll set the height, stature, age, and weapon hand of the character.");
        console.log("Press enter for random values.");
        console.log(DIVIDER);

        const raceData = CharacterService.getRaceData(this.character.race);
        const heightRange = raceData.heightRange;

        const randomHeight = Math.round(Math.random() * heightRange.randomRange + heightRange.randomBase);
        const height = await prompts.askHeight(this.rl, heightRange.min, heightRange.max, randomHeight);

        const stature = await prompts.askStature(this.rl);

        const age = await prompts.askAge(this.rl, 18);

        CharacterService.setCharacteristics(this.character, height, stature, age);

        console.log(`Height: ${highlight(this.character.height)} cm`);
        console.log(`Stature: ${highlight(this.character.stature)}`);
        console.log(`Age: ${highlight(this.character.age)}`);
        console.log(`Weapon Hand: ${highlight(this.character.whand)}`);
        console.log(DIVIDER);

        console.log(info("Secondary Skills:"));
        console.log(`Appearance (AU): ${highlight(this.character.au)}`);
        console.log(`Charisma (pA): ${highlight(this.character.pa)}`);
        console.log(`Perception (wK): ${highlight(this.character.wk)}`);
        console.log(DIVIDER);
    }

    /**
     * Step 3: Select character class
     */
    async selectClass() {
        const allowedClasses = CharacterService.getAllowedClasses(this.character.race);
        const raceData = CharacterService.getRaceData(this.character.race);

        displayClassOptions(this.character.race, allowedClasses);
        console.log(DIVIDER);

        const selectedClass = await prompts.askClass(this.rl, allowedClasses, raceData.defaultClass);

        CharacterService.setClass(this.character, selectedClass);

        const classData = CharacterService.getClassData(selectedClass);
        console.log(`Congratulations! Your character is now a ${highlight(classData.name)} (${highlight(selectedClass)}).`);
        console.log(DIVIDER);
    }

    /**
     * Step 4: Determine social status
     */
    determineSocialStatus() {
        CharacterService.setStatus(this.character);
        console.log(`Your character is part of the ${highlight(this.character.status)}.`);
        console.log(DIVIDER);
    }

    /**
     * Step 5: Select rank
     */
    async selectRank() {
        console.log("Most of the main information has been added.");
        console.log("Now we'll determine your rank.");
        console.log(DIVIDER);

        const rank = await prompts.askRank(this.rl);
        CharacterService.setRank(this.character, rank);

        console.log(`Your ${highlight(this.character.class)} ${highlight(this.character.name)} has rank ${highlight(this.character.rank)}.`);
        console.log(DIVIDER);
    }

    /**
     * Step 6: Calculate all remaining stats
     */
    calculateAllStats() {
        console.log(info("Calculating Life Points, Endurance Points, and Bonuses..."));
        CharacterService.completeCharacter(this.character);

        console.log(`Life Points (LP): ${highlight(this.character.lp)}`);
        console.log(`Endurance Points (AP): ${highlight(this.character.ap)}`);
        console.log(`Movement Width: ${highlight(this.character.b)}`);
        console.log(DIVIDER);
    }

    /**
     * Step 7: Display character sheet and save
     */
    async displayAndSave() {
        console.log("\n\nCHARACTER CREATION COMPLETE!");
        console.log("=".repeat(120));

        const characterSheet = formatCharacterSheet(this.character);
        console.log(characterSheet);

        const shouldSave = await prompts.askSaveCharacter(this.rl);

        if (shouldSave) {
            try {
                const filepath = await FileService.saveCharacter(this.character, characterSheet);
                const jsonPath = await FileService.saveCharacterJSON(this.character);

                console.log(success(`\nCharacter saved successfully!`));
                console.log(`Text file: ${highlight(filepath)}`);
                console.log(`JSON file: ${highlight(jsonPath)}`);
            } catch (error) {
                console.error(`Error saving character: ${error.message}`);
            }
        } else {
            console.log("\nCharacter not saved.");
        }

        console.log("\nThank you for using the MIDGARD 5 Character Generator!");
        console.log(DIVIDER);
    }
}

// Run the application
const generator = new CharacterGenerator();
generator.start();
