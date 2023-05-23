export const POST = async ({ request, cookies }) => {
    console.log('gogogogogogo');

    return new Response(JSON.stringify({ result: 'accessToken' }), { status: 200 });
}