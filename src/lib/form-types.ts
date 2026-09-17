export type ApplyValues = {
	name: string;
	email: string;
	phone: string;
	university: string;
	city: string;
	program: string;
	expectation: string;
};

export type ApplyErrors = Partial<ApplyValues> & { form?: string };

export type ContactValues = {
	name: string;
	email: string;
	message: string;
};

export type ContactErrors = Partial<ContactValues> & { form?: string };
