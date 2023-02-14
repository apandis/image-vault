// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		twilio: {
			accountSID: process.env.TWILIO_ACCOUNT_SID,
			authToken: process.env.TWILIO_AUTH_TOKEN,
			serviceSID: process.env.TWILIO_SERVICE_SID,
		},
		// public: {
		// 	apiBase: '/api',
		// },
	},
});
