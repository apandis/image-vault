<template>
	<div
		v-show="!cookiesConsent"
		class="fixed inset-x-0 bottom-0 flex flex-col justify-between gap-y-4 gap-x-8 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8"
	>
		<p class="max-w-4xl text-sm leading-6 text-gray-900">
			We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By
			clicking "Accept All", you consent to our use of cookies. See our
			<NuxtLink to="./cookies" class="font-semibold text-indigo-600">Cookie Policy</NuxtLink>.
		</p>
		<div class="flex flex-none items-center gap-x-5">
			<button
				@click="acceptCookies"
				type="button"
				class="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
			>
				Accept All
			</button>
			<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Reject All</button>
		</div>
	</div>
</template>

<script setup>
	let cookiesConsent = ref(true);

	onMounted(() => {
		if (localStorage.getItem('cookiesConsent')) {
			cookiesConsent.value = JSON.parse(localStorage.getItem('cookiesConsent'));
		} else {
			cookiesConsent.value = false;
			localStorage.setItem('cookiesConsent', false);
		}
	});

	const acceptCookies = () => {
		cookiesConsent.value = true;
		localStorage.setItem('cookiesConsent', true);
	};
</script>

<style lang="scss" scoped></style>
