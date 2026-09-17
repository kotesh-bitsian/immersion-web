<script lang="ts">
	import { onMount } from 'svelte';
	import RoiCalculator from '$lib/components/RoiCalculator.svelte';
	import { certificates, programs, steps, voices, weekWords, weekWordsCap } from '$lib/content';

	let weekIndex = $state(1);
	let fading = $state(false);

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;

		const id = setInterval(() => {
			fading = true;
			setTimeout(() => {
				weekIndex = (weekIndex + 1) % weekWords.length;
				fading = false;
			}, 300);
		}, 2200);

		return () => clearInterval(id);
	});
</script>

<header class="hero" id="main">
	<div class="wrap">
		<div class="reveal">
			<h1>
				<span class="wk-cycle" class:is-fading={fading}>{weekWordsCap[weekIndex]}</span> abroad that
				your <em>résumé</em> keeps earning from.
			</h1>
			<p class="lede">
				Five immersion tracks, taught on campus with partner institutions and working practitioners.
				You leave with a certificate, a shipped project, and a cohort that answers your messages
				years later.
			</p>
			<div class="cta-row">
				<a class="btn gold" href="#apply">Start an application</a>
				<a
					class="btn ghost"
					style="box-shadow:inset 0 0 0 1.5px rgba(237,240,242,.4);color:var(--paper)"
					href="#programs">See the five tracks</a
				>
			</div>
		</div>
		<dl class="hero-panel reveal">
			<dt>Programme fee</dt>
			<dd>From ₹80,000<small>Excludes visa and flight tickets</small></dd>
			<dt>Format</dt>
			<dd>On campus<small>Plus pre-work and post-programme mentoring</small></dd>
			<dt>Cohort size</dt>
			<dd>Capped<small>Small enough that faculty learn your name</small></dd>
		</dl>
	</div>
</header>

<section class="sec" id="programs">
	<div class="wrap">
		<div class="sec-head">
			<h2>Five tracks, one departure board</h2>
			<p>
				Each track is built around a real problem set rather than a syllabus. Pick the one closest to
				the work you want to be doing in two years — not the one closest to your degree.
			</p>
		</div>

		<div class="board">
			<div class="row row-h">
				<span>Track</span><span>Destination</span><span>Duration</span><span>Next cohort</span><span
				></span>
			</div>

			{#each programs as program (program.name)}
				<div class="row">
					<div class="pblock">
						<div class="pname">{program.name}</div>
						<p class="pdesc">{program.description}</p>
					</div>
					<div class="cell">{program.campus}<small>{program.city}</small></div>
					<div class="cell">
						<span class="wk-cycle" class:is-fading={fading}>{weekWords[weekIndex]}</span><small
							>+ 4 weeks pre-work</small
						>
					</div>
					<div class="cell">Add date<small class="seats" class:low={program.seatsLow}>{program.seats}</small></div>
					<a class="btn" href="#apply">Apply</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="sec roi" id="roi">
	<div class="wrap">
		<div class="sec-head">
			<h2>Work out your own payback</h2>
			<p>
				We'd rather you did this arithmetic than took our word for it. Move the sliders to your
				situation and see how long the fee takes to come back.
			</p>
		</div>

		<RoiCalculator />
		<p class="disclaimer">
			This is a projection from the numbers you entered, not a forecast or a guarantee from
			ImmersionX. Salary outcomes depend on your background, the market, and your own effort. Travel,
			visa and living costs are not included in the fee.
		</p>

		<div class="expert-note">
			<p>
				<strong>Not sure which track pays back fastest for you?</strong> Our admissions experts look
				at your background and goals and tell you which one or two immersions actually make sense —
				before you pay anything.
			</p>
			<a class="btn gold" href="#apply">Talk to an expert</a>
		</div>
	</div>
</section>

<section class="sec" id="certificates">
	<div class="wrap">
		<div class="sec-head">
			<h2>Certification you can put a name to</h2>
			<p>
				Every track ends in a certificate issued by the host institution, with the campus and contact
				hours stated on it — so a recruiter can verify what you actually did.
			</p>
		</div>
		<div class="certs">
			{#each certificates as cert, i (i)}
				<div class="cert" class:slot={cert.slot}>
					<div class="inst">{cert.institution}</div>
					<p class="what">{cert.what}</p>
					<div class="place">{cert.place}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="sec" id="process">
	<div class="wrap">
		<div class="sec-head">
			<h2>From application to certificate</h2>
			<p>Four stages. You'll know where you stand at the end of each one.</p>
		</div>
		<div class="steps">
			{#each steps as step (step.n)}
				<div class="step">
					<div class="n">{step.n}</div>
					<div>
						<h3>{step.title}</h3>
						<p>{step.body}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="sec">
	<div class="wrap">
		<div class="sec-head">
			<h2>What alumni say</h2>
			<p>Replace these with real quotes and consent before publishing.</p>
		</div>
		<div class="voices">
			{#each voices as voice, i (i)}
				<div class="voice">
					<blockquote>{voice.quote}</blockquote>
					<cite>{voice.name}<small>{voice.meta}</small></cite>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="sec apply" id="apply">
	<div class="wrap">
		<div>
			<h2>Applications are open for the next cohorts.</h2>
			<p>
				Tell us your background and what you want next. An advisor will come back to you with the one
				or two tracks that actually fit.
			</p>
		</div>
		<a class="btn" href="#apply">Start an application</a>
	</div>
</section>
