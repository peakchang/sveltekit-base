<script>
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { user_info } from '$lib/stores/auth_store';

	let getemail;
	let getpwd;
	let id_input;

	// onMount(() => {
	// 	if ($user_info) {
	// 		alert('이미 로그인 되어 있습니다.');
	// 		history.back();
	// 		return;
	// 	}
	// });

	const request_login = async () => {
		console.log('alsdjflasjdfaisjdf');
		const login_type = 'local';
		if (!getemail || !getpwd) {
			alert('아이디와 비밀번호를 입력해주세요!');
			return;
		}

		await axios
			.post('/auth/login', { getemail, getpwd, login_type }, { withCredentials: true })
			.then((res) => {
				console.log(res.data);

				$user_info = res.data.result;
				goto('/');
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.error);
				return;
			});
	};

	const kakao_login = () => {

		const kakaoInfo = {
			kakao_restapi : '73bc321608525586fc550b292581fc3c',
			kakao_redirect : 'http://localhost:5173/auth/kakao_callback'
		}
		location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoInfo.kakao_restapi}&redirect_uri=${kakaoInfo.kakao_redirect}&response_type=code`;
	};

	const gotoJoin = () => {
		goto('/auth/join');
	};
</script>

<div class="w-full max-w-xs mx-auto mt-20 suit-font">
	<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<form on:submit|preventDefault={request_login}>
			<div class="mb-4">
				<span class="block text-gray-700 text-sm font-bold mb-2"> 아이디 </span>
				<input
					type="text"
					bind:value={getemail}
					bind:this={id_input}
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div class="mb-4">
				<span class="block text-gray-700 text-sm font-bold mb-2"> 비밀번호 </span>
				<input
					type="password"
					bind:value={getpwd}
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>로그인</button
				>
				<button
					href="/auth/join"
					class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
					on:click={gotoJoin}>회원가입</button
				>
			</div>
		</form>
	</div>

	<button on:click={kakao_login}> 카카오 로그인 </button>
</div>

<style>
	:global(.suit-font) {
		font-family: 'SUIT';
	}
</style>
