import { redirect } from '@sveltejs/kit';
import 'dotenv/config';

const WHOP_CLIENT_ID = process.env.WHOP_CLIENT_ID;
const WHOP_CLIENT_SECRET = process.env.WHOP_CLIENT_SECRET;
const WHOP_REDIRECT_URI = process.env.WHOP_REDIRECT_URI;

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
	const returnCode = url.searchParams.get('code');
  // Makes a request to Whop to get the users access and refresh tokens
	let response = await fetch('https://data.whop.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			code: returnCode,
			client_id: WHOP_CLIENT_ID,
			client_secret: WHOP_CLIENT_SECRET,
			redirect_uri: WHOP_REDIRECT_URI,
			grant_type: 'authorization_code'
		})
	});
	let parsed_response = await response.json();
  // Adding the access token and refresh token as cookies so we can tell if the user is logged in
	cookies.set('whop_access_token', parsed_response.access_token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: parsed_response.expires_in
	});
	cookies.set('whop_refresh_token', parsed_response.refresh_token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax'
	});
	throw redirect(302, '/');
}
