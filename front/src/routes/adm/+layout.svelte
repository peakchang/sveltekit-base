<script>
	import { browser } from '$app/environment';
	import '$src/app.css';
	import { onMount, beforeUpdate } from 'svelte';
	import { user_info } from '$lib/stores/auth_store';
	import { goto } from '$app/navigation';
	import { beforeNavigate } from '$app/navigation';
	import '$src/app.css';
	import '$node_modules/@fortawesome/fontawesome-free/css/all.min.css';

	import { page } from '$app/stores';
	// import { auth_chk } from "$front_lib/lib";

	import SideBar from '$lib/components/SideBar.svelte';
	import axios from 'axios';

	export let data;
	onMount(() => {
		$user_info = data.userInfo;
        console.log($user_info.rate);
		if ($user_info.rate < 5) {
			alert('권한이 없습니다.');
			goto('/');
		}
	});
	import { admin_sidebar, pc_sidebar, mobile_sidebar } from '$lib/stores/opt_store';

	const buildLink = import.meta.env.VITE_BUILD_LINK;
	console.log(buildLink);

	$pc_sidebar = false;

	let user_area = false;
	let innerWidth;

	let menu_list = [
		{
			icon: '<i class="fa-solid fa-gear"></i>',
			name: '메인관리',
			link: '/adm'
		}
	];

	let url = '/admin';
	$: url = $page.url.pathname;

	$: {
		console.log($page.url.pathname);
		console.log($pc_sidebar);
		// auth_chk();
	}
	$: {
		console.log('ooooooooooooo');
		if (innerWidth < 980) {
			$pc_sidebar = true;
		} else {
			$pc_sidebar = false;
			$mobile_sidebar = true;
		}
	}

	const user_area_toggle = (ele) => {
		ele.addEventListener('click', (e) => {
			user_area = !user_area;
			e.stopPropagation();
		});

		window.addEventListener('click', () => {
			user_area = false;
		});
	};

	const mobile_sidebar_toggle = (ele) => {
		ele.addEventListener('click', (e) => {
			$mobile_sidebar = !$mobile_sidebar;
			e.stopPropagation();
		});

		window.addEventListener('click', () => {
			$mobile_sidebar = true;
		});
	};
</script>

<svelte:window bind:innerWidth />

{#if $user_info.rate > 3}
	<div class="fixed left-0 top-0 w-full z-50 py-2 px-6 lg:pl-28 bg-blue-gray-600">
		<button
			class="text-2xl text-white hidden md:inline-block"
			on:click={() => {
				$pc_sidebar = !$pc_sidebar;
			}}
		>
			<i class="fa-solid fa-burger" />
		</button>

		<button class="p pt-1" use:user_area_toggle>
			<span class="text-white ml-6 relative">
				User님 로그인중
				{#if user_area}
					<div class="absolute top-7 left-0 w-36 z-50 border rounded-lg bg-white">
						<ul class="text-center">
							<a href="/">
								<li class="mt-1 border-b border-gray-200 text-blue-gray-700">HOME</li>
							</a>
							<a href="/">
								<li class="mt-1 border-b border-gray-200 text-blue-gray-700">LOGOUT</li>
							</a>
						</ul>
					</div>
				{/if}
			</span>
			<span class="text-white ml-2"><i class="fa-solid fa-caret-down" /></span>
		</button>

		<button
			class="text-2xl text-white inline-block float-right relative z-auto md:hidden"
			use:mobile_sidebar_toggle
		>
			<i class="fa-solid fa-burger" />

			<div
				class="border border-slate-400 w-40 absolute top-9 bg-white text-black text-sm rounded-md"
				style="right:-23px"
				class:hidden={$mobile_sidebar}
			>
				<ul>
					{#each menu_list as list}
						<li class="py-2 border-b border-gray-200">
							{@html list.icon}
							{list.name}
						</li>
					{/each}
				</ul>
			</div>
		</button>
	</div>

	<SideBar {menu_list} />
	<slot />
{/if}

<style>
	:global(.suit-font) {
		font-family: 'SUIT';
	}

	:global(.table_wrap) {
		width: 100%;
		overflow: auto;
	}

	:global(.table_area) {
		width: 100%;
		min-width: 880px;
	}
</style>
