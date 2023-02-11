<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Edit Contact</h1>
<form method="post">
	<input name="url" type="hidden" bind:value={data.data._links['self'].href} />
	<label for="firstName">First Name</label>
	<input name="firstName" type="text" bind:value={data.data.firstName} />
	<label for="lastName">Last Name</label>
	<input name="lastName" type="text" bind:value={data.data.lastName} />
	<label for="email">Email</label>
	<input name="email" type="text" bind:value={data.data.email} />
	<button type="submit">Save contact</button>
</form>
