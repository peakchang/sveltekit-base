import fs from 'fs'
import { writeFileSync } from 'fs';
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

export const POST = async ({ request, url }) => {
    console.log(url);
    const now = moment().format('YYMMDD')
    const data = await request.json()
    imageFolderChk()
    const baseUrl = url.origin + '/uploads/editor/editor' + now + '/' + data.fileName;
    const saveFolder = `static/uploads/editor/editor${now}/${data.fileName}`
    const imageFileJson = JSON.parse(data.base64Data);
    const imageFile = imageFileJson.image
    console.log(imageFile);
    console.log(baseUrl);

    writeFileSync(saveFolder, imageFile, 'base64');
    // const now = moment().format('YYMMDD')
    // console.log(now);
    // console.log(request);

    // console.log('여기 옴!!!!!!!!!');
    return new Response(JSON.stringify({ baseUrl }), { status: 200 });
}

const imageFolderChk = () => {
    const now = moment().format('YYMMDD')
    try {
        fs.readdirSync(`static`);
    } catch (error) {
        fs.mkdirSync(`static`);
    }

    try {
        fs.readdirSync(`static/uploads`);
    } catch (error) {
        fs.mkdirSync(`static/uploads`);
    }

    try {
        fs.readdirSync(`static/uploads/editor`);
    } catch (error) {
        fs.mkdirSync(`static/uploads/editor`);
    }

    try {
        fs.readdirSync(`static/uploads/editor/editor${now}`);
    } catch (error) {
        fs.mkdirSync(`static/uploads/editor/editor${now}`);
    }
}