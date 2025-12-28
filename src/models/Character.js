class Character {
    constructor() {
        // Basic Information
        this.name = '';
        this.gender = '';
        this.race = '';
        this.class = '';
        this.clType = '';
        this.status = '';
        this.rank = 1;

        // Physical Characteristics
        this.height = 0;
        this.stature = '';
        this.age = 18;
        this.whand = 'R'; // R, L, or B

        // Basic Skills
        this.st = 0;  // Stärke (Strength)
        this.gs = 0;  // Geschicklichkeit (Dexterity)
        this.gw = 0;  // Gewandheit (Agility)
        this.ko = 0;  // Konstitution (Constitution)
        this.in = 0;  // Intelligenz (Intelligence)
        this.zt = 0;  // Zaubertalent (Magic Talent)

        // Secondary Skills
        this.au = 0;  // Aussehen (Appearance)
        this.pa = 0;  // pA (Charisma)
        this.wk = 0;  // Wahrnehmungskraft (Perception)

        // Combat Stats
        this.lp = 0;  // Lebenspunkte (Life Points)
        this.ap = 0;  // Ausdauerpunkte (Endurance Points)
        this.b = 0;   // Bewegungsweite (Movement Width)

        // Bonuses
        this.ab = 0;    // Ausdauerbonus (Endurance Bonus)
        this.schb = 0;  // Schadensbonus (Damage Bonus)
        this.anb = 0;   // Angriffsbonus (Attack Bonus)
        this.abb = 0;   // Abwehrbonus (Defense Bonus)
        this.zaub = 0;  // Zauberbonus (Magic Bonus)
        this.resbg = 0; // Resistenz gegen Geist (Mind Resistance)
        this.resbk = 0; // Resistenz gegen Körper (Body Resistance)

        // Abilities
        this.bashing = 0;
        this.drinking = 0;
        this.recognition = 0;
        this.specialAbilities = [];
        this.learnedAbilities = [];
        this.weaponAbilities = [];

        // XP
        this.xpSum = 0;
    }

    /**
     * Validates the character data
     * @returns {Object} { valid: boolean, errors: string[] }
     */
    validate() {
        const errors = [];

        if (!this.name || this.name.trim() === '') {
            errors.push('Character name is required');
        }

        if (!this.gender || this.gender.trim() === '') {
            errors.push('Gender is required');
        }

        const validRaces = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Mupigwi'];
        if (!validRaces.includes(this.race)) {
            errors.push(`Invalid race: ${this.race}`);
        }

        if (this.rank < 1 || this.rank > 100) {
            errors.push('Rank must be between 1 and 100');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Converts character to JSON for saving
     * @returns {Object} Character data as plain object
     */
    toJSON() {
        return {
            name: this.name,
            gender: this.gender,
            race: this.race,
            class: this.class,
            clType: this.clType,
            status: this.status,
            rank: this.rank,
            height: this.height,
            stature: this.stature,
            age: this.age,
            whand: this.whand,
            stats: {
                st: this.st,
                gs: this.gs,
                gw: this.gw,
                ko: this.ko,
                in: this.in,
                zt: this.zt,
                au: this.au,
                pa: this.pa,
                wk: this.wk
            },
            combat: {
                lp: this.lp,
                ap: this.ap,
                b: this.b
            },
            bonuses: {
                ab: this.ab,
                schb: this.schb,
                anb: this.anb,
                abb: this.abb,
                zaub: this.zaub,
                resbg: this.resbg,
                resbk: this.resbk
            },
            abilities: {
                bashing: this.bashing,
                drinking: this.drinking,
                recognition: this.recognition,
                special: this.specialAbilities,
                learned: this.learnedAbilities,
                weapons: this.weaponAbilities
            },
            xpSum: this.xpSum
        };
    }

    /**
     * Loads character from JSON data
     * @param {Object} data - Character data
     * @returns {Character} Character instance
     */
    static fromJSON(data) {
        const character = new Character();

        character.name = data.name || '';
        character.gender = data.gender || '';
        character.race = data.race || '';
        character.class = data.class || '';
        character.clType = data.clType || '';
        character.status = data.status || '';
        character.rank = data.rank || 1;
        character.height = data.height || 0;
        character.stature = data.stature || '';
        character.age = data.age || 18;
        character.whand = data.whand || 'R';

        if (data.stats) {
            character.st = data.stats.st || 0;
            character.gs = data.stats.gs || 0;
            character.gw = data.stats.gw || 0;
            character.ko = data.stats.ko || 0;
            character.in = data.stats.in || 0;
            character.zt = data.stats.zt || 0;
            character.au = data.stats.au || 0;
            character.pa = data.stats.pa || 0;
            character.wk = data.stats.wk || 0;
        }

        if (data.combat) {
            character.lp = data.combat.lp || 0;
            character.ap = data.combat.ap || 0;
            character.b = data.combat.b || 0;
        }

        if (data.bonuses) {
            character.ab = data.bonuses.ab || 0;
            character.schb = data.bonuses.schb || 0;
            character.anb = data.bonuses.anb || 0;
            character.abb = data.bonuses.abb || 0;
            character.zaub = data.bonuses.zaub || 0;
            character.resbg = data.bonuses.resbg || 0;
            character.resbk = data.bonuses.resbk || 0;
        }

        if (data.abilities) {
            character.bashing = data.abilities.bashing || 0;
            character.drinking = data.abilities.drinking || 0;
            character.recognition = data.abilities.recognition || 0;
            character.specialAbilities = data.abilities.special || [];
            character.learnedAbilities = data.abilities.learned || [];
            character.weaponAbilities = data.abilities.weapons || [];
        }

        character.xpSum = data.xpSum || 0;

        return character;
    }
}

module.exports = Character;
