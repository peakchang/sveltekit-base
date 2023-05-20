<script>
	import { browser } from '$app/environment';
	import '$src/app.css';
	import { onMount } from 'svelte';
	import { user_info } from '$lib/stores/auth_store';
	import { goto } from '$app/navigation';
	import { beforeNavigate } from '$app/navigation';
<<<<<<< HEAD
	import "$src/app.css";
    import "$node_modules/@fortawesome/fontawesome-free/css/all.min.css";
=======
	import axios from 'axios';
	export let data;
>>>>>>> 18e586cf874f1ebdacca6f8be30ec914a1f451da


	// 페이지 이동시 전처리 함수
	beforeNavigate((e) => {
		e.willUnload = true;
		console.log(e.to.route.id.includes('login'));
		if (e.to.route.id.includes('login') && $user_info) {
			alert('이미 로그인 되어 있습니다!');
			e.cancel();
			return;
		}
	});
	
	// 로그인 / 로그아웃 관련
	if (data) {
		$user_info = data.user_info;
	}

	const logoutFunc = () => {
		axios.post('/auth/logout', {}, { withCredentials: true }).then((res) => {
			$user_info = false;
		});
	};
	
	
</script>

<<<<<<< HEAD
=======
<ul class="flex">
	<a href="/">
		<li class="mr-3">Home</li>
	</a>
	<a href="/testpage">
		<li class="mr-3">testpage</li>
	</a>

	<!-- 여기는 로그인 관련 부분 -->
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
>>>>>>> 18e586cf874f1ebdacca6f8be30ec914a1f451da


<<<<<<< HEAD


=======
>>>>>>> 18e586cf874f1ebdacca6f8be30ec914a1f451da
<slot />

<style>
    @font-face {
        font-family: "TheJamsil5Bold";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2")
            format("woff2");
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: "S-CoreDream-3Light";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
            format("woff");
        font-weight: normal;
        font-style: normal;
    }
    :global(.gamsil) {
        font-family: "TheJamsil5Bold";
    }

    :global(.score-light) {
        font-family: "S-CoreDream-3Light";
    }
</style>
