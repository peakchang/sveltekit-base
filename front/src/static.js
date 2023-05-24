import { resolve } from 'path';
import { createReadStream } from 'fs';

export function get({ params }) {
    const { filename } = params;
    const path = resolve('./public', filename);
    const stream = createReadStream(path);

    return {
        body: stream,
        headers: {
            'Content-Type': 'application/octet-stream' // 파일의 적절한 MIME 타입으로 변경해야 함
        }
    };
}