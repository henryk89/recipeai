import { error, json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from "openai";
import 'dotenv/config'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function POST({ request }) {
    const { entered_prompt } = await request.json()
    console.log(entered_prompt)
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: entered_prompt?.toString(),
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    // console.log(response.data)
    return json({
        recipe: response.data.choices[0].text?.substring(2)
 })
}

//response.data.choices[0].text?.substring(2)