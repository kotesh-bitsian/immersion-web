<script lang="ts">
	import { enhance } from '$app/forms';
	import CitySelect from '$lib/components/CitySelect.svelte';
	import { programs } from '$lib/content';
	import type { ApplyErrors, ApplyValues } from '$lib/form-types';
	import { isValidIndianMobile, normalizeIndianMobile } from '$lib/validation';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let city = $state('');
	let phone = $state('');
	let submitting = $state(false);

	const errors = $derived(((form && 'errors' in form ? form.errors : {}) ?? {}) as ApplyErrors);
	const values = $derived(((form && 'values' in form ? form.values : {}) ?? {}) as Partial<ApplyValues>);

	$effect(() => {
		city = values.city ?? city;
		phone = values.phone ?? phone;
	});

	const lockedProgram = $derived(data.lockedProgram);
</script>

<svelte:head>
	<title>Start an application — ImmersionX</title>
</svelte:head>

<section class="page" id="main">
	<div class="wrap form-wrap">
		<div class="sec-head">
			<h1>Start an application</h1>
			<p>
				{#if lockedProgram}
					You're applying for <strong>{lockedProgram}</strong>. All fields are required — an advisor
					will follow up after you submit.
				{:else}
					All fields are required. Pick the track that matches the work you want to be doing in two
					years.
				{/if}
			</p>
		</div>

		{#if form?.success}
			<div class="banner ok" role="status">
				<strong>Application sent.</strong> We'll come back to you with next steps.
			</div>
		{:else}
			<form
				method="POST"
				class="form-card"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
			>
				<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" />

				{#if errors.form}
					<div class="banner err" role="alert">{errors.form}</div>
				{/if}

				<div class="f">
					<label for="name">Name</label>
					<input
						id="name"
						class="input"
						name="name"
						type="text"
						autocomplete="name"
						required
						minlength="2"
						value={values.name ?? ''}
						aria-invalid={errors.name ? 'true' : undefined}
					/>
					{#if errors.name}<p class="hint-err">{errors.name}</p>{/if}
				</div>

				<div class="f">
					<label for="email">Email</label>
					<input
						id="email"
						class="input"
						name="email"
						type="email"
						autocomplete="email"
						required
						value={values.email ?? ''}
						aria-invalid={errors.email ? 'true' : undefined}
					/>
					{#if errors.email}<p class="hint-err">{errors.email}</p>{/if}
				</div>

				<div class="f">
					<label for="phone">Contact number</label>
					<div class="phone">
						<span class="cc" title="India country code">+91</span>
						<input
							id="phone"
							class="input"
							name="phone"
							type="text"
							inputmode="numeric"
							autocomplete="tel-national"
							required
							maxlength="10"
							placeholder="10-digit mobile"
							bind:value={phone}
							aria-invalid={errors.phone ? 'true' : undefined}
							oninput={(event) => {
								const field = event.currentTarget;
								phone = normalizeIndianMobile(field.value);
								field.value = phone;
								if (phone.length === 10 && isValidIndianMobile(phone)) {
									field.setCustomValidity('');
								} else if (phone.length > 0) {
									field.setCustomValidity(
										'Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.'
									);
								} else {
									field.setCustomValidity('');
								}
							}}
						/>
					</div>
					<p class="hint">Indian mobile only. Don't include 0 or +91.</p>
					{#if errors.phone}<p class="hint-err">{errors.phone}</p>{/if}
				</div>

				<div class="f">
					<label for="university">University / College</label>
					<input
						id="university"
						class="input"
						name="university"
						type="text"
						autocomplete="organization"
						required
						value={values.university ?? ''}
						aria-invalid={errors.university ? 'true' : undefined}
					/>
					{#if errors.university}<p class="hint-err">{errors.university}</p>{/if}
				</div>

				<div class="f">
					<label for="city">City</label>
					<CitySelect bind:value={city} error={errors.city ?? ''} />
					{#if errors.city}<p class="hint-err">{errors.city}</p>{/if}
				</div>

				<div class="f">
					<label for="program">Programme</label>
					{#if lockedProgram}
						<input type="hidden" name="program" value={lockedProgram} />
						<input
							id="program"
							class="input"
							type="text"
							value={lockedProgram}
							readonly
							disabled
						/>
					{:else}
						<select
							id="program"
							class="input"
							name="program"
							required
							aria-invalid={errors.program ? 'true' : undefined}
						>
							<option value="" disabled selected={!values.program}>Select a programme</option>
							{#each programs as program (program.name)}
								<option
									value={program.name}
									selected={values.program === program.name}>{program.name}</option
								>
							{/each}
						</select>
					{/if}
					{#if errors.program}<p class="hint-err">{errors.program}</p>{/if}
				</div>

				<div class="f">
					<label for="expectation">Expectation from the programme</label>
					<textarea
						id="expectation"
						class="input area"
						name="expectation"
						required
						minlength="12"
						rows="5"
						aria-invalid={errors.expectation ? 'true' : undefined}>{values.expectation ?? ''}</textarea
					>
					{#if errors.expectation}<p class="hint-err">{errors.expectation}</p>{/if}
				</div>

				<button class="btn" type="submit" disabled={submitting}>
					{submitting ? 'Sending…' : 'Submit application'}
				</button>
			</form>
		{/if}
	</div>
</section>
