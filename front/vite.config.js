import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from "path";

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
				// 작업 공간(Workspace)의 루트를 지정
				searchForWorkspaceRoot(process.cwd()),
				// 커스텀 allow 옵션 규칙
				'test'
			],
		}
	},
});
