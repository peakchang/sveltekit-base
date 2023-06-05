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

		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];

		const resultImage = dataURItoBlob(imgBase64);
		console.log(resultImage);

		const timestamp = new Date().getTime();
		const fileName = `${timestamp}${Math.random().toString(36).substring(2, 11)}.webp`;
		

		let testForm = new FormData();
		testForm.append('testval', 'alsdjflasjdfljasldifjalisdjf');
		testForm.append('testval2', '43g34f3f45g45g4g45');
		testForm.append('editorimg', resultImage, fileName);

		let keys = testForm.keys();
		for (const pair of keys) {
			console.log(`name : ${pair}`);
		}

		let values = testForm.values();
		for (const pair of values) {
			console.log(`value : ${pair}`);
		}

		axios.post('/adm/upload', testForm, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		// console.log(data);
		// axios.post(
		// 	'/adm/upload',
		// 	{ body: JSON.stringify(data) },
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Accept: 'application/json'
		// 		}
		// 	}
		// );
	}

	const dataURItoBlob = (dataURI) => {
		const bytes =
			dataURI.split(',')[0].indexOf('base64') >= 0
				? atob(dataURI.split(',')[1])
				: unescape(dataURI.split(',')[1]);
		const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
		const max = bytes.length;
		const ia = new Uint8Array(max);
		for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
		return new Blob([ia], { type: mime });
	};
</script>

<div class="mt-16 px-6" class:ml-40={!$pc_sidebar}>
	{#if avatar}
		<img id="avatar" src={avatar} alt="avatar" />
	{:else}
		<div>업로드 전~~!!!</div>
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
