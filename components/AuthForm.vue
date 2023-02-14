<template>
	<form action="">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
			<label class="block" for="auth-method">
				<span class="text-gray-700">Select method for receiving authentication code</span>
				<select
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					id="auth-method"
					name="auth-method"
					v-model="channel"
				>
					<option value="E-mail" selected>E-Mail</option>
					<option value="SMS">SMS</option>
				</select>
			</label>
			<div v-if="channel == 'E-mail'">
				<label for="email" class="block">
					<span class="text-gray-700">Email Address</span>
					<input
						v-model="email"
						placeholder="john.doe@example.com"
						type="email"
						name="email"
						id="email"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</label>
			</div>
			<div v-if="channel == 'SMS'">
				<label for="telephone" class="block">
					<span class="text-gray-700">SMS Number</span>
					<input
						v-model="phoneNumber"
						placeholder="123-456-7890"
						pattern="[0-9]{10}"
						type="tel"
						name="telephone"
						id="telephone"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</label>
			</div>

			<button @click="sendCode" class="block rounded bg-black p-3 text-lg text-white hover:bg-gray-900" type="submit">
				Send Authentication Code
			</button>
		</div>
	</form>
</template>

<script setup>
	const channel = ref();
	const email = ref();
	const phoneNumber = ref();

	const sendCode = async () => {
		const {
			data: res,
			pending,
			error,
			refresh,
		} = await useFetch(`/api/twilio/sendcode?phonenumber=${phoneNumber.value}&channel=${channel.value}`);
		console.log(res);
		console.log({
			PhoneNumber: phoneNumber.value,
			Channel: channel.value,
		});
	};
</script>

<style lang="scss" scoped></style>
