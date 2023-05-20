import jwt from "jsonwebtoken";
import { sql_con } from "$lib/server/db";

export const tokenWork = async (getAccessToken, getRefreshToken, cookies) => {

    // 1. 액세스 토큰 유무 체크! (세션 쿠키를 사용하기 때문에 브라우저 꺼지거나 30분이 지나면 없어짐)
    let result;

    // 2. 액세스 토큰이 있으면 유저 정보 리턴
    if (getAccessToken) {
        result = await jwt.verify(getAccessToken, import.meta.env.VITE_JWT_SECRET_KEY, async (err, data) => {
            if (err) {
                return false;
            } else {

                // 리프레쉬 토큰 남은시간 검증!! 하루 미만으로 남았을경우 재발급!!
                await jwt.verify(getRefreshToken, import.meta.env.VITE_JWT_SECRET_KEY, async (err, redata) => {

                    const now = new Date();
                    const nowNumTemp = now.getTime()
                    const nowNum = Number(nowNumTemp.toString().slice(0, 10))
                    const remainingTime = redata.exp - nowNum
                    if (remainingTime < 86400) {

                        const selectUserIdxQuery = "SELECT idx FROM users WHERE user_email = ?"
                        const selectUserIdx = await sql_con.promise().query(selectUserIdxQuery, [data.userInfo.email]);
                        const select_user_idx = selectUserIdx[0][0]
                        const refreshToken = jwt.sign(
                            { userId: select_user_idx.idx },
                            import.meta.env.VITE_JWT_SECRET_KEY,
                            { expiresIn: '15s' }
                        );
                        cookies.set('rtk', refreshToken, { path: '/', secure: true, HttpOnly: true, maxAge: 259200 });
                        const updateUserRetokenQuery = "UPDATE users SET user_retoken = ? WHERE idx = ?";
                        await sql_con.promise().query(updateUserRetokenQuery, [refreshToken, select_user_idx.idx]);
                    }
                })
                return data.userInfo
            }
        })
    }

    // 3. 액세스 토큰이 만료 되었거나 (false) 쿠키가 삭제되어 토큰 자체가 존재하지 않으면 리프레쉬 토큰 검증 시작!
    // 동시에 refresh token 을 담은 쿠키가 만료되는 경우에도 로그인 불가
    if (!result && getRefreshToken) {
        
        result = await jwt.verify(getRefreshToken, import.meta.env.VITE_JWT_SECRET_KEY, async (err, data) => {
            // 3-1. refresh token 까지 만료 되었을시 store 값 비우고 로그아웃 상태
            if (err) {
                return false
            } else {
                // 3-2. 쿠키의 refresh token과 DB의 refresh token 대조 후 맞지 않으면 로그인 불가하게 처리
                // 먼저 user 정보 불러오기
                const getUserQuery = "SELECT * FROM users WHERE idx = ?";
                const getUser = await sql_con.promise().query(getUserQuery, [data.userId]);
                const get_user = getUser[0][0];
                if (get_user.user_retoken != getRefreshToken) {
                    return false;
                }

                // 3-3. 3-2 대조 후 정상이면 access token 재발급
                const userInfo = {
                    email: get_user.user_email,
                    name: get_user.user_name,
                    nick: get_user.user_nick,
                    thumbnail: get_user.user_thumbnail,
                    rate: get_user.user_rate,
                }
                const accessToken = jwt.sign(
                    { userInfo },
                    import.meta.env.VITE_JWT_SECRET_KEY,
                    { expiresIn: '2h' }
                );
                cookies.set('atk', accessToken, { path: '/' });



                // 3-4 만약, refresh 토큰 남은 시간이 1일 이하이면 refresh 토큰 재발급 및 DB 재 저장
                // remainingTime은 남은 초 (/ 60 = 1분 // / 3600 = 1시간 // /86400 = 1일)

                const now = new Date();
                const nowNumTemp = now.getTime()
                const nowNum = Number(nowNumTemp.toString().slice(0, 10))
                const remainingTime = data.exp - nowNum
                if (remainingTime < 86400) {
                    const refreshToken = jwt.sign(
                        { userId: get_user.idx },
                        import.meta.env.VITE_JWT_SECRET_KEY,
                        { expiresIn: '3d' }
                    );
                    cookies.set('rtk', refreshToken, { path: '/', secure: true, HttpOnly: true, maxAge: 259200 });
                    const updateUserRetokenQuery = "UPDATE users SET user_retoken = ? WHERE idx = ?";
                    await sql_con.promise().query(updateUserRetokenQuery, [refreshToken, data.userId]);
                }





                // 3. userInfo return
                return userInfo
            }
        })
    } else if (!result && !getRefreshToken) {
        result = false;
    }
    return result
}