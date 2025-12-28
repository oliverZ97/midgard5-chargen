const { highlight, success, info, label, dim } = require('./colors');

const DIVIDER = "**********************************************************************************************************************";

/**
 * Displays the game header
 */
function header() {
    console.log("WELCOME TO");
    console.log(
        " ________   __     __     ______     ______     _______   ________   ___    __     _    _       __"
    );
    console.log(
        "/ _______| |  |   |  |   |  __  |   |   _  \\   |  _____| |  ______| |   \\  |  |   | \\__/ |     / _\\"
    );
    console.log(
        "| |        |  |___|  |  |  |__|  |  |  |_|  |  | |  ___  | |_____   | |\\ \\ |  |   |  __  |    /  \\"
    );
    console.log(
        "| |        |   ___   |  |  ____  |  |      /   | | |__ | |  _____|  | | \\ \\|  |   |_/||\\_|   /    \\"
    );
    console.log(
        "| |______  |  |   |  | |  |    |  | |  |\\  \\   | |___| | | |______  | |  \\ \\  |      ||     /      \\"
    );
    console.log(
        "\\________| |__|   |__| |__|    |__| |__| \\__\\  \\_______/ |________| |_|   \\___|      ||  __/________\\__"
    );

    console.log(DIVIDER);
    console.log("Created by oliverZ97 | 2025 | Version 2.0.0");
    console.log(
        "This tool is used to create a Character based on the Rules of MIDGARD 5."
    );
    console.log(DIVIDER);
}

function displayBasicStats(character) {
    console.log(info("Basic Stats:"));
    console.log(`Strength (ST): ${highlight(character.st)}`);
    console.log(`Dexterity (GS): ${highlight(character.gs)}`);
    console.log(`Agility (GW): ${highlight(character.gw)}`);
    console.log(`Constitution (KO): ${highlight(character.ko)}`);
    console.log(`Intelligence (IN): ${highlight(character.in)}`);
    console.log(`Magic Talent (ZT): ${highlight(character.zt)}`);
    console.log(DIVIDER);
}

/**
 * Pads a string or number to the left with spaces
 */
function padStart(value, length) {
    return String(value).padStart(length);
}

/**
 * Formats the character sheet for display
 * @param {Object} character - Character object
 * @returns {string} Formatted character sheet
 */
function formatCharacterSheet(character) {
    const content =
        DIVIDER +
        "\n" +
        "CHARACTER SHEET:\n" +
        DIVIDER +
        "\n" +
        "NAME: " +
        highlight(padStart(`${character.name}`, 20)) +
        "\tGENDER: " +
        highlight(padStart(`${character.gender}`, 10)) +
        "\n" +
        "RACE: " +
        highlight(padStart(`${character.race}`, 20)) +
        "\tCLASS: " +
        highlight(padStart(`${character.class}`, 11)) +
        "\n" +
        "SOCIAL STATUS: " +
        highlight(padStart(`${character.status}`, 13)) +
        "\tRANK: " +
        highlight(padStart(`${character.rank}`, 13)) +
        "\n\n" +
        DIVIDER +
        "\n" +
        "CHARACTERISTICS:\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n" +
        "HEIGHT: " +
        highlight(padStart(`${character.height}`, 20)) +
        "\tSTATURE: " +
        highlight(padStart(`${character.stature}`, 9)) +
        "\n" +
        "AGE: " +
        highlight(padStart(`${character.age}`, 23)) +
        "\tWEAPONHAND: " +
        highlight(padStart(`${character.whand}`, 6)) +
        "\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n\n" +
        DIVIDER +
        "\n" +
        "BASIC SKILLS:\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n" +
        "STRENGTH: " +
        highlight(padStart(`${character.st}`, 18)) +
        "\tDEXTERITY: " +
        highlight(padStart(`${character.gs}`, 9)) +
        "\n" +
        "AGILITY: " +
        highlight(padStart(`${character.gw}`, 19)) +
        "\tCONSTITUTION: " +
        highlight(padStart(`${character.ko}`, 6)) +
        "\n" +
        "INTELLIGENCE: " +
        highlight(padStart(`${character.in}`, 17)) +
        "\tMAGIC TALENT: " +
        highlight(padStart(`${character.zt}`, 6)) +
        "\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n" +
        "APPEARANCE: " +
        highlight(padStart(`${character.au}`, 16)) +
        "\tCHARISMA: " +
        highlight(padStart(`${character.pa}`, 10)) +
        "\n" +
        "PERCEPTION: " +
        highlight(padStart(`${character.wk}`, 16)) +
        "\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n\n" +
        DIVIDER +
        "\n" +
        "COMBAT:\n" +
        "LP: " +
        highlight(padStart(`${character.lp}`, 3)) +
        "\t\t\t\t\t" +
        "AP: " +
        highlight(padStart(`${character.ap}`, 3)) +
        "\n\n" +
        DIVIDER +
        "\n" +
        "MOVEWIDTH: " +
        highlight(padStart(`${character.b}`, 17)) +
        "\tENDURANCEBONUS: " +
        highlight(padStart(`${character.ab}`, 4)) +
        "\n" +
        "DAMAGEBONUS: " +
        highlight(padStart(`${character.schb}`, 15)) +
        "\tATTACKBONUS: " +
        highlight(padStart(`${character.anb}`, 7)) +
        "\n" +
        "DEFENSEBONUS: " +
        highlight(padStart(`${character.abb}`, 14)) +
        "\tMAGICBONUS: " +
        highlight(padStart(`${character.zaub}`, 8)) +
        "\n" +
        "MIND RESISTENCE: " +
        highlight(padStart(`${character.resbg}`, 11)) +
        "\tBODY RESISTENCE: " +
        highlight(padStart(`${character.resbk}`, 3)) +
        "\n" +
        DIVIDER +
        "\n" +
        "ABILITIES:\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n" +
        "BORN ABILITIES:\n" +
        "BASHING: " +
        highlight(padStart(`${character.bashing}`, 19)) +
        "\tDRINKING: " +
        highlight(padStart(`${character.drinking}`, 10)) +
        "\n" +
        "RECOGNITION: " +
        highlight(padStart(`${character.recognition}`, 15)) +
        "\n" +
        "SPECIAL ABILITIES: \n" +
        formatSpecialAbilities(character.specialAbilities) +
        "\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n" +
        "LEARNED ABILITIES:\n" +
        (character.learnedAbilities.length > 0 ? highlight(character.learnedAbilities.join(", ")) : dim("None")) +
        "\n\n" +
        "---------------------------------------------------------------------------------------------------------------------------\n" +
        "WEAPON ABILITIES:\n" +
        (character.weaponAbilities.length > 0 ? highlight(character.weaponAbilities.join(", ")) : dim("None")) +
        "\n\n";

    return content;
}

