<script>
	import axios from 'axios';
    import { pc_sidebar } from '$lib/stores/opt_store';
	import Editor from '$lib/components/Editor.svelte';

    let modifyVal;
	let it_explan;

    // Editor components 에서 불러온 데이터 (e.detail.editorContent) 를 it_explan 에 할당
    const getEditorContent = (e) => {
        it_explan = e.detail.editorContent;
    };
</script>

<div class="mt-16 px-6" class:ml-40={!$pc_sidebar}>
    <Editor on:getEditorContent={getEditorContent} {modifyVal} />

    <button on:click={() => console.log(it_explan)}>chkchk</button>
</div>

<style>
    :global(.ql-editor) {
		height: 320px;
		max-height: 320px;
		overflow: auto;
	}
</style>