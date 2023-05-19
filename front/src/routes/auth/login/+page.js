import { user_info } from '$lib/stores/auth_store'

console.log(user_info.subscribe((n) => {
    console.log(n);
}));