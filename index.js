const chars = "abcdefghijklmnopqrstuvwxyz";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbs = "0123456789";

function handleSpecialChar(replacement, specialChar) {
    if (specialChar === "+") {
        return replacement; 
    } else if (specialChar === "?") {
        return ""; 
    } else if (specialChar === "*") {
        return replacement; 
    }
    return replacement; 
}

function getRandomCharExcluding(excludedChars) {
    const allChars = `${chars}${CHARS}${numbs}`;
    const allowedChars = allChars.split("").filter(char => !excludedChars.includes(char));
    return allowedChars[Math.floor(Math.random() * allowedChars.length)];
}

function getRandomChar() {
    const allChars = `${chars}${CHARS}${numbs}`;
    return allChars[Math.floor(Math.random() * allChars.length)];
}

function getRandomCharInRange(start, end) {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    const randomCode = Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
    return String.fromCharCode(randomCode);
}

function processString(input) {
    let result = input;
    
    // let charbank = {};
    // let integ = 0;
    
    // // console.log(charbank)
    // // console.log(result)
    // let test = result.includes("\\");
    // while(test){
    //     charplace = result.indexOf("\\");
    //     charbank[integ] = `${result[charplace]}${result[charplace+1]}`
    //     // console.log(result)
    //     // console.log(`a${result.slice(charplace,charplace+2)}b`)
    //     result = result.replace(result.slice(charplace,charplace+2), `charbank${integ}`)
    //     // console.log(result)
    //     integ += 1
    //     test = result.includes("\\");
    // }
    // // console.log(result)
    
    result = result.replace(".",getRandomChar())
    // console.log(result)
    const splitPattern = /\([^()]*\)([+*?]?)/g;
    const squareBracketPattern = /\[([^\[\]]*)\]([+*?]?)/g;

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

    // // console.log(charbank);
    // for(key in charbank){
    //     if (charbank[key] == "\\\\") charbank[key] = "\\"
    //     else charbank[key] = charbank[key].replace("\\", "")
    // }
    // // console.log(charbank);
    
    // console.log(result);
    // for(key in charbank){
    //     result = result.replace(`charbank${key}`, charbank[key])
    // }
    // console.log(result);

    return result;
}
