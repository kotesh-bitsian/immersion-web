import { fail } from '@sveltejs/kit';
import type { ContactErrors, ContactValues } from '$lib/form-types';
import { submitWeb3Form } from '$lib/server/web3forms';
import { isValidEmail } from '$lib/validation';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		if (String(data.get('botcheck') ?? '')) {
			return { success: true };
		}

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const message = String(data.get('message') ?? '').trim();

		const errors: ContactErrors = {};
		if (name.length < 2) errors.name = 'Enter your name.';
		if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
		if (message.length < 12) errors.message = 'Describe what you want to share.';

		const values: ContactValues = { name, email, message };
		if (Object.keys(errors).length) {
			return fail(400, { errors, values });
		}

		try {
			await submitWeb3Form({
				subject: `ImmersionX contact — ${name}`,
				form_type: 'contact',
				name,
				email,
				message
			});
		} catch (error) {
			const text = error instanceof Error ? error.message : 'Could not send your message.';
			const submitErrors: ContactErrors = { form: text };
			return fail(500, { errors: submitErrors, values });
		}

		return { success: true };
	}
};
