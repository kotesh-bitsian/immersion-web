export const programs = [
	{
		name: 'AI in Medicine',
		description: 'Build and validate a diagnostic model on clinical data, with clinicians in the room.',
		campus: 'Asian Institute of Technology',
		city: 'Thailand',
		seats: 'Filling',
		seatsLow: true
	},
	{
		name: 'FinTech Immersion',
		description: 'Payments, lending and risk, taken apart by the people who run them.',
		campus: 'Add campus',
		city: 'Add city',
		seats: 'Open',
		seatsLow: false
	},
	{
		name: 'Cyber Security',
		description: 'Live-range defence and incident response. Best after some systems or networking grounding.',
		campus: 'Add campus',
		city: 'Add city',
		seats: 'Open',
		seatsLow: false
	},
	{
		name: 'Data Science',
		description: 'The widest-opening door of the five. The same toolkit underneath the other three tracks.',
		campus: 'Add campus',
		city: 'Add city',
		seats: 'Open',
		seatsLow: false
	},
	{
		name: 'Leadership',
		description: 'Decision-making, negotiation and running teams. Strongest taken after a technical base.',
		campus: 'Add campus',
		city: 'Add city',
		seats: 'Open',
		seatsLow: false
	}
] as const;

export type ProgramName = (typeof programs)[number]['name'];

export function programSlug(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function findProgram(param: string | null): (typeof programs)[number] | null {
	if (!param) return null;
	const value = decodeURIComponent(param).trim();
	return (
		programs.find((program) => program.name === value || programSlug(program.name) === value) ??
		null
	);
}

export const certificates = [
	{
		institution: 'Asian Institute of Technology',
		what: 'Certificate of completion for the AI in Medicine immersion, issued on campus.',
		place: 'Bangkok, Thailand',
		slot: false
	},
	{
		institution: 'Georgian National University SEU',
		what: 'Certificate of completion for the AI immersion program, issued on campus.',
		place: 'Tbilisi, Georgia',
		slot: false
	},
	{
		institution: 'Partner institution',
		what: 'Replace with your Cyber Security host and the exact certificate wording they issue.',
		place: 'Add location',
		slot: true
	},
	{
		institution: 'Partner institution',
		what: 'Replace with your Data Science and Leadership hosts.',
		place: 'Add location',
		slot: true
	}
] as const;

export const steps = [
	{
		n: '01',
		title: 'Apply and talk to an advisor',
		body: "A short form, then a conversation about whether the track you picked is the right one. We'll tell you if it isn't."
	},
	//{
	//	n: '02',
	//	title: 'Pre-work, four weeks, online',
	//	body: 'You arrive on campus already fluent in the basics, so the two weeks abroad are spent on the hard part.'
	//},
	{
		n: '02',
		title: 'Campus Immersion — One, Two, Three Weeks',
		body: 'Faculty sessions, site visits, and a project you present to practitioners on the final day.'
	},
	{
		n: '03',
		title: 'Certificate and Networking',
		body: 'Your certificate from the host institution, your project written up for your portfolio, and continued access to the cohort.'
	}
] as const;

export const voices = [
	{
		quote:
			"Placeholder quote — swap in a real alum's words about the project they built and where it took them.",
		name: 'Name',
		meta: 'Track, cohort year — current role'
	},
	{
		quote:
			'Placeholder quote — a line about the cohort or the faculty works better here than praise for the programme.',
		name: 'Name',
		meta: 'Track, cohort year — current role'
	},
	{
		quote:
			'Placeholder quote — one alum describing a concrete outcome is worth three describing a feeling.',
		name: 'Name',
		meta: 'Track, cohort year — current role'
	}
] as const;

export const weekWordsCap = ['One week', 'Two weeks', 'Three weeks'] as const;
export const weekWords = ['1 week', '2 weeks', '3 weeks'] as const;
