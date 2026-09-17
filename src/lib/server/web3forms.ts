import { env } from '$env/dynamic/private';

type Web3FormsPayload = Record<string, string>;

export async function submitWeb3Form(payload: Web3FormsPayload): Promise<void> {
	const accessKey = env.WEB3FORMS_ACCESS_KEY;
	if (!accessKey) {
		throw new Error(
			'Lead capture is not configured. Add WEB3FORMS_ACCESS_KEY (https://web3forms.com).'
		);
	}

	const response = await fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			access_key: accessKey,
			from_name: 'ImmersionX website',
			...payload
		})
	});

	const data = (await response.json()) as { success?: boolean; message?: string };
	if (!response.ok || !data.success) {
		throw new Error(data.message || 'Could not send the form. Please try again.');
	}
}
