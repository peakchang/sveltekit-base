<script>
	import { browser } from '$app/environment';
	import '$src/app.css';
	import { onMount } from 'svelte';
	import { user_info } from '$lib/stores/auth_store';

	// @material-tailwind/html
	export let data;
	if (data) {
		$user_info = data.user_info;
	}
	console.log('요긴가???');
	console.log($user_info);
	console.log('****************************');
</script>

<ul class="flex">
	<a href="/">
		<li class="mr-3">Home</li>
	</a>
	<a href="/testpage">
		<li class="mr-3">testpage</li>
	</a>
</ul>

{#if $user_info}
	로그인 상태O
{:else}
	로그인 상태X
{/if}

<slot />
