import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from "openai";
import { redirect } from '@sveltejs/kit';
import 'dotenv/config'
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies }) {
    const WHOP_CLIENT_ID = process.env.WHOP_CLIENT_ID;
    const WHOP_REDIRECT_URI = process.env.WHOP_REDIRECT_URI;
    const WHOP_ENDPOINT = `https://whop.com/oauth?client_id=${WHOP_CLIENT_ID}&redirect_uri=${WHOP_REDIRECT_URI}`;
    return {
      whopUrl: WHOP_ENDPOINT,
      user: locals.user?.id,
      userPfp: locals.user?.profile_pic_url,
      username: locals.user?.username,
      premium: locals.premium
    };

  }

/** @type {import('./$types').Actions} */
export const actions = {
    prompt: async ({ cookies, request }) => {
      const formData = await request.formData();
      const prompt = formData.get('prompt');
      const onlyIngredients = formData.get('onlyIngredients')
      return {
        success: true,
        prompt: prompt,
        onlyIngredients: onlyIngredients
       };
    },
  };