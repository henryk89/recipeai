<script>
	import Examples from './Examples.svelte';
  /** @type {import('./$types').ActionData} */
  export let form;
  /** @type {import('./$types').PageData} */
  export let data;
  export let openai_response = '';
  /**@type String[]*/
  export let tags;
  /**@type Boolean*/
  export let onlyIngredients;
</script>

<!-- Show the conversation if the form was submitted, otherwise show the examples -->
{#if form?.success}
  {#if !form?.rateLimited}
    <div class="grid mt-8 mb-2 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
      <div class="content flex py-2">
        <img class="w-8 h-8 rounded-sm" src={data.userPfp} alt="Whop User PFP">
        <!-- Changes the message posted based on if "Only use these ingredients" was checked -->
        {#if onlyIngredients}
        <div class="item-body px-2">Make me a recipe only using the following ingredients:
          {#each tags as tag}
            <div class='bg-primary inline-block mr-1 pr-1 pl-1 rounded-sm'>
              {tag}
            </div>
          {/each}
        </div>
        {:else}
        <div class="item-body px-2">Make me a recipe using the following ingredients:
          <!-- Wrap each selected ingredient in a green box -->
          {#each tags as tag}
            <div class='bg-primary inline-block mr-1 pr-1 pl-1 rounded-sm'>
              {tag}
            </div>
          {/each}
        </div>
        {/if}
      </div>
    </div>
    <hr class="h-1 w-1/2 mx-auto"/>
    <div class="grid mt-2 mb-64 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
        <div class="content flex py-2">
          <img class="w-8 h-8 rounded-sm" src='https://s3.amazonaws.com/secretsaucefiles/photos/images/000/176/617/large/IMG-20170825-WA0039.jpg?1503675549' alt="Recipe Bot PFP">
          <!-- Blinking curser while waiting for OpenAI response -->
          {#if openai_response === ''}
          <span class="cursor item-body px-2">▋</span>
          {:else}
            <div class="item-body px-2" style="white-space: pre-wrap">{openai_response}</div>
          {/if}
        </div>
    </div>
  {:else}
  <div class="grid mt-8 mb-2 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
    <div class="content flex py-2">
      <img class="w-8 h-8 rounded-sm" src={data.userPfp} alt="Whop User PFP">
      <!-- Changes the message posted based on if "Only use these ingredients" was checked -->
      {#if onlyIngredients}
      <div class="item-body px-2">Make me a recipe only using the following ingredients:
        {#each tags as tag}
          <div class='bg-primary inline-block mr-1 pr-1 pl-1 rounded-sm'>
            {tag}
          </div>
        {/each}
      </div>
      {:else}
      <div class="item-body px-2">Make me a recipe using the following ingredients:
        <!-- Wrap each selected ingredient in a green box -->
        {#each tags as tag}
          <div class='bg-primary inline-block mr-1 pr-1 pl-1 rounded-sm'>
            {tag}
          </div>
        {/each}
      </div>
      {/if}
    </div>
  </div>
  <hr class="h-1 w-1/2 mx-auto"/>
  <div class="grid mt-2 mb-64 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
      <div class="content flex py-2">
        <img class="w-8 h-8 rounded-sm" src='https://s3.amazonaws.com/secretsaucefiles/photos/images/000/176/617/large/IMG-20170825-WA0039.jpg?1503675549' alt="Recipe Bot PFP">
        <div class="item-body px-2" style="white-space: pre-wrap">You have reached your hourly limit, please try again in a bit</div>
      </div>
  </div>
  {/if}
{:else}
<Examples/>
{/if}