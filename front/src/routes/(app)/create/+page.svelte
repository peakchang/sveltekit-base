<script>
	import axios from 'axios';
	import { user_info } from '$lib/stores/auth_store';
	import { onMount } from 'svelte';
	let subject;
	let content;
	let clicked = 0;


	onMount(() => {
		console.log('-----------------------------------');
		console.log($user_info);
	})

	let getUsers = get_users();

	async function get_users() {
		try {
			const params = { testChk: 'authii' };
			const res = await axios.get('/create', { params }, { withCredentials: true });
			const testVal = res.data;
			return testVal;
		} catch (error) {
			console.log(error.message);
		}
	}

	const testpost = async () => {
		axios.post('/create', { subject, content }).then(() => {
			console.log('응답응답!!');
		});
	};

	const chkAuth = () => {
		console.log($user_info);
	}
</script>

HAHAHAHA~~~~~~~~~~~~~~~~~~~~~~
<div>
	<input type="text" bind:value={subject} class="border" />
</div>
<div>
	<textarea name="" bind:value={content} rows="10" class="border" />
</div>

<button on:click={testpost} class="border px-3 rounded-lg">GOGO</button>

<div></div>

<button
on:click={chkAuth}
	class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
	data-ripple-light="true"
>
	Button
</button>

<style>
</style>
