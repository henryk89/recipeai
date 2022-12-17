const WHOP_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const WHOP_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
const WHOP_ENDPOINT = `https://whop.com/oauth?client_id=${WHOP_CLIENT_ID}&redirect_uri=${WHOP_REDIRECT_URI}`;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get() {
	return {
    headers: { Location: WHOP_ENDPOINT },
    status: 302
  }
}