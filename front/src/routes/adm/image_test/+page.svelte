<script>
    import { pc_sidebar } from '$lib/stores/opt_store';
	import ImageUpload from '$lib/components/ImageUpload.svelte';

    let outUpload = "on";
    let modifyImageList;
    let maxImgCount = 10;

	// imageUpload components 에서 불러온 데이터 (e.detail.getImgList) 를 it_img_list 에 할당
	const getImageArr = (e) => {
		if (e.detail.getImgList[0]) {
			it_img_list = e.detail.getImgList;
		}
	};
</script>

<div class="mt-16 px-6" class:ml-40={!$pc_sidebar}>
    <ImageUpload on:getImageArr={getImageArr} {modifyImageList} {outUpload} {maxImgCount} />
</div>

