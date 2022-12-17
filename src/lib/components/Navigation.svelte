<script>
  /** @type {import('./$types').PageData} */
  export let data;
  async function signOut() {
    const response = await fetch('/auth/signout', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });
    await response;
  }
</script>

<!-- If the user is signed in show their name and the sign out button, otherwise just show the logo -->
{#if data.user}
    <div class="sticky top-0 navbar bg-base-100 border-b-2">
        <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">Recipe AI</a>
        </div>
        <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
        </ul>
        </div>  
        <div class="navbar-end">
            <!-- Username is hidden on mobile to save spcae -->
            <p class="hidden sm:block">Logged in as {data.username}</p>
            <a data-sveltekit-reload class="btn ml-4" href="/" on:click={signOut}>Log Out</a>
        </div>
    </div>
{:else}
    <div class="sticky top-0 navbar bg-base-100 border-b-2">
        <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">Recipe AI</a>
        </div>
        <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
        </ul>
        </div>
    </div>
{/if}