const fs = require('fs');
const path = require('path');
const Character = require('../models/Character');

/**
 * Service for saving and loading character files
 */
class FileService {
    /**
     * Gets the Characters directory path
     * @returns {string} Characters directory path
     */
    getCharactersDir() {
        return path.join(process.cwd(), 'Characters');
    }

    /**
     * Ensures the Characters directory exists
     */
    ensureCharactersDir() {
        const dir = this.getCharactersDir();
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    /**
     * Sanitizes a filename
     * @param {string} name - Original name
     * @returns {string} Sanitized filename
     */
    sanitizeFilename(name) {
        return name.replace(/[^a-z0-9_\-]/gi, '_');
    }

    /**
     * Generates a filename for a character
     * @param {string} characterName - Character name
     * @returns {string} Filename
     */
    generateFilename(characterName) {
        const sanitized = this.sanitizeFilename(characterName);
        return `${sanitized}.txt`;
    }

    /**
     * Saves a character to a file
     * @param {Character} character - Character to save
     * @param {string} content - Formatted character sheet content
     * @returns {Promise<string>} Path to saved file
     */
    async saveCharacter(character, content) {
        this.ensureCharactersDir();

        const filename = this.generateFilename(character.name);
        const filepath = path.join(this.getCharactersDir(), filename);

        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, content, 'utf8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filepath);
                }
            });
        });
    }

    /**
     * Saves character as JSON
     * @param {Character} character - Character to save
     * @returns {Promise<string>} Path to saved file
     */
    async saveCharacterJSON(character) {
        this.ensureCharactersDir();

        const filename = this.sanitizeFilename(character.name) + '.json';
        const filepath = path.join(this.getCharactersDir(), filename);

        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, JSON.stringify(character.toJSON(), null, 2), 'utf8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filepath);
                }
            });
        });
    }

    /**
     * Loads a character from a JSON file
     * @param {string} filepath - Path to character file
     * @returns {Promise<Character>} Loaded character
     */
    async loadCharacter(filepath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        const characterData = JSON.parse(data);
                        const character = Character.fromJSON(characterData);
                        resolve(character);
                    } catch (parseError) {
                        reject(parseError);
                    }
                }
            });
        });
    }

    /**
     * Lists all saved characters
     * @returns {Promise<Array<string>>} Array of character filenames
     */
    async listCharacters() {
        this.ensureCharactersDir();

        return new Promise((resolve, reject) => {
            fs.readdir(this.getCharactersDir(), (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    const characterFiles = files.filter(file =>
                        file.endsWith('.txt') || file.endsWith('.json')
                    );
                    resolve(characterFiles);
                }
            });
        });
    }

    /**
     * Checks if a character file exists
     * @param {string} characterName - Character name
     * @returns {boolean} True if exists
     */
    characterExists(characterName) {
        const filename = this.generateFilename(characterName);
        const filepath = path.join(this.getCharactersDir(), filename);
        return fs.existsSync(filepath);
    }
}

module.exports = new FileService();
