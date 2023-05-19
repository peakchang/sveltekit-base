import { sql_con } from "$lib/server/db";

import { tokenWork } from "$lib/server/lib"

export const load = async ({ cookies }) => {
    let user_info;
    const getAccessToken = cookies.get('atk') ? cookies.get('atk') : ''
    const getRefreshToken = cookies.get('rtk') ? cookies.get('rtk') : ''

    user_info = await tokenWork(getAccessToken, getRefreshToken, cookies)
    return {
        user_info
    }
}

