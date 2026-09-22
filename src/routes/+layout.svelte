<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<meta
		name="description"
		content="Five immersion tracks, taught on campus with partner institutions and working practitioners."
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<nav class="nav">
	<div class="wrap">
		<a class="mark" href="/">Immersion<span>X</span></a>
		<a class="lnk" href="/#programs">Programs</a>
		<a class="lnk" href="/#roi">Return on fees</a>
		<a class="lnk" href="/#certificates">Certification</a>
		<a class="lnk" href="/#process">How it works</a>
		<a class="lnk" href="/team">Team</a>
		<a class="lnk" href="/contact">Contact us</a>
		<a class="btn" href="/apply">Express Interest</a>
	</div>
</nav>

{@render children()}

<footer class="foot">
	<div class="wrap">
		<div>ImmersionX — global experiential learning</div>
		<div>
			<a href="/#programs">Programs</a> &nbsp;·&nbsp;
			<a href="/#roi">Return on fees</a> &nbsp;·&nbsp;
			<a href="/team">Team</a> &nbsp;·&nbsp;
			<a href="/apply">Express Interest</a> &nbsp;·&nbsp;
			<a href="/contact">Contact us</a>
		</div>
	</div>
</footer>
