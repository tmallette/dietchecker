'use server';

import Groq from 'groq-sdk';

export async function requestGroq(text : string) {
    const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

    console.log(text);

    return groq.chat.completions.create({
        messages: [{
            role: 'user',
            content: `Can you please tell me if these ingredients are vegan? ${text} Can you give me a short answer about what ingredient are not vegan? Please don't bold or use any special characters in your answer because this is for an api call.`,
        }],
        model: 'llama3-8b-8192',
    });
}