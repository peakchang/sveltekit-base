import { sql_con } from "$lib/server/db";
import jwt from "jsonwebtoken";

export const GET = async ({ request, url, cookies }) => {
    cookies.set('testVal','gogogogogogogo',{HttpOnly : true});
    cookies.set('testVal2','noonononononononono',{HttpOnly : true});

    const testCookieVal = cookies.get('testVal2');

    const refreshToken = jwt.sign(
        { statusId: 'test_status' },
        import.meta.env.VITE_JWT_SECRET_KEY
    );


    // const params = await request.params();
    const resultType = url.searchParams.get('testChk');
    if(resultType == 'auth'){
        return new Response(JSON.stringify({ message: "authchkchk!!!" }), { status: 200 })
    }else{
        return new Response(JSON.stringify({ message: "nononononono!!!" }), { status: 200 })
    }
}

export const POST = async ({ request }) => {
    const body = await request.json()

    const insertPostQuert = "INSERT INTO test_board (tb_subject,tb_content) VALUES (?,?)";
    await sql_con.promise().query(insertPostQuert, [body.subject, body.content]);
    
    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}