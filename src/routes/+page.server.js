import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from "openai";
import { redirect } from '@sveltejs/kit';
import 'dotenv/config'
 
/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies }) {
    const whop_access_token = cookies.get('whop_access_token')
    const whop_refresh_token = cookies.get('whop_refresh_token')
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
      return {
        success: true,
        prompt: prompt
       };
    },
  };