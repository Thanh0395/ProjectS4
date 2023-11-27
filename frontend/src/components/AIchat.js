import React, { useState } from 'react';
import environment from '../environment.json';
import axios from 'axios';

const AIchat = () => {
    const [response, setResponse] = useState('');
    const callOpenAI = async () => {
        const prompt = 'A chicken has how many legs?';
        const apiKey = environment.apikey.chatGPT;

        try {
            const result = await axios.post(
                'https://api.openai.com/v1/engines/davinci/completions',
                {
                    prompt: prompt,
                    max_tokens: 100,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const myres = result.data.choices[0].text.trim();
            setResponse(myres);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <button onClick={callOpenAI}>Call OpenAI API</button>
            <p>Response: {response}</p>
        </div>
    );
};

export default AIchat;