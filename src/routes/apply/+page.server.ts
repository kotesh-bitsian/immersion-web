import { fail } from '@sveltejs/kit';
import { isIndianCity } from '$lib/cities';
import { findProgram, programs } from '$lib/content';
import type { ApplyErrors, ApplyValues } from '$lib/form-types';
import { submitWeb3Form } from '$lib/server/web3forms';
import { isValidEmail, isValidIndianMobile, normalizeIndianMobile } from '$lib/validation';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const locked = findProgram(url.searchParams.get('program'));
	return {
		lockedProgram: locked?.name ?? null
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		if (String(data.get('botcheck') ?? '')) {
			return { success: true };
		}

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const phone = normalizeIndianMobile(String(data.get('phone') ?? ''));
		const university = String(data.get('university') ?? '').trim();
		const city = String(data.get('city') ?? '').trim();
		const program = String(data.get('program') ?? '').trim();
		const expectation = String(data.get('expectation') ?? '').trim();

		const errors: ApplyErrors = {};
		if (name.length < 2) errors.name = 'Enter your full name.';
		if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
		if (!isValidIndianMobile(phone)) {
			errors.phone = 'Enter a 10-digit Indian mobile number, without +91.';
		}
		if (university.length < 2) errors.university = 'Enter your university or college.';
		if (!isIndianCity(city)) errors.city = 'Choose a city from the list.';
		if (!programs.some((item) => item.name === program)) {
			errors.program = 'Choose a programme.';
		}
		if (expectation.length < 12) {
			errors.expectation = 'Tell us what you want from the programme.';
		}

		const values: ApplyValues = { name, email, phone, university, city, program, expectation };
		if (Object.keys(errors).length) {
			return fail(400, { errors, values });
		}

		try {
			await submitWeb3Form({
				subject: `ImmersionX application — ${program}`,
				form_type: 'application',
				name,
				email,
				phone: `+91 ${phone}`,
				university,
				city,
				program,
				expectation
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Could not send the application.';
			const submitErrors: ApplyErrors = { form: message };
			return fail(500, { errors: submitErrors, values });
		}

		return { success: true };
	}
};
