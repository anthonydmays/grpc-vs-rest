<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Edit Contact</h1>
<form method="post">
	<input name="uri" type="hidden" bind:value={data.uri} />
	<label for="firstName">First Name</label>
	<input name="firstName" type="text" bind:value={data.firstName} />
	<label for="lastName">Last Name</label>
	<input name="lastName" type="text" bind:value={data.lastName} />
	<label for="email">Email</label>
	<input name="email" type="text" bind:value={data.email} />
	<button type="submit">Save contact</button>
</form>
