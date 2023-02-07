import { json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request, cookies }) {
	const limit = cookies.get('limit') || 0;
	const rate_limit = parseInt(limit.toString(), 10);
	if (rate_limit > 10){
		return json({recipe: 'Rate limited, please try again in a bit'})
	}
	const { tag_prompt, onlyIngredients } = await request.json();
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_KEY
	});
	const openai = new OpenAIApi(configuration);
	let prompt;
    // Change the prompt sent to OpenAI based on if the user wants any ingredients or just the selected ones.
    // Sometimes extra ingredients will be added, but usually they are common (salt, better, oil, butter, etc)
	if (onlyIngredients) {
		prompt = `Make me a recipe with only these ingredients: ${tag_prompt?.toString()}`;
	} else {
		prompt = `Make me a recipe using the following ingredients: ${tag_prompt?.toString()}`;
	}
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: prompt,
		temperature: 0.8,
		max_tokens: 500,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0
	});
    // Removes the first 2 characters of the response as they are just line breaks
	return json({
		recipe: response.data.choices[0].text?.substring(2)
	});
}
