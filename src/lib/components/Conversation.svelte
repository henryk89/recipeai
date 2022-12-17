<script>
	import { applyAction, enhance } from '$app/forms';
	import { stringify } from 'postcss';
	import Examples from './Examples.svelte';
  /** @type {import('./$types').ActionData} */
  export let form;
  /** @type {import('./$types').PageData} */
  export let data;
  export let openai_response = '';
</script>

{#if form?.success}
  <div class="grid mt-8 mb-2 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
    <div class="content flex py-2">
      <img class="w-8 h-8 rounded-sm" src={data.userPfp} alt="Whop User PFP">
      <div class="item-body px-2">{form?.prompt}</div>
    </div>
  </div>
  <hr class="h-1 w-1/2 mx-auto"/>
  <div class="grid mt-2 mb-40 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
      <div class="content flex py-2">
        <img class="w-8 h-8 rounded-sm" src='https://s3.amazonaws.com/secretsaucefiles/photos/images/000/176/617/large/IMG-20170825-WA0039.jpg?1503675549' alt="Recipe Bot PFP">
        {#if openai_response === ''}
        <span class="cursor item-body px-2">▋</span>
        {:else}
          <div class="item-body px-2" style="white-space: pre-wrap">{openai_response}</div>
        {/if}
      </div>
  </div>
{:else}
<Examples/>
{/if}