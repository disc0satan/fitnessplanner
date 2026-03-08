export const cleanAndParseJSON = (text) => {
  try {
    if (!text) throw new Error("Empty response from AI");

    // 1. Find the first '{' and the last '}' to extract the JSON block
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}') + 1;
    
    if (startIndex === -1 || endIndex <= 0) {
      throw new Error("No JSON structure found.");
    }

    let jsonString = text.slice(startIndex, endIndex);

    // 2. Remove trailing commas before closing braces/brackets (a common AI mistake)
    jsonString = jsonString.replace(/,\s*([\]}])/g, '$1');

    return JSON.parse(jsonString);
    
  } catch (error) {
    console.error("Parsing failed. Raw output was:", text);
    throw new Error("The AI coach sent a malformed plan. Please try one more time.");
  }
};