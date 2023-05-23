<script>
	import { pc_sidebar } from '$lib/stores/opt_store';
	import axios from 'axios';

	let fileInput;
	let files;
	let avatar;

	function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
			uploadFunction(e.target.result);
		};
	}

	async function uploadFunction(imgBase64) {
		const data = {};
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(data);
		axios.post(
			'/adm/upload',
			{ body: JSON.stringify(data) },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}
		);
	}
</script>

<div class="mt-16 px-6" class:ml-40={!$pc_sidebar}>
	{#if avatar}
		<img id="avatar" src={avatar} alt="avatar" />
	{:else}
		<div>업로드 전~~</div>
	{/if}
	<input
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={() => getBase64(files[0])}
	/>
	<button class="upload-btn" on:click={() => fileInput.click()}>Upload</button>

	<style>
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.hidden {
			display: none;
		}

		.upload-btn {
			width: 128px;
			height: 32px;
			background-color: black;
			font-family: sans-serif;
			color: white;
			font-weight: bold;
			border: none;
		}

		.upload-btn:hover {
			background-color: white;
			color: black;
			outline: black solid 2px;
		}
	</style>
</div>
