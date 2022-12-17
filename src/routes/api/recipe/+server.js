import { error, json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from "openai";
import 'dotenv/config'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function POST({ request }) {
    const { tag_prompt,onlyIngredients } = await request.json()
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let prompt = "";
    if (onlyIngredients){
        prompt = `Make me a recipe with only these ingredients: ${tag_prompt?.toString()}`
    } else {
        prompt = `Make me a recipe using the following ingredients: ${tag_prompt?.toString()}`
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return json({
        recipe: response.data.choices[0].text?.substring(2)
 })
}