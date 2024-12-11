// Input string
let thestring = "[az]+(b)+[c-f]*(d(eee)?fff)*[g]?(h)";

// Utility function: Handles special characters
function handleSpecialChar(replacement, specialChar) {
    if (specialChar === "+") {
        return replacement; // Keep as is
    } else if (specialChar === "?") {
        return ""; // Remove
    } else if (specialChar === "*") {
        return replacement; // Keep as is
    }
    return replacement; // Default case
}

// Utility function: Get random character excluding specific ones
function getRandomCharExcluding(excludedChars) {
    const allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const allowedChars = allChars.split("").filter(char => !excludedChars.includes(char));
    return allowedChars[Math.floor(Math.random() * allowedChars.length)];
}

// Utility function: Get random character within a range
function getRandomCharInRange(start, end) {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    const randomCode = Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
    return String.fromCharCode(randomCode);
}

// Main function: Processes the input string
function processString(input) {
    let result = input;
    const splitPattern = /\([^()]*\)([+*?]?)/g;
    const squareBracketPattern = /\[([^\[\]]*)\]([+*?]?)/g;

    // First Pass: Process `()` brackets
    while (true) {
        const matches = [...result.matchAll(splitPattern)];

        if (matches.length === 0) break;

        matches.forEach(match => {
            const fullMatch = match[0];
            const group = match[0].match(/\([^()]*\)/)[0];
            const specialChar = match[1];

            let replacement = group.slice(1, -1);
            replacement = handleSpecialChar(replacement, specialChar);

            result = result.replace(fullMatch, replacement);
        });
    }

    // Second Pass: Process `[]` brackets
    while (true) {
        const squareMatches = [...result.matchAll(squareBracketPattern)];

        if (squareMatches.length === 0) break;

        squareMatches.forEach(match => {
            const fullMatch = match[0];
            const content = match[1];
            const specialChar = match[2];

            let replacement = "";

            if (content.includes("^")) {
                const excludedChars = content.replace("^", "").split("");
                replacement = getRandomCharExcluding(excludedChars);
            } else if (content.includes("-")) {
                const parts = content.split("-");
                if (parts.length === 2 && parts[0] && parts[1]) {
                    replacement = getRandomCharInRange(parts[0][parts[0].length - 1], parts[1][0]);
                }
            } else {
                const chars = content.split("");
                replacement = chars[Math.floor(Math.random() * chars.length)];
            }

            replacement = handleSpecialChar(replacement, specialChar);
            result = result.replace(fullMatch, replacement);
        });
    }

    return result;
}

// Execute and print the result
console.log(processString(thestring));
