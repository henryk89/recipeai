import { redirect } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function POST({ cookies }) {
    // Clears the users access token and refresh token cookies to signout
    cookies.delete('whop_access_token',{path:'/'})
    cookies.delete('whop_refresh_token',{path:'/'})
    throw redirect(302, '/')
  }