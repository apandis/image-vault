<template>
	<div class="flex flex-col min-h-screen">
		<NavigationBar />
		<NuxtPage />
		<Footer />
		<CookiesConsentBanner />
	</div>
</template>

<script setup>
	const router = useRouter();
	let isCodeRequested = useCookie('isCodeRequested', { maxAge: 60 });
	let isCodeVerified = useCookie('isCodeVerified', { maxAge: 60 });

	onMounted(async () => {
		// Initiate cookies
		isCodeRequested.value = false;
		isCodeVerified.value = false;

		// if (isCodeVerified.value) {
		// 	router.push({ path: '/upload' });
		// } else {
		// 	router.push({ path: '/' });
		// }
	});

	watch(isCodeVerified, () => {
		console.log('Is Code Verified: ', isCodeVerified); // Doesn't watch or print anything!
	});
</script>

<style lang="scss" scoped></style>
