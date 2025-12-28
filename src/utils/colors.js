/**
 * ANSI color codes for terminal output
 */
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',

    // Foreground colors
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    // Bright foreground colors
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m'
};

/**
 * Colorizes text
 * @param {string} text - Text to colorize
 * @param {string} color - Color name
 * @returns {string} Colored text
 */
function colorize(text, color) {
    const colorCode = colors[color] || colors.reset;
    return `${colorCode}${text}${colors.reset}`;
}

/**
 * Highlights a value (bright cyan)
 * @param {any} value - Value to highlight
 * @returns {string} Highlighted value
 */
function highlight(value) {
    return colorize(String(value), 'brightCyan');
}

/**
 * Success message (green)
 * @param {string} text - Text to display
 * @returns {string} Green text
 */
function success(text) {
    return colorize(text, 'brightGreen');
}

/**
 * Error message (red)
 * @param {string} text - Text to display
 * @returns {string} Red text
 */
function error(text) {
    return colorize(text, 'brightRed');
}

/**
 * Warning message (yellow)
 * @param {string} text - Text to display
 * @returns {string} Yellow text
 */
function warning(text) {
    return colorize(text, 'brightYellow');
}

/**
 * Info message (blue)
 * @param {string} text - Text to display
 * @returns {string} Blue text
 */
function info(text) {
    return colorize(text, 'brightBlue');
}

/**
 * Label text (white/bright)
 * @param {string} text - Text to display
 * @returns {string} Bright text
 */
function label(text) {
    return colorize(text, 'white');
}

/**
 * Dim text
 * @param {string} text - Text to display
 * @returns {string} Dimmed text
 */
function dim(text) {
    return `${colors.dim}${text}${colors.reset}`;
}

module.exports = {
    colors,
    colorize,
    highlight,
    success,
    error,
    warning,
    info,
    label,
    dim
};
