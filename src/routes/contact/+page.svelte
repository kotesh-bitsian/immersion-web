<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ContactErrors, ContactValues } from '$lib/form-types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
	const errors = $derived(((form && 'errors' in form ? form.errors : {}) ?? {}) as ContactErrors);
	const values = $derived(
		((form && 'values' in form ? form.values : {}) ?? {}) as Partial<ContactValues>
	);
</script>

<svelte:head>
	<title>Contact us — ImmersionX</title>
</svelte:head>

<section class="page" id="main">
	<div class="wrap form-wrap">
		<div class="sec-head">
			<h1>Contact us</h1>
			<p>
				Tell us who you are and what you want to share. We'll reply by email — an admissions advisor
				can help you pick a track before you apply.
			</p>
		</div>

		{#if form?.success}
			<div class="banner ok" role="status">
				<strong>Message sent.</strong> We'll get back to you shortly.
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
					<label for="message">What do you want to share?</label>
					<textarea
						id="message"
						class="input area"
						name="message"
						required
						minlength="12"
						rows="7"
						placeholder="Your question, background, or what you'd like us to look at."
						aria-invalid={errors.message ? 'true' : undefined}>{values.message ?? ''}</textarea
					>
					{#if errors.message}<p class="hint-err">{errors.message}</p>{/if}
				</div>

				<button class="btn" type="submit" disabled={submitting}>
					{submitting ? 'Sending…' : 'Send message'}
				</button>
			</form>
		{/if}
	</div>
</section>
