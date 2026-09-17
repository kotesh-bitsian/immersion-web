<script lang="ts">
	import { indianCities, isIndianCity } from '$lib/cities';

	let { name = 'city', value = $bindable(''), error = '' } = $props();

	let query = $state(value);
	let open = $state(false);

	const filtered = $derived(
		indianCities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase()))
	);

	function select(city: string) {
		value = city;
		query = city;
		open = false;
	}

	function onFocus() {
		open = true;
		if (value) query = value;
	}

	function onBlur() {
		setTimeout(() => {
			open = false;
			if (!isIndianCity(query)) {
				if (value) query = value;
				else query = '';
			}
		}, 120);
	}
</script>

<div class="combo">
	<input type="hidden" {name} {value} required />
	<input
		id="city"
		class="input"
		type="text"
		autocomplete="address-level2"
		placeholder="Search a city"
		bind:value={query}
		aria-invalid={error ? 'true' : undefined}
		role="combobox"
		aria-controls="city-options"
		aria-autocomplete="list"
		aria-expanded={open}
		onfocus={onFocus}
		onblur={onBlur}
		oninput={() => {
			open = true;
			value = '';
		}}
	/>
	<ul id="city-options" class="combo-list" class:is-open={open && filtered.length} role="listbox">
		{#each filtered as city (city)}
			<li>
				<button type="button" class="combo-opt" onclick={() => select(city)}>{city}</button>
			</li>
		{/each}
	</ul>
	{#if open && query.trim() && !filtered.length}
		<p class="combo-empty">No matching city. Pick from the list of 50.</p>
	{/if}
</div>
