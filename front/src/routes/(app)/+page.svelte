<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // You can also use <link> for styles

	let pageWrap;
	let btnWrap;
	let menuWrap;
	let scrollY;

	let subjectTop;
	let subjectBottom;
	let subjectTopTxt = '운명은 우연을';
	let subjectBottomTxt = '가장해서 찾아옵니다.';

	let subjectTopIdx = -1;
	let subjectBottomIdx = -1;

	const testFunc = () => {};

	onMount(() => {
		AOS.init();

		const subjectTopTxtArr = [...subjectTopTxt];
		const subjectBottomTxtArr = [...subjectBottomTxt];

		let tempSubjectTop = '';
		let topInterval = setInterval(() => {
			subjectTopIdx++;

			if (subjectTopTxtArr.length < subjectTopIdx + 1) {
				clearInterval(topInterval);
			} else if (subjectTopTxtArr[subjectTopIdx]) {
				tempSubjectTop = tempSubjectTop + subjectTopTxtArr[subjectTopIdx];
				subjectTop.innerHTML = tempSubjectTop;
			}
		}, 120);

		setTimeout(() => {
			console.log('이제 다음거 할차례?!?!?!?');

			let tempSubjectBottom = '';
			let bottomInterval = setInterval(() => {
				subjectBottomIdx++;

				if (subjectBottomTxtArr.length < subjectBottomIdx + 1) {
					clearInterval(bottomInterval);
				} else if (subjectBottomTxtArr[subjectBottomIdx]) {
					tempSubjectBottom = tempSubjectBottom + subjectBottomTxtArr[subjectBottomIdx];
					subjectBottom.innerHTML = tempSubjectBottom;
				}
			}, 90);
		}, 1200);
	});

	$: scrollY,
		(() => {
			if (pageWrap) {
				const moveBtnList = btnWrap.children;
				const menuList = menuWrap.children;

				const pages = pageWrap.children;
				let chkArr = [];
				for (let ii = 0; ii < pages.length; ii++) {
					const element = pages[ii];
					chkArr.push(element.getBoundingClientRect().top);
				}
				let k = 0;
				chkArr.map((e) => {
					if (e <= 0) {
						k++;
					}
				});

				console.log(chkArr);

				for (let i = 0; i < moveBtnList.length; i++) {
					moveBtnList[i].innerHTML = '';
					if (i == k - 1 && k != 1) {
						moveBtnList[i].innerHTML = `<i class="fa-regular fa-circle text-xl mt-3" />`;
					} else if (i == k - 1 && k == 1) {
						moveBtnList[i].innerHTML = `<i class="fa-regular fa-circle text-xl" />`;
					} else if (i == 0) {
						moveBtnList[i].innerHTML = `<i class="fa-solid fa-circle" />`;
					} else {
						moveBtnList[i].innerHTML = `<i class="fa-solid fa-circle mt-3" />`;
					}
				}
			}
		})();

	// @ts-ignore
	function moveScroll(e) {
		console.log(this);
		// @ts-ignore
		const nodes = [...this.parentElement.children];
		// @ts-ignore
		const index = nodes.indexOf(this);
		pageWrap.children[index].scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />

<div class="fixed top-0 left-0 w-full z-50 gamsil text-base md:text-xl bg-white p-2 opacity-75">
	<ul class="flex" bind:this={menuWrap}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li class="mr-3 cursor-pointer" on:click={moveScroll}>Main</li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li class="mr-3 cursor-pointer" on:click={moveScroll}>마켓팅</li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li class="mr-3 cursor-pointer" on:click={moveScroll}>데이터베이스</li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li class="mr-3 cursor-pointer" on:click={moveScroll}>전문가</li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li class="mr-3 cursor-pointer" on:click={moveScroll}>신청하기</li>
		<a href="/adm">
			<li>고고</li>
		</a>
	</ul>
</div>

<div>
	<!-- 우측 고정 스크롤 -->
	<div class="fixed top-1/3 right-6 text-center cursor-pointer z-20" bind:this={btnWrap}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={moveScroll}>
			<i class="fa-solid fa-circle" />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={moveScroll}>
			<i class="fa-regular fa-circle text-xl mt-3" />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={moveScroll}>
			<i class="fa-solid fa-circle mt-3" />
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={moveScroll}>
			<i class="fa-solid fa-circle mt-3" />
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={moveScroll}>
			<i class="fa-solid fa-circle mt-3" />
		</div>
	</div>

	<!-- 첫번째 단 -->
	<div bind:this={pageWrap}>
		<div class="first-page h-screen bg-[url('/bgimg/first_bg.jpg')] bg-cover bg-fixed bg-center">
			<div
				class="flex flex-col max-w-4xl mx-auto justify-center h-screen pb-52 lg:pb-64 text-center lg:text-left"
			>
				<div>
					<p
						class="font-bold gamsil text-amber-800 text-4xl pb-3 lg:text-6xl lg:pb-6"
						bind:this={subjectTop}
					/>
					<p class="font-bold gamsil text-4xl pb-3 lg:text-6xl lg:pb-4" bind:this={subjectBottom} />
				</div>

				<p
					class="text-white score-light font-semibold text-2xl lg:text-3xl"
					data-aos="fade-up"
					data-aos-delay="2100"
					data-aos-duration="700"
				>
					BEST MARKETING COMPANY
				</p>
			</div>
			
		</div>

		<!-- 두번째 단 -->

		<div class=" h-screen">
			<div class="h-4/5">
				<div class="pt-4 md:pt-12 dm-serif text-5xl md:text-6xl text-amber-800 text-center">
					Marketing Plan.
				</div>
				<div class=" text-teal-700">slfdjsdjf</div>
				<div class="grid grid-cols-1 gap-5 md:grid-cols-2 px-2 lg:px-32 mt-9">
					<div class="flex gap-3 mt-2 lg:mt-8" data-aos="flip-up" data-aos-duration="800">
						<div class="w-1/4 flex justify-center items-center">
							<img
								src="/icon1/cursor.png"
								alt=""
								class="w-5/6 md:w-full"
								style="max-width: 120px;"
							/>
						</div>
						<div class="w-3/4 flex flex-col">
							<div class="gamsil mb-1 text-amber-800 text-lg lg:text-3xl">검색광고</div>
							<div class="score-light text-xs md:text-sm max-w-xs md:max-w-none">
								<span class="inline-block">NAVER, DAUM, Google 등 전파 가능한 매체를</span>
								<span class="inline-block">통해 설정한 키워드나 기업의 제품을 노출시켜</span>
								<span class="inline-block">관련 사이트로 소비자를 유입시키는 광고</span>
								<span class="inline-block" />
							</div>
						</div>
					</div>

					<div class="flex gap-3 mt-2 lg:mt-8" data-aos="flip-down" data-aos-duration="900">
						<div class="w-1/4 flex justify-center items-center">
							<img
								src="/icon1/ad-blocker.png"
								alt=""
								class="w-5/6 md:w-full"
								style="max-width: 120px;"
							/>
						</div>
						<div class="w-3/4 flex flex-col">
							<div class="gamsil mb-1 text-amber-800 text-lg lg:text-3xl">디스플레이 광고</div>
							<div class="score-light text-xs md:text-sm max-w-xs md:max-w-none">
								<span class="inline-block">페이스북, 인스타그램, 카카오스토리, 유튜브 등</span>
								<span class="inline-block">다양한 SNS를 활용하는 광고로</span>
								<span class="inline-block">SNS 사용자들의</span>
								<span class="inline-block">자발적 참여를 통한</span>
								<span class="inline-block">정확하고 적은 예산의</span>
								<span class="inline-block">효과적인 마케팅 광고</span>
							</div>
						</div>
					</div>

					<div class="flex gap-3 mt-2 lg:mt-8" data-aos="flip-down" data-aos-duration="1000">
						<div class="w-1/4 flex justify-center items-center">
							<img
								src="/icon1/supermarket.png"
								alt=""
								class="w-5/6 md:w-full"
								style="max-width: 120px;"
							/>
						</div>
						<div class="w-3/4 flex flex-col">
							<div class="gamsil mb-1 text-amber-800 text-lg lg:text-3xl">쇼핑 광고</div>
							<div class="score-light text-xs md:text-sm max-w-xs md:max-w-none">
								<span class="inline-block">포털사이트 상단에 고정되어</span>
								<span class="inline-block">정해진 기간 동안에</span>
								<span class="inline-block">최다 노출이 되어</span>
								<span class="inline-block">최상의 효과를 내는 광고</span>
							</div>
						</div>
					</div>

					<div class="flex gap-3 mt-2 lg:mt-8" data-aos="flip-up" data-aos-duration="1100">
						<div class="w-1/4 flex justify-center items-center">
							<img src="/icon1/sms.png" alt="" class="w-5/6 md:w-full" style="max-width: 120px;" />
						</div>
						<div class="w-3/4 flex flex-col">
							<div class="gamsil mb-1 text-amber-800 text-lg lg:text-3xl">SMS(문자) 마케팅</div>
							<div class="score-light text-xs md:text-sm max-w-xs md:max-w-none">
								<span class="inline-block">포털사이트 상단에 고정되어</span>
								<span class="inline-block">정해진 기간 동안에</span>
								<span class="inline-block">최다 노출이 되어</span>
								<span class="inline-block">최상의 효과를 내는 광고</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-[url('/bgimg/second-bottom.jpg')] bg-cover bg-right-top h-1/5" />
		</div>

		<!-- 세번째 단 -->
		<div class=" h-screen">
			<div class="text-center h-full w-full max-w-7xl mx-auto px-6 relative">
				<div class="pt-12 dm-serif text-5xl md:text-6xl text-amber-800">Data Base.</div>

				<div class="score-light mt-9 max-w-sm mx-auto">
					<span class="inline-block text-sm md:text-base"
						>모모모 컴퍼니는 양질의 데이터 베이스를 기반으로</span
					>
					<span class="inline-block text-sm md:text-base"
						>소비자의 니즈가 확실하며, 높은 전환율을 자랑합니다.</span
					>
					<span class="inline-block text-sm md:text-base"
						>또한, 단가 경쟁에 유리해 높은 만족도를 자랑합니다.</span
					>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 mt-9">
					<div class="w-full h-32 md:h-auto">
						<img
							src="/icon2/commition.png"
							alt=""
							class="mx-auto float-left md:float-none w-1/2 md:w-4/5"
						/>
					</div>
					<div class="w-full h-32 md:h-auto">
						<img
							src="/icon2/viral.png"
							alt=""
							class="mx-auto float-right md:float-none w-1/2 md:w-4/5"
						/>
					</div>
					<div class="w-full h-32 md:h-auto">
						<img
							src="/icon2/sns.png"
							alt=""
							class="mx-auto float-left md:float-none w-1/2 md:w-4/5"
						/>
					</div>
				</div>

				<div class="absolute bottom-0 left-0 w-full h-7 md:h-20">
					<img src="/icon2/bottom_bg.jpg" alt="" />
				</div>
			</div>
		</div>

		<!-- 네번째 단 -->
		<div class=" h-screen bg-violet-700">
			<div class="text-center h-full w-full max-w-7xl mx-auto px-6 relative">
				<div class="pt-12 md:mt-24 dm-serif text-5xl md:text-6xl text-amber-800">Organization.</div>

				<div class="score-light mt-9 mx-auto">
					<span class="inline-block text-sm md:text-base"
						>다양한 분야에 지식이 많은 전문가 집단, 프로젝트에 있어서</span
					>
					<span class="inline-block text-sm md:text-base"
						>단 한 번도 실패해 본 적이 없는 무결점 완성도를 자랑하고 있으며,</span
					>
					<span class="inline-block text-sm md:text-base"
						>건전한 M&A 조성과 선순환 투자구조 마련을 위하여 노력합니다.</span
					>
				</div>

				<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-9 md:mt-24 gm-medium">
					<div class="w-4/5 md:w-full mx-auto">
						<div class="border border-gray-300 rounded-full overflow-hidden">
							<img src="/model/model1.jpg" alt="" />
						</div>
						<div class="mt-1 text-xs md:text-base">Marketing Manager</div>
						<div class="">김한별</div>
					</div>

					<div class="w-4/5 md:w-full mx-auto">
						<div class="border border-gray-300 rounded-full overflow-hidden">
							<img src="/model/model2.jpg" alt="" />
						</div>
						<div class="mt-1 text-xs md:text-base">Marketing Manager</div>
						<div class="">김요셉</div>
					</div>

					<div class="w-4/5 md:w-full mx-auto">
						<div class="border border-gray-300 rounded-full overflow-hidden">
							<img src="/model/model3.jpg" alt="" />
						</div>
						<div class="mt-1 text-xs md:text-base">Product Manager</div>
						<div class="">박존슨</div>
					</div>

					<div class="w-4/5 md:w-full mx-auto">
						<div class="border border-gray-300 rounded-full overflow-hidden">
							<img src="/model/model4.jpg" alt="" />
						</div>
						<div class="mt-1 text-xs md:text-base">Designer</div>
						<div class="">정한나</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 다섯번째 단 -->
		<div class=" h-screen bg-violet-700 bg-[url('/bgimg/bg_pattern.png')] bg-cover bg-bottom">
			<div class="text-center h-full w-full max-w-7xl mx-auto px-6 relative">
				<div class="pt-12 dm-serif text-5xl md:text-6xl text-amber-800">Contact Us.</div>

				<form>
					<div class="mt-12 score-light pr-4 md:pr-0">
						<div class="grid grid-cols-1 md:grid-cols-2 border-t-2 border-amber-800">
							<div class="md:col-span-2 flex border-b border-brown-200">
								<div class="bg-blue-gray-50 px-4 py-2 md:py-4 text-center" style="min-width:150px;">
									글쓴이
								</div>
								<div class="w-full px-4 py-2">
									<input
										type="text"
										name=""
										id=""
										class="border border-blue-gray-200 rounded-md w-full p-1 md:p-2"
									/>
								</div>
							</div>

							<div class="flex border-b border-brown-200">
								<div class=" bg-blue-gray-50 px-4 py-2 md:py-4" style="min-width:150px;">
									담당자 성함
								</div>
								<div class="w-full px-4 py-2">
									<input
										type="text"
										name=""
										id=""
										class="border border-blue-gray-200 rounded-md w-full p-1 md:p-2"
									/>
								</div>
							</div>

							<div class="flex border-b border-brown-200">
								<div class="bg-blue-gray-50 px-4 py-2 md:py-4" style="min-width:150px;">회사명</div>
								<div class="w-full px-4 py-2">
									<input
										type="text"
										name=""
										id=""
										class="border border-blue-gray-200 rounded-md w-full p-1 md:p-2"
									/>
								</div>
							</div>

							<div class="flex border-b border-brown-200">
								<div class=" bg-blue-gray-50 px-4 py-2 md:py-4" style="min-width:150px;">
									연락처
								</div>
								<div class="w-full px-4 py-2">
									<input
										type="text"
										name=""
										id=""
										class="border border-blue-gray-200 rounded-md w-full p-1 md:p-2"
									/>
								</div>
							</div>

							<div class="flex border-b border-brown-200">
								<div class=" bg-blue-gray-50 px-4 py-2 md:py-4" style="min-width:150px;">
									월 광고예산
								</div>
								<div class="w-full px-4 py-2">
									<input
										type="text"
										name=""
										id=""
										class="border border-blue-gray-200 rounded-md w-full p-1 md:p-2"
									/>
								</div>
							</div>

							<div class="md:col-span-2 md:flex border-b border-brown-200">
								<div class="bg-blue-gray-50 px-4 py-2 md:py-4 text-center" style="min-width:150px;">
									기타문의
								</div>
								<div class="w-full px-4 py-2">
									<textarea
										class="border border-blue-gray-200 rounded-md w-full p-1 md:p-2"
										cols="30"
										rows="2"
									/>
								</div>
							</div>
						</div>
					</div>

					<div
						class="mt-7 bg-blue-gray-50 py-3 flex justify-between text-xs md:text-base px-2 md:px-11 score-light"
					>
						<div>
							개인정보 수집 이용에 대한 동의 <button>자세히 보기</button>
						</div>
						<div>
							<label class="mr-3">
								<input type="radio" name="" id="" checked />
								동의
							</label>
							<label>
								<input type="radio" name="" id="" />
								미동의
							</label>
						</div>
					</div>

					<button
						class="gm-medium mt-7 border px-28 py-2 md:py-6 border-amber-500 bg-amber-500 text-2xl md:text-3xl rounded-lg"
					>
						신청하기
					</button>
				</form>
			</div>
		</div>

		<div class="my-8">
			<div class="px-6 max-w-5xl mx-auto score-light text-sm md:text-base">
				<div>
					<span class="inline-block">상호명 : 모모모 홀딩스 |</span>
					<span class="inline-block">대표 : 박성진 |</span>
					<span class="inline-block">전화번호 : 1644-8878 |</span>
					<span class="inline-block">사업자번호 : 208-98-12587 |</span>
					<span class="inline-block"
						>주소 : 서울시 금천구 가산디지털9로 구로구로구 성진빌딩 9층</span
					>
				</div>
				<div class="grid grid-cols-4 gap-4 mt-4">
					<div class="mx-auto" style="max-width: 150px;">
						<img src="/ft/ft_company1.jpg" alt="" />
					</div>
					<div class="mx-auto" style="max-width: 150px;">
						<img src="/ft/ft_company2.jpg" alt="" />
					</div>
					<div class="mx-auto" style="max-width: 150px;">
						<img src="/ft/ft_company3.jpg" alt="" />
					</div>
					<div class="mx-auto" style="max-width: 150px;">
						<img src="/ft/ft_company4.jpg" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.first-page {
		background-image: ('/bgimg/first_bg.jpg');
	}
</style>
