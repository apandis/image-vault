<template>
	<div class="container mx-auto">
		<div class="grid grid-cols-1 gap-4 p-4 mb-6">
			<div
				class="flex flex-row p-4 text-grey-700 bg-gradient-to-t from-orange-200 to-orange-100 text-lg rounded-lg mx-auto w-fit shadow items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-9 h-9 shrink-0 text-orange-500"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
					/>
				</svg>
				<p class="text-center text-orange-500 ml-3">
					For optimal results, we recommend using Chrome, Firefox, or Microsoft Edge browsers.
				</p>
			</div>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
			<Steps />
			<TwilioAuthForm />
		</div>
	</div>
</template>

<script setup>
	let authMethod = ref();
</script>

<style lang="scss" scoped></style>
