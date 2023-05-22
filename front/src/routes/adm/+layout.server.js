import { tokenWork } from "$lib/server/lib"

export const load = async ({ cookies }) => {
    let userInfo;
    console.log('기본 쿠키 셋업 테스트!! ADM!!');
    // 토큰들 찾아서 함수에 넣고 user_info 반환
    const getAccessToken = cookies.get('atk') ? cookies.get('atk') : ''
    const getRefreshToken = cookies.get('rtk') ? cookies.get('rtk') : ''
    userInfo = await tokenWork(getAccessToken, getRefreshToken, cookies)

    return { userInfo }
}