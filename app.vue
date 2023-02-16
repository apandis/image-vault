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
	let isCodeRequested = useCookie('isCodeRequested', { maxAge: 600 });
	let isCodeVerified = useCookie('isCodeVerified', { maxAge: 3600 });

	onBeforeMount(() => {
		if (!isCodeRequested.value) {
			isCodeRequested.value = false;
		}
		if (!isCodeVerified.value) {
			isCodeVerified.value = false;
		}
		if (isCodeVerified.value) {
			router.push({ path: '/upload' });
		} else {
			router.push({ path: '/' });
		}
	});

	onMounted(async () => {});

	watch(isCodeVerified, () => {
		console.log('Is Code Verified: ', isCodeVerified); // Doesn't watch or print anything!
	});
</script>

<style lang="scss" scoped></style>
