const config = useRuntimeConfig();

import twilio from 'twilio';

const client = twilio(config.twilio.accountSID, config.twilio.authToken);

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const verification = await client.verify.v2
		.services(config.twilio.serviceSID)
		.verificationChecks.create({
			to: `+1${query.to}`,
			code: `${query.code}`,
		})
		.then((response) => {
			return response;
		});

	return {
		verification,
	};
});
