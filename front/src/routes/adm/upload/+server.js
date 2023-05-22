import { writeFileSync } from 'fs';


export const POST = async ({ request, cookies }) => {

    console.log('여기 포스트는 오고?!?!??!');
    const data = JSON.parse((await request.body.read()).toString());

    const file = data['image'];

    writeFileSync(`static/avatar.png`, file, 'base64');
}