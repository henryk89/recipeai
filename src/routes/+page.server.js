import 'dotenv/config';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const WHOP_CLIENT_ID = process.env.WHOP_CLIENT_ID;
	const WHOP_REDIRECT_URI = process.env.WHOP_REDIRECT_URI;
	const WHOP_ENDPOINT = `https://whop.com/oauth?client_id=${WHOP_CLIENT_ID}&redirect_uri=${WHOP_REDIRECT_URI}`;
  // Loads the login endpoint, as well as user info from locals that was assigned in hooks.server.js
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
	prompt: async ({ request }) => {
		const formData = await request.formData();
		const prompt = formData.get('prompt');
		const onlyIngredients = formData.get('onlyIngredients');
		return {
			success: true,
			prompt: prompt,
			onlyIngredients: onlyIngredients
		};
	}
};
