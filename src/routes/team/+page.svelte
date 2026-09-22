<script lang="ts">
	import { team } from '$lib/team';
</script>

<svelte:head>
	<title>Team — ImmersionX</title>
	<meta
		name="description"
		content="The founders and advisor behind ImmersionX: Koteswara Rao, Sravana Sai Kumar, and Winny Patro."
	/>
</svelte:head>

<header class="team-hero" id="main">
	<div class="wrap">
		<p class="team-kicker">The people</p>
		<h1>A small team. Named, reachable, and in the room.</h1>
		<p class="lede">
			ImmersionX is built by two co-founders who have shipped software and companies, with an
			advisor who will tell them when a track does not earn its fee. You should know who that is
			before you apply.
		</p>
	</div>
</header>

<section class="sec team-sec">
	<div class="wrap">
		<div class="sec-head">
			<h2>Co-founders</h2>
			<p>They started ImmersionX. They still write the copy, pick the partners, and take the calls.</p>
		</div>

		<div class="team-grid">
			{#each team.founders as person (person.name)}
				<article class="person">
					<div class="person-top">
						<div class="mono" aria-hidden="true">{person.initials}</div>
						<div>
							<p class="person-role">{person.role}</p>
							<h3>{person.name}</h3>
							{#if person.tag !== person.role}
								<p class="person-tag">{person.tag}</p>
							{/if}
						</div>
					</div>
					<p class="person-bio">{person.bio}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="sec team-advise">
	<div class="wrap">
		<article class="advisor">
			<div class="mono gold" aria-hidden="true">{team.advisor.initials}</div>
			<div>
				<p class="person-role">{team.advisor.role}</p>
				<h3>{team.advisor.name}</h3>
				<p class="person-tag advisor-tag">{team.advisor.tag}</p>
				<p class="person-bio">{team.advisor.bio}</p>
			</div>
		</article>
	</div>
</section>
