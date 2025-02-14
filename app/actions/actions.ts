'use server';

import Groq from 'groq-sdk';

export async function requestGroq(diet:string, text:string) {
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
    return groq.chat.completions.create({
        messages: [{
            role: 'user',
            content: `I'm using tesseractjs to read an image and extract the text from it. I would like you to see if the ingredients I'm about to list are ${diet} or not. The ingredients are: ${text}. Please ignore all none food words because I'm parsing a picture of the food container and it may capture none ingredient words. Can you give me a short answer of if these ingredients are ${diet} or not and then list the ingredients that are not ${diet}? Please don't bold or use any special characters in your answer because this is for an api call. When you respond, can it be in this format: "Some of these ingredients are not ${diet}. The ingredients that are not ${diet} are ingredient 1, ingredient 2, etc." I'm doing my best to filter out profanity, but can you ignore any profanity that makes it through?`}],
        model: 'llama3-8b-8192',
    });
}