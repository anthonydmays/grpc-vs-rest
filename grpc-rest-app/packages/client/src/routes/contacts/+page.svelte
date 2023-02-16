<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

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

<h1>Edit Contact</h1>
<nav style="margin-bottom: 16px;">
	<a href="/">{'<'} Back to all contacts</a>
</nav>
<form method="post" action="?/update">
	{#if data.uri}
		<input name="uri" type="hidden" bind:value={data.uri} />
	{/if}
	<div class="field">
		<label for="firstName">First Name</label>
		<input name="firstName" type="text" bind:value={data.firstName} />
	</div>
	<div class="field">
		<label for="lastName">Last Name</label>
		<input name="lastName" type="text" bind:value={data.lastName} />
	</div>
	<div class="field">
		<label for="email">Email</label>
		<input name="email" type="text" bind:value={data.email} />
	</div>
	<button type="submit">Save contact</button>
	{#if data.uri}
		<button type="submit" formaction="?/delete">Delete contact</button>
	{/if}
</form>