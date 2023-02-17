export default defineNuxtRouteMiddleware((to, from) => {
	let isCodeVerified = useCookie('isCodeVerified');
	if (isCodeVerified.value) {
		return navigateTo('/upload');
	}
});
