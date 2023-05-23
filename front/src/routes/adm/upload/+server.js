import { writeFileSync } from 'fs';
import { writeFile } from 'fs/promises';

export const POST = async ({ request, cookies }) => {

    const data = await request.json()

    console.log(data);


    const jsonData = JSON.parse(data.body);

    console.log('여기 포스트는 오고?!?!??!');

    // 이게 BASE64 str
    const file = jsonData['image'];

    await writeFileSync(`static/testimage.png`, file, 'base64');
    // writeFileSync(`static/testimage.png`, file, 'base64');

    // writeFileSync(`static/testimage.png`, file, 'base64');

    return new Response({ status: 200 });
}