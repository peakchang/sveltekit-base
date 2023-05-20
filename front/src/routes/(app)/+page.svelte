<script>
    // @ts-nocheck

    import { onMount } from "svelte";

    // @ts-ignore
    let rightFix = {};
    /**
     * @type {HTMLDivElement}
     */
    let pageWrap;
    let btnWrap;
    let scrollY;

    onMount(() => {});

    $: scrollY,
        (() => {
            if (pageWrap) {
                const moveBtnList = btnWrap.children;
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

                for (let i = 0; i < moveBtnList.length; i++) {
                    moveBtnList[i].innerHTML = "";
                    if (i == k - 1 && k != 1) {
                        moveBtnList[
                            i
                        ].innerHTML = `<i class="fa-regular fa-circle text-xl mt-3" />`;
                    } else if (i == k - 1 && k == 1) {
                        moveBtnList[
                            i
                        ].innerHTML = `<i class="fa-regular fa-circle text-xl" />`;
                    } else if (i == 0) {
                        moveBtnList[
                            i
                        ].innerHTML = `<i class="fa-solid fa-circle" />`;
                    } else {
                        moveBtnList[
                            i
                        ].innerHTML = `<i class="fa-solid fa-circle mt-3" />`;
                    }
                }
            }
        })();

    // @ts-ignore
    function testClick(e) {
        // @ts-ignore
        const nodes = [...this.parentElement.children];
        // @ts-ignore
        const index = nodes.indexOf(this);
        pageWrap.children[index].scrollIntoView({ behavior: "smooth" });
    }
</script>

<svelte:window bind:scrollY />

<div>
    <div
        class="fixed top-1/3 right-6 text-center cursor-pointer"
        bind:this={btnWrap}
    >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={testClick}>
            <i class="fa-solid fa-circle" />
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={testClick}>
            <i class="fa-regular fa-circle text-xl mt-3" />
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={testClick}>
            <i class="fa-solid fa-circle mt-3" />
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={testClick}>
            <i class="fa-solid fa-circle mt-3" />
        </div>
    </div>

    <div bind:this={pageWrap}>
        <div
            class="first-page h-screen bg-[url('/bgimg/first_bg.jpg')] bg-cover bg-fixed bg-center"
        >
            <div
                class="flex flex-col max-w-4xl mx-auto justify-center h-screen pb-52 lg:pb-64 text-center lg:text-left"
            >
                <div>
                    <p
                        class="font-bold gamsil text-amber-600 text-4xl pb-3 lg:text-6xl lg:pb-6"
                    >
                        운명은 우연을
                    </p>
                    <p
                        class="font-bold gamsil text-4xl pb-3 lg:text-6xl lg:pb-4"
                    >
                        가장해서 찾아옵니다.
                    </p>
                </div>

                <p
                    class="text-white score-light font-semibold text-2xl lg:text-3xl"
                >
                    BEST MARKETING COMPANY
                </p>
            </div>
        </div>

        <div class=" h-screen">
            <div class="h-4/5">
                <div>Marketing Plan.</div>
                <div class="grid grid-cols-1 md:grid-cols-2 px-2 pr-12 lg:px-32 mt-9">

                    <div class="flex gap-3 mt-2 lg:mt-8">
                        <div class=" w-1/4 flex justify-center items-center">
                            <img src="/icon1/cursor.png" alt="" style="width:100%; max-width: 180px;" />
                        </div>
                        <div class="w-3/4 flex flex-col lg:mt-3">
                            <div class="gamsil mb-1 text-amber-600 text-lg lg:text-3xl">검색광고</div>
                            <div class="score-light max-w-xs text-sm lg:text-base">
                                NAVER, DAUM, Google 등 전파 가능한 매체를 통해 설정한 키워드나 기업의 제품을 노출시켜 관련 사이트로 소비자를 유입시키는 광고 
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-2 lg:mt-8">
                        <div class=" w-1/4 flex justify-center items-center">
                            <img src="/icon1/cursor.png" alt="" style="width:100%; max-width: 180px;" />
                        </div>
                        <div class="w-3/4 flex flex-col lg:mt-3">
                            <div class="gamsil mb-1 text-amber-600 text-lg lg:text-3xl">검색광고</div>
                            <div class="score-light max-w-xs text-sm lg:text-base">
                                NAVER, DAUM, Google 등 전파 가능한 매체를 통해 설정한 키워드나 기업의 제품을 노출시켜 관련 사이트로 소비자를 유입시키는 광고 
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-2 lg:mt-8">
                        <div class=" w-1/4 flex justify-center items-center">
                            <img src="/icon1/cursor.png" alt="" style="width:100%; max-width: 180px;" />
                        </div>
                        <div class="w-3/4 flex flex-col lg:mt-3">
                            <div class="gamsil mb-1 text-amber-600 text-lg lg:text-3xl">검색광고</div>
                            <div class="score-light max-w-xs text-sm lg:text-base">
                                NAVER, DAUM, Google 등 전파 가능한 매체를 통해 설정한 키워드나 기업의 제품을 노출시켜 관련 사이트로 소비자를 유입시키는 광고 
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-2 lg:mt-8">
                        <div class=" w-1/4 flex justify-center items-center">
                            <img src="/icon1/cursor.png" alt="" style="width:100%; max-width: 180px;" />
                        </div>
                        <div class="w-3/4 flex flex-col lg:mt-3">
                            <div class="gamsil mb-1 text-amber-600 text-lg lg:text-3xl">검색광고</div>
                            <div class="score-light max-w-xs text-sm lg:text-base">
                                NAVER, DAUM, Google 등 전파 가능한 매체를 통해 설정한 키워드나 기업의 제품을 노출시켜 관련 사이트로 소비자를 유입시키는 광고 
                            </div>
                        </div>
                    </div>



                    


                </div>
            </div>
            <div
                class="bg-[url('/bgimg/second-bottom.jpg')] bg-cover bg-right-top h-1/5"
            />
        </div>

        <div class=" h-screen bg-green-700">asdfasdf</div>

        <div class=" h-screen bg-violet-700" />
    </div>
</div>

<style>
    .first-page {
        background-image: ("/bgimg/first_bg.jpg");
    }
</style>
