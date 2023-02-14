const config = useRuntimeConfig();

import twilio from 'twilio';

const client = twilio(config.twilio.accountSID, config.twilio.authToken);

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const verification = await client.verify.v2
		.services(config.twilio.serviceSID)
		.verifications.create({
			to: `+1${query.to}`,
			channel: `${query.channel}`,
		})
		.then((response) => {
			return response;
		});

	return {
		verification,
	};
});
