export function formatInr(n: number): string {
	const rounded = Math.round(n);
	const s = String(rounded);
	const last = s.slice(-3);
	const rest = s.slice(0, -3);
	if (rest) {
		return '₹' + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last;
	}
	return '₹' + last;
}
