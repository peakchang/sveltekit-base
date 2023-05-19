<script>
	import { browser } from '$app/environment';
	import '$src/app.css';
	import { onMount } from 'svelte';
	import { user_info } from '$lib/stores/auth_store';
	import { goto } from '$app/navigation';
	import { beforeNavigate } from '$app/navigation';
	import axios from 'axios';

	beforeNavigate((e) => {
		e.willUnload = true;
		console.log(e.to.route.id.includes('login'));
		if (e.to.route.id.includes('login') && $user_info) {
			alert('이미 로그인 되어 있습니다!');
			e.cancel();
			return;
		}
	});

	const logoutFunc = () => {
		console.log('asidfiajsdlfjadf');
		axios.post('/auth/logout', {}, { withCredentials: true }).then((res) => {
			console.log('어떻게 할까???');
		});
	};


	// @material-tailwind/html
	export let data;
	if (data) {
		$user_info = data.user_info;
	}
</script>

<ul class="flex">
	<a href="/">
		<li class="mr-3">Home</li>
	</a>
	<a href="/testpage">
		<li class="mr-3">testpage</li>
	</a>

	{#if $user_info}
		<a href="/auth/logout" on:click|preventDefault={logoutFunc}>
			<li class="mr-3">logout</li>
		</a>
	{:else}
		<a href="/auth/login">
			<li class="mr-3">login</li>
		</a>
	{/if}
</ul>

<!-- <a href="/auth/login" target="_blank" on:click|preventDefault={clickHandler}> Naver </a> -->

<slot />
