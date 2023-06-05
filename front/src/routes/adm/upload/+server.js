import { writeFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { finished } from 'stream/promises';
import { createRequire } from 'module';
import { pipeline } from 'stream';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import busboy from "busboy";

export const POST = async ({ request, cookies }) => {

    console.log('POST 진입?!?!?!?');
    // console.log(request);

    // const data = await request.json()
    const data = await request.formData()
    console.log(data.get('testval'));
    console.log(data.get('editorimg'));
    const file = data.get('editorimg');

    await fs.writeFile('static/test.png', file.stream());




    // console.table([...data.entries()])
    // const reData = [...data.entries()];
    // console.log(reData[2]);
    // const fields = {};
    // console.log(busboy);


    // console.log(data);
    // const jsonData = JSON.parse(data.body);
    // console.log('여기 포스트는 오고?!?!??!');
    // // 이게 BASE64 str
    // const file = jsonData['image'];
    // await writeFileSync(`static/testimage.png`, file, 'base64');
    // writeFileSync(`static/testimage.png`, file, 'base64');

    // writeFileSync(`static/testimage.png`, file, 'base64');

    return new Response({ status: 200 });
}