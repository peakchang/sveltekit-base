import fs from 'fs'
import { writeFileSync } from 'fs';
import { config } from 'dotenv';
config();
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

export const POST = async ({ request, url }) => {
    const now = moment().format('YYMMDD')
    const data = await request.json()
    let baseUrl;
    let saveUrl;
    imageFolderChk()

    console.log(`닷앤브가 필요한가?? ${process.env.VITE_DEV_STATUS}`);

    if (import.meta.env.VITE_DEV_STATUS === 'product') {
        baseUrl = url.origin + '/editor/editor' + now + '/' + data.fileName;
    } else {
        saveUrl = url.origin + '/public/uploads/editor/editor' + now + '/' + data.fileName;
        baseUrl = 'public/uploads/editor/editor' + now + '/' + data.fileName;
    }

    console.log(baseUrl);

    // // const saveFolder = `public/uploads/editor/editor${now}/${data.fileName}`
    const imageFileJson = JSON.parse(data.base64Data);
    console.log(imageFileJson);
    const imageFile = imageFileJson.image
    console.log(imageFile);

    writeFileSync(baseUrl, imageFile, 'base64');

    console.log(baseUrl);
    console.log(saveUrl);

    return new Response(JSON.stringify({ saveUrl }), { status: 200 });
}

const imageFolderChk = () => {
    const now = moment().format('YYMMDD')
    try {
        fs.readdirSync(`public`);
    } catch (error) {
        fs.mkdirSync(`public`);
    }

    try {
        fs.readdirSync(`public/uploads`);
    } catch (error) {
        fs.mkdirSync(`public/uploads`);
    }

    try {
        fs.readdirSync(`public/uploads/editor`);
    } catch (error) {
        fs.mkdirSync(`public/uploads/editor`);
    }

    try {
        fs.readdirSync(`public/uploads/editor/editor${now}`);
    } catch (error) {
        fs.mkdirSync(`public/uploads/editor/editor${now}`);
    }
}