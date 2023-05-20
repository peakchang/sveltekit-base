<script>
	import { browser } from '$app/environment';
	import '$src/app.css';
	import { onMount } from 'svelte';
	import { user_info } from '$lib/stores/auth_store';
	import { goto } from '$app/navigation';
	import { beforeNavigate } from '$app/navigation';
	import "$src/app.css";
    import "$node_modules/@fortawesome/fontawesome-free/css/all.min.css";


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
