import cookie from 'cookie';
import { error, redirect } from '@sveltejs/kit';
import 'dotenv/config'
const WHOP_API_URL = process.env.WHOP_API_URL;
const WHOP_CLIENT_ID = process.env.WHOP_CLIENT_ID;
const WHOP_CLIENT_SECRET = process.env.WHOP_CLIENT_SECRET;
const WHOP_REDIRECT_URI = process.env.WHOP_REDIRECT_URI;
const WHOP_API_KEY = process.env.WHOP_API_KEY
const WHOP_PASS_ID = process.env.WHOP_PASS_ID
const HOST = process.env.HOST;

/**
 *  @type {import('@sveltejs/kit').Handle}
 */

export async function handle({ event, resolve }) {
  const loaded_cookies = cookie.parse(event.request.headers.get('cookie') || '');
  if (loaded_cookies.whop_refresh_token && !loaded_cookies.whop_access_token) {
    const request = await fetch("https://data.whop.com/oauth/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
          refresh_token: loaded_cookies.whop_refresh_token,
          client_id: WHOP_CLIENT_ID,
          client_secret: WHOP_CLIENT_SECRET,
          redirect_uri: WHOP_REDIRECT_URI,
          grant_type: "refresh_token"
        })
    });
    const whop_response = await request.json();
    if (whop_response.error) {
      throw error(500, {
          message: JSON.stringify({error: whop_response.error}),
      })
    }
    event.cookies.set('whop_access_token', whop_response.access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: whop_response.expires_in
    })
    event.cookies.set('whop_refresh_token', whop_response.refresh_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax'
    })

    if (whop_response.access_token) {
      const request = await fetch(`${WHOP_API_URL}/api/v2/me`, {
        headers: { 'Authorization': `Bearer ${whop_response.access_token}`, 'accept': 'application/json'}
      });
      const response = await request.json();
      const pass_request = await fetch(`${WHOP_API_URL}/api/v2/me/has_access/${WHOP_PASS_ID}`, {
        headers: { 'Authorization': `Bearer ${loaded_cookies.whop_access_token}`, 'accept': 'application/json'}
      });
      const pass_response = await pass_request.json()
      event.locals.user = response
      event.locals.premium = pass_response.valid
    }
  }

  if (loaded_cookies.whop_access_token) {
    const request = await fetch(`${WHOP_API_URL}/api/v2/me`, {
      headers: { 'Authorization': `Bearer ${loaded_cookies.whop_access_token}`, 'accept': 'application/json'}
    });
    const response = await request.json();
    const pass_request = await fetch(`${WHOP_API_URL}/api/v2/me/has_access/${WHOP_PASS_ID}`, {
      headers: { 'Authorization': `Bearer ${loaded_cookies.whop_access_token}`, 'accept': 'application/json'}
    });
    const pass_response = await pass_request.json()
    event.locals.user = response
    event.locals.premium = pass_response.valid
  }
  const response = await resolve(event)
  return response
}