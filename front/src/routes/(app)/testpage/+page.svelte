<script>
	import { user_info } from '$lib/stores/auth_store';
	import { onMount } from 'svelte';

    const testFunc = () => {
        console.log('니ㅓㅇㄹ먼ㅇㄹ');
        setCookie('testCookie','valvalvalvalvalvalvalvalvalval')
    }

	function setCookie(name, value, options = {}) {
		options = {
			path: '/',
			// 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
			...options
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += '; ' + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += '=' + optionValue;
			}
		}

		document.cookie = updatedCookie;
	}
</script>

<button on:click={testFunc}>chkAuth</button>
