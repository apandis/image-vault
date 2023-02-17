<template>
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-4 p-4">
			<InfoAlert />
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
			<Steps />
			<TwilioAuthForm />
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['upload'],
	});

	onBeforeMount(() => {});

	onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
