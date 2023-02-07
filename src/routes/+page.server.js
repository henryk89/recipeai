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
	prompt: async ({ request, cookies }) => {
		const formData = await request.formData();
		const prompt = formData.get('prompt');
		const onlyIngredients = formData.get('onlyIngredients');
		if (cookies.get('limit')){
			const limit = cookies.get('limit') || 0;
			const rate_limit = parseInt(limit.toString(), 10);
			cookies.set('limit', `${rate_limit + 1}`);
			if (rate_limit > 10) {
				return {
					success: true,
					prompt: prompt,
					onlyIngredients: onlyIngredients,
					rateLimited: true
				};
			}
		} else {
			cookies.set('limit', "1", {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 3600 * 1000
			});
		}
		return {
			success: true,
			prompt: prompt,
			onlyIngredients: onlyIngredients
		};
	}
};
