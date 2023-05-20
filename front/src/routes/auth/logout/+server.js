import { sql_con } from "$lib/server/db";
import { user_info, testCount } from '$lib/stores/auth_store';

export const POST = async ({ request, cookies }) => {

    let userInfo = {}
    user_info.subscribe((val) => {
        userInfo = val;
    })

    cookies.set("atk", "", { httpOnly: true, path: '/', maxAge: 0 })
    cookies.set("rtk", "", { httpOnly: true, path: '/', maxAge: 0 })

    const updateEmptyRetokenQuery = "UPDATE users SET user_retoken = '' WHERE user_email = ?";
    await sql_con.promise().query(updateEmptyRetokenQuery, [userInfo.email]);

    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}