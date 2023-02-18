<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Edit Contact</h1>
<nav style="margin-bottom: 16px;">
	<a href="/">{'<'} Back to all contacts</a>
</nav>

<form method="post" action="?/update">
	{#if data.resource._links?.self}
		<input name="url" type="hidden" bind:value={data.resource._links['self'].href} />
		<input name="deleteUrl" type="hidden" bind:value={data.resource._links['delete'].href} />
	{/if}
	{#if data.createUrl}
		<input name="createUrl" type="hidden" bind:value={data.createUrl} />
	{/if}
	<div class="field">
		<label for="firstName">First Name</label>
		<input name="firstName" type="text" bind:value={data.resource.firstName} />
	</div>
	<div class="field">
		<label for="lastName">Last Name</label>
		<input name="lastName" type="text" bind:value={data.resource.lastName} />
	</div>
	<div class="field">
		<label for="email">Email</label>
		<input name="email" type="email" bind:value={data.resource.email} />
	</div>
	<button type="submit">Save contact</button>
	{#if data.resource._links?.self}
		<button type="submit" formaction="?/delete">Delete contact</button>
	{/if}
</form>

<style>
	nav {
		margin-bottom: 16px;
	}

	.field {
		display: grid;
		grid-template-columns: 120px auto;
		grid-column-start: 1;
		grid-column-end: 2;
		margin-bottom: 8px;
		width: 380px;
	}
</style>