/**
 * Formats special abilities array
 * @param {Array} abilities - Special abilities array
 * @returns {string} Formatted abilities
 */
function formatSpecialAbilities(abilities) {
    if (!abilities || abilities.length === 0) {
        return "None";
    }

    return abilities
        .map((ability) => {
            if (typeof ability === "string") {
                return ability;
            } else if (ability.name) {
                return ability.description
                    ? `${ability.name}: ${ability.description}`
                    : ability.name;
            }
            return "";
        })
        .filter((a) => a)
        .join("\n");
}

/**
 * Displays race selection options
 */
function displayRaceOptions() {
    console.log("You can decide which Race your character should have.");
    console.log("Available races: Human, Elf, Dwarf, Halfling, Gnome, Mupigwi");
    console.log("Mupigwi are a subspecies from the Catpeople living in the north of Lamaran.");
}

/**
 * Displays class selection options
 * @param {string} race - Character race
 * @param {Array} allowedClasses - Array of allowed class shortcuts
 */
function displayClassOptions(race, allowedClasses) {
    console.log("\nNow you have to choose your adventure-class.");
    console.log("There are three types of classes:");
    console.log("Warriors, Magical Warriors, and Wizards\n");

    console.log("--------------------------------------------------------");
    console.log("Warriors               mag. Warriors       Wizards      ");
    console.log("--------------------------------------------------------");
    console.log("Assassin(As)           Bard(Ba)            Druid(Dr)");
    console.log("Barbarian(Bb)          Warrior(Order)(Or)  Warlock(Hx)");
    console.log("Knight(Fortune)(Gl)                        Magician(Ma)");
    console.log("Trader(Hä)                                 Priest(PB/PS)");
    console.log("Warrior(Kr)                                Shaman(Sc)");
    console.log("Rogue(Sp)");
    console.log("Ranger(Wa)");
    console.log("--------------------------------------------------------\n");

    console.log(`Your character is a ${race}.`);
    console.log("Depending on your race, the choice of your class is limited.");
    console.log("Only as a human you are allowed to choose every class.\n");

    console.log("Available classes for your race:");
    console.log(allowedClasses.join(", "));
}

module.exports = {
    DIVIDER,
    header,
    padStart,
    formatCharacterSheet,
    formatSpecialAbilities,
    displayRaceOptions,
    displayClassOptions,
    displayBasicStats
};
