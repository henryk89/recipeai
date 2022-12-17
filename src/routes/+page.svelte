<script>
	import { applyAction, enhance } from '$app/forms';
	import Conversation from '$lib/components/Conversation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
    import Tags from "svelte-tags-input";
  /** @type {import('./$types').ActionData} */
  export let form;
  /** @type {import('./$types').PageData} */
  export let data;
  let openai_response = "";
  let tag_prompt = "";
  /** @type String[]*/
  let tags = ['Cheese','Onion','Garlic'];
  /** @type String[]*/
  let submitedTags = [];
  let onlyIngredients = true;
</script>
<Navigation data={data}/>

<!-- If the user is logged in and has premium (the access pass) they will be given access to the AI
If the user is logged in without the access pass they are redirected to the access pass checkout page which redirects back here after purchase
If the user is not logged in they are prompted to login -->
{#if data.user}
    {#if data.premium}
        <Conversation data={data} form={form} openai_response={openai_response} tags={submitedTags} onlyIngredients={onlyIngredients}/>
        <div class="w-full fixed bottom-0 left-0 right-0 mx-auto">
            <div class="w-full bg-gradient-to-t from-base-100 to-transparent h-20 bottom-0 left-0 right-0 mx-auto"></div>
            <div class="w-full bg-base-100 h-auto">
            <div class="form-control w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2 mx-auto pt-2 pb-8">
                <form method="POST" action="?/prompt" use:enhance={({ form, data, action, cancel }) => {
                    return async ({ result }) => {
                    // Disable the "Generate" button while waiting for response
                    form.submitButton.disabled = true;
                    // Sets variables that are used by other components such as Conversation.svelte
                    openai_response = '';
                    submitedTags = tags
                    onlyIngredients = form?.onlyIngredients.checked
                    // Makes a request to /api/recipe with the selected ingredients that makes a request to OpenAI
                    tag_prompt = tags.toString()
                    if (result.type === 'success') {
                        await applyAction(result);
                        const recipeRequest = await fetch('/api/recipe', {
                            method: 'POST',
                            body: JSON.stringify({ tag_prompt,onlyIngredients }),
                            headers: {
                            'content-type': 'application/json'
                            }
                        });
                    const resp = await recipeRequest.json();
                    openai_response = resp.recipe
                    form.submitButton.disabled = false;
                    }
                    if (result.type === 'error') {
                        await applyAction(result);
                    }
                    };
                }}
                >
                    <div class="w-full input-group-md">
                        <Tags class="background-color: #444444"
                        bind:tags={tags}
                        addKeys={[9,13,188]}
                        maxTags={10}
                        allowPaste={true}
                        allowDrop={true}
                        splitWith={","}
                        onlyUnique={true}
                        removeKeys={[27]}
                        placeholder={"Enter ingredient and press enter"}
                        name={"tag-input"}
                        id={"tag-input"}
                        allowBlur={true}
                        disable={false}
                        readonly={false}
                        minChars={2}
                        />
                        <div class="flex w-full mx-auto">
                              <div class="form-control w-1/3 my-auto">
                                <label class="label cursor-pointer">
                                  <span class="label-text">Only use these ingredients</span> 
                                  <input type="checkbox" name="onlyIngredients" checked class="checkbox checkbox-primary" />
                                </label>
                              </div>
                            <div class="w-1/3"></div>
                            <button class="btn mt-2 w-1/3" name="submitButton">
                              Generate
                            </button>
                          </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    {:else}
        <!-- Redirects the user to checkout if they do not have the access pass -->
        <script> window.location.href = "https://whop.com/checkout/plan_hEYRXN1Om1qOa?d2c=true" </script>
    {/if}
{:else}
<Hero {data}/>
{/if}