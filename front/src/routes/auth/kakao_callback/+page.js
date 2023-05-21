import axios from 'axios';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load = async ({ url }) => {
    console.log(url);
    let userRequest;
    try {
        // 카카오에 토큰 정보 요청하기
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

        // 토큰 수신 완료~ 카카오에 회원 정보 요청하기
        if ("access_token" in kakaoTokenRequest) {
            // 엑세스 토큰이 있는 경우 API에 접근
            const { access_token } = kakaoTokenRequest;
            userRequest = await (
                await fetch("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/json",
                    },
                })
            ).json();
            
        }

        console.log(userRequest);


        // 회원 정보 수신 완료 DB 조회하기~~!!

        // DB 조회해서 회원은 있는데 (이메일 중복 확인) 타입이 provider가 아닐경우 물어보기
        // (이 경우 +page.svelte 에서 +server.svelte 로 고객 정보 들고 POST 요청 해서 마무리 하기)

        // DB 조회해서 회원이 없으면 회원 가입 처리 (DB 저장)

        // 위에 회원 가입 처리가 되었거나, DB 조회해서 회원이 있으면 로그인 처리


        if (browser) {
            window.location.href = '/';
        }





    } catch (error) {
        alert('문제가 발생했습니다. 다시 시도해주세요')
        if (browser) {
            window.location.href = '/auth/login';
        }
        console.log(error);
    }
}