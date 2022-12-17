<script>
    /** @type {import('./$types').PageData} */
    export let data;
  </script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Revolutionize Your Cooking</h1>
        <p class="py-6">With Recipe AI, you can easily create a customized recipe that fits your specific ingredients, desired level of complexity, and time constraints. Simply enter your desired parameters and let the powerful OpenAI Davinci model do the rest, generating an easy-to-follow recipe that meets your exact needs. Whether you're a beginner cook or an experienced chef, Recipe AI has got you covered!</p>
        <a href={data.whopUrl}>
            <button class="btn btn-primary">Get Started</button>
        </a>
      </div>
    </div>
  </div>