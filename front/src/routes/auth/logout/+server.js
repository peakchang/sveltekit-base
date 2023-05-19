export const POST = async ({ request, cookies }) => {
    // const body = await request.json()
    // console.log(body);
    console.log(cookies);

    cookies.set("atk", "", { httpOnly: true, path: '/', maxAge: 0 })

    cookies.set("rtk", "", { httpOnly: true, path: '/', maxAge: 0 })
    console.log('여기까지는 와??');
    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}