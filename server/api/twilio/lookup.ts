const config = useRuntimeConfig();

import twilio from 'twilio';

const client = twilio(config.twilio.accountSID, config.twilio.authToken);

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	const lookup = await client.lookups.v2
		.phoneNumbers(`${query.to}`)
		.fetch()
		.then((response) => {
			return response;
		});

	return {
		lookup,
	};
});
