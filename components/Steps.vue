<template>
	<div class="grid grid-cols-1 gap-4 p-4 w-full md:max-w-md md:mx-auto content-start">
		<!-- <h1 class="text-center text-gray-700 text-4xl font-extrabold">How it work</h1> -->
		<div v-for="step in steps" :key="step.number" class="flex flex-row items-center">
			<h1 class="text-gray-700 font-medium text-3xl p-3">{{ step.number }}</h1>
			<p class="ml-4 text-gray-700">{{ step.description }}</p>
		</div>
	</div>
</template>

<script setup>
	const steps = [
		{
			number: '1',
			description: 'Authenticate using your email address or text message.',
		},
		{
			number: '2',
			description: 'Accept Terms and Conditions, HIPAA Agreement and click Confirm Authentication Code.',
		},
		{
			number: '3',
			description: 'Click choose folder button and select the study you want to share.',
		},
		{
			number: '4',
			description: 'Click Upload and wait until the Transfer Complete message appears.',
		},
	];
</script>

<style lang="scss" scoped></style>
