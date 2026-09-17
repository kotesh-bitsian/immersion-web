<script lang="ts">
	import { formatInr } from '$lib/format';

	let salary = $state(45000);
	let uplift = $state(25);
	let fee = $state(80000);

	const monthlyDelta = $derived(salary * (uplift / 100));
	const threeYearExtra = $derived(monthlyDelta * 36);
	const payback = $derived.by(() => {
		if (monthlyDelta <= 0) return '—';
		const months = Math.ceil(fee / monthlyDelta);
		if (months > 60) return 'Over 5 years';
		return months === 1 ? '1 month' : `${months} months`;
	});
</script>

<div class="calc">
	<div class="calc-in">
		<div class="field">
			<label for="sal">Current monthly salary — <span class="val">{formatInr(salary)}</span></label>
			<input id="sal" type="range" min="0" max="250000" step="5000" bind:value={salary} />
			<span class="hint">Set this to zero if you're still studying.</span>
		</div>
		<div class="field">
			<label for="up">Salary increase you're targeting — <span class="val">{uplift}%</span></label>
			<input id="up" type="range" min="0" max="100" step="5" bind:value={uplift} />
			<span class="hint">Your own estimate, based on roles you've actually seen advertised.</span>
		</div>
		<div class="field">
			<label for="fee">Programme fee — <span class="val">{formatInr(fee)}</span></label>
			<input id="fee" type="range" min="80000" max="200000" step="5000" bind:value={fee} />
			<span class="hint">Starts from ₹80,000. Excludes visa and flight tickets.</span>
		</div>
	</div>

	<div class="calc-out">
		<div class="out-block">
			<div class="out-lbl">Fee recovered in</div>
			<div class="out-big">{payback}</div>
		</div>
		<div class="out-block">
			<div class="out-lbl">Extra earnings, first three years</div>
			<div class="out-mid">{formatInr(monthlyDelta <= 0 ? 0 : threeYearExtra)}</div>
		</div>
		<div class="out-block">
			<div class="out-lbl">Monthly difference</div>
			<div class="out-mid">{formatInr(monthlyDelta <= 0 ? 0 : monthlyDelta)}</div>
		</div>
	</div>
</div>
