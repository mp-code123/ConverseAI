import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey:'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'
});


const app = express();
app.use(cors())
app.use(express.json())
app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello from CodeAI"
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content:prompt }
            ],
            temperature: 0,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        
        
        res.status(200).send({
            bot: response.choices[0].message.content
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))

