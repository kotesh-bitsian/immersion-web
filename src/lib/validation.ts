const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

export function normalizeIndianMobile(raw: string): string {
	let digits = raw.replace(/\D/g, '');
	if (digits.startsWith('91') && digits.length >= 12) digits = digits.slice(2);
	if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
	return digits.slice(0, 10);
}

export function isValidEmail(value: string): boolean {
	return EMAIL.test(value.trim());
}

export function isValidIndianMobile(value: string): boolean {
	return INDIAN_MOBILE.test(normalizeIndianMobile(value));
}
