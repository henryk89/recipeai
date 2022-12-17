<script>
	import { applyAction, enhance } from '$app/forms';
	import Conversation from '$lib/components/Conversation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { redirect } from '@sveltejs/kit';
  /** @type {import('./$types').ActionData} */
  export let form;
  /** @type {import('./$types').PageData} */
  export let data;
  let openai_response = "";
</script>
<Navigation data={data}/>
{#if data.user}
    {#if data.premium}
        <Conversation data={data} form={form} openai_response={openai_response}/>
        <div class="w-full fixed bottom-0 left-0 right-0 mx-auto">
            <div class="w-full bg-gradient-to-t from-base-100 to-transparent h-20 bottom-0 left-0 right-0 mx-auto"></div>
            <div class="w-full bg-base-100 h-auto">
            <div class="form-control w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2 mx-auto pt-2 pb-8">
                <form method="POST" action="?/prompt" use:enhance={({ form, data, action, cancel }) => {
                    return async ({ result }) => {
                    form.prompt.disabled = true;
                    form.submitButton.disabled = true;
                    openai_response = '';
                    const entered_prompt = result.data.prompt
                    if (result.type === 'success') {
                        await applyAction(result);
                        const recipeRequest = await fetch('/api/recipe', {
                            method: 'POST',
                            body: JSON.stringify({ entered_prompt }),
                            headers: {
                            'content-type': 'application/json'
                            }
                        });
                    const resp = await recipeRequest.json();
                    openai_response = resp.recipe
                    form.prompt.disabled = false;
                    form.submitButton.disabled = false;
                    }
                    if (result.type === 'error') {
                        await applyAction(result);
                    }
                    };
                }}
                    >
                <div class="input-group w-full">
                    <input type="text" name="prompt" class="input input-bordered w-full" placeholder="Write me a recipe using oreos, cheetos, and cheddar cheese"/>
                    <button class="btn btn-square" name="submitButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
    {:else}
        <script> window.location.href = "https://whop.com/checkout/plan_5QRxbXsHQYGmP?d2c=true" </script>
    {/if}
{:else}
<Hero {data}/>
{/if}