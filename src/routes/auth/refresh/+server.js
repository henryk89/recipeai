import { error } from '@sveltejs/kit';
import 'dotenv/config'

const WHOP_CLIENT_ID = process.env.WHOP_CLIENT_ID;
const WHOP_CLIENT_SECRET = process.env.WHOP_CLIENT_SECRET;
const WHOP_REDIRECT_URI = process.env.WHOP_REDIRECT_URI;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ url, cookies }) {
  const whop_refresh_token = url.searchParams.get('code');
  if (!whop_refresh_token) {
    throw error(500, {
        message: 'No refresh token found',
    })
  }
  const request = await fetch("https://data.whop.com/oauth/token", {
    method: 'POST',
    body: JSON.stringify({
        code: whop_refresh_token,
        client_id: WHOP_CLIENT_ID,
        client_secret: WHOP_CLIENT_SECRET,
        redirect_uri: WHOP_REDIRECT_URI,
        grant_type: "authorization_code"
      })
  });
  const response = await request.json();
  if (response.error) {
    throw error(500, {
        message: JSON.stringify({error: response.error}),
    })
  }
  let parsed_response = await response.json()
  cookies.set('whop_access_token', parsed_response.access_token, {
    path: '/',
    httpOnly: true,
    sameSite: true,
    maxAge: parsed_response.expires_in
  })
  cookies.set('whop_refresh_token', parsed_response.refresh_token, {
    path: '/',
    httpOnly: true,
    sameSite: true
  })
  return response(200,{
    message: JSON.stringify({disco_access_token: response.access_token})
  })
}