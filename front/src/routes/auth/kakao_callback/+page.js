import axios from 'axios';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load = async ({ url }) => {

    console.log(url);

    try {

        
        const baseUrl = "https://kauth.kakao.com/oauth/token";

        const config = {
            client_id: '73bc321608525586fc550b292581fc3c',
            client_secret: 'WEE91wyCpDKyQBmme6Ta8xV5FFfjfu1x',
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:5173/auth/kakao_callback",
            code: url.searchParams.get('code')
        };

        const params = new URLSearchParams(config).toString();
        const finalUrl = `${baseUrl}?${params}`;
        const kakaoTokenRequest = await (
            await fetch(finalUrl, {
                method: "POST",
                headers: {
                    "Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
                },
            })
        ).json();
        if ("access_token" in kakaoTokenRequest) {
            // 엑세스 토큰이 있는 경우 API에 접근
            const { access_token } = kakaoTokenRequest;
            const userRequest = await (
                await fetch("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/json",
                    },
                })
            ).json();
            console.log(userRequest);
        }


        if (browser) { // to prevent error window is not defined, because it's SSR
            window.location.href = '/';
        }





    } catch (error) {
        console.log(error);
    }
}