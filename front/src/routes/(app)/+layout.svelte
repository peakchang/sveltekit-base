<script>
	import { browser } from '$app/environment';
	import '$src/app.css';
	import { onMount } from 'svelte';
	import { user_info } from '$lib/stores/auth_store';
	import { goto } from '$app/navigation';
	import { beforeNavigate } from '$app/navigation';


	beforeNavigate((e) => {
		e.willUnload = true
		console.log(e.to.route.id.includes('login'));
		
		if(e.to.route.id.includes('login') && $user_info){
			alert('이미 로그인 되어 있습니다!')
			console.log('이 안으로 들어옴!!!');
			e.cancel()
			return
		}
	});

	// @material-tailwind/html
	export let data;
	if (data) {
		$user_info = data.user_info;
	}
	console.log('요긴가???');
	console.log($user_info);
	console.log('****************************');

	const clickHandler = (e) => {
		console.log(e.target.href);
		const goLink = e.target.href;
		if ($user_info) {
			alert('logined');
			return;
		} else {
			goto(goLink);
		}
	};
</script>

<ul class="flex">
	<a href="/">
		<li class="mr-3">Home</li>
	</a>
	<a href="/testpage">
		<li class="mr-3">testpage</li>
	</a>
	<a href="/auth/login">
		<li class="mr-3">login</li>
	</a>
</ul>

<!-- <a href="/auth/login" target="_blank" on:click|preventDefault={clickHandler}> Naver </a> -->

{#if $user_info}
	로그인 상태O
{:else}
	로그인 상태X
{/if}

<slot />
