import express from 'express';
import path from 'path';
const app = express();
app.set('port', process.env.PORT || 3000);


// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);
app.use(express.static(path.join(__dirname, 'static')));

// app.use(cors());

import { handler } from "./front/build/handler.js"

app.use(handler);

app.listen(app.get('port'), () => {
    console.log(`server running in port ${app.get('port')}`);
})