<template>
	<form
		v-if="!isCodeRequested"
		@submit.prevent="onRequestCode"
		class="grid grid-cols-1 gap-4 p-4 w-full md:max-w-sm md:mx-auto content-start"
	>
		<div class="flex flex-col">
			<label for="channel" class="text-gray-700 mb-2">Authentication Method</label>
			<select v-model="channel" name="channel" id="channel">
				<option value="email" disabled>E-mail</option>
				<option value="sms">SMS</option>
			</select>
		</div>
		<div v-if="channel === 'email'" class="flex flex-col text-gray-700 mb-2">
			<label for="email" class="block">E-mail Address</label>
			<input v-model="email" type="email" name="email" id="email" placeholder="john.doe@example.com" />
		</div>
		<div v-if="channel === 'sms'" class="flex flex-col text-gray-700 mb-2">
			<label for="tel" class="">Phone Number</label>
			<input
				v-model="tel"
				@input="lookupNumber(tel)"
				type="tel"
				name="tel"
				id="tel"
				placeholder="xxxxxxxxxx"
				required
				max="10"
				min="10"
			/>
		</div>
		<div class="flex flex-col">
			<button type="submit" class="bg-gray-900 hover:bg-gray-700 text-white p-3">Request Code</button>
		</div>
	</form>
	<form
		v-if="isCodeRequested"
		@submit.prevent="onVerifyCode"
		class="grid grid-cols-1 gap-4 p-4 w-full md:max-w-sm md:mx-auto"
	>
		<div v-if="channel === 'email'" class="flex flex-col text-gray-700 mb-2">
			<label for="email" class="block">E-mail Address</label>
			<input v-model="email" type="email" name="email" id="email" placeholder="john.doe@example.com" disabled />
		</div>
		<div v-if="channel === 'sms'" class="flex flex-col text-gray-700 mb-2">
			<label for="tel" class="">Phone Number</label>
			<input v-model="tel" type="tel" name="tel" id="tel" placeholder="xxx-xxx-xxxx" />
		</div>
		<div class="flex flex-col text-gray-700 mb-2">
			<label for="code" class="">Verification Code</label>
			<input v-model="code" type="text" name="code" id="code" placeholder="xxxxxx" />
		</div>
		<div class="flex flex-col text-gray-700 mb-2">
			<p>
				If you do not receive a code within a few minutes,
				<span @click="onRequestCode" class="text-sky-600">Request a new code</span>.
			</p>
		</div>
		<div class="flex flex-row text-gray-700 items-center mb-2">
			<input v-model="acceptTerms" type="checkbox" name="acceptTerms" id="acceptTerms" />
			<label for="acceptTerms" class="ml-3 text-xs"
				>I have read and accept the
				<NuxtLink to="/terms" target="_blank" class="text-sky-600">Terms and Conditions</NuxtLink> and
				<NuxtLink to="/hipaa" target="_blank" class="text-sky-600">HIPAA Agreement</NuxtLink>.
			</label>
		</div>
		<div class="flex flex-col">
			<button
				type="submit"
				class="bg-gray-800 text-white p-3"
				:class="acceptTerms ? 'hover:bg-gray-900' : 'opacity-50 cursor-not-allowed'"
				:disabled="!acceptTerms"
			>
				Verify Code
			</button>
		</div>
	</form>
</template>

<script setup>
	const router = useRouter();
	let queryCookie = useCookie('query', { maxAge: 60 });
	let isCodeRequested = useCookie('isCodeRequested', { maxAge: 600 });
	let isCodeVerified = useCookie('isCodeVerified', { maxAge: 3600 });
	let channel = ref('sms');
	let email = ref('');
	let tel = ref('');
	let code = ref('');
	let query = reactive({});
	let verification = reactive({});
	let lookup = reactive({});
	let acceptTerms = ref();

	const onRequestCode = async () => {
		if (channel.value === 'email') {
			const {
				data: res,
				pending,
				error,
				refresh,
			} = await useFetch(`/api/twilio/sendcode?to=${email.value}&channel=${channel.value}`);
			query = { channel: channel.value, email: email.value };
			verification = res;
			queryCookie.value = query;
			isCodeRequested.value = true;
		} else {
			const {
				data: res,
				pending,
				error,
				refresh,
			} = await useFetch(`/api/twilio/sendcode?to=${tel.value}&channel=${channel.value}`);
			query = { channel: channel.value, tel: tel.value };
			verification = res;
			queryCookie.value = query;
			isCodeRequested.value = true;
		}
	};
	const onVerifyCode = async () => {
		if (channel.value === 'email') {
			const {
				data: res,
				pending,
				error,
				refresh,
			} = await useFetch(`/api/twilio/verifycode?to=${email.value}&code=${code.value}`);
			verification = res;
			isCodeVerified.value = true;
			router.push({ path: '/upload' });
		} else {
			const {
				data: res,
				pending,
				error,
				refresh,
			} = await useFetch(`/api/twilio/verifycode?to=${tel.value}&code=${code.value}`);
			verification = res;
			isCodeVerified.value = true;
			router.push({ path: '/upload' });
		}
	};
	const lookupNumber = async (tel) => {
		if (tel.length >= 10) {
			const { data: res, pending, error, refresh } = await useFetch(`/api/twilio/lookup?to=${tel}`);
			lookup = res;
			console.log(res);
		}
	};
</script>

<style lang="scss" scoped></style>
