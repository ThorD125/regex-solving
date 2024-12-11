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

const chars = "abcdefghijklmnopqrstuvwxyz";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbs = "0123456789";
// Utility function: Get random character excluding specific ones
function getRandomCharExcluding(excludedChars) {
    const allChars = `${chars}${CHARS}${numbs}`;
    const allowedChars = allChars.split("").filter(char => !excludedChars.includes(char));
    return allowedChars[Math.floor(Math.random() * allowedChars.length)];
}

// Utility function: Get random character excluding specific ones
function getRandomChar() {
    const allChars = `${chars}${CHARS}${numbs}`;
    return allChars[Math.floor(Math.random() * allChars.length)];
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
    console.log(result)
    result = result.replace(".",getRandomChar())
    console.log(result)
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

            if (replacement[0] == "?"){
                if (replacement[1] == ":"){
                    replacement = replacement.slice(2)
                }
                else if (replacement[1] == "="){
                    replacement = replacement.slice(2)
                } else if (replacement[1] == "!"){
                    replacement = ""
                }
            }

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
            let content = match[1];
            const specialChar = match[2];

            if (content.includes("^")) {
                const excludedChars = content.replace("^", "").split("");
                content = getRandomCharExcluding(excludedChars);
            } else if (content.includes("-")) {
                const parts = content.split("-");
                let replacement ="";
                if (parts.length === 2 && parts[0] && parts[1]) {
                    replacement = getRandomCharInRange(parts[0][parts[0].length - 1], parts[1][0]);
                }
                originpart = `${parts[0][parts[0].length - 1]}-${parts[1][0]}`
                content = content.replace(originpart, replacement)
            }

            const chars = content.split("");
            let replacement = chars[Math.floor(Math.random() * chars.length)];

            replacement = handleSpecialChar(replacement, specialChar);
            result = result.replace(fullMatch, replacement);
        });
    }

    result = result.replace("*", "")

    return result;
}