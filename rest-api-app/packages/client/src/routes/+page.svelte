<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<table>
	{#each data.data.list as contact}
		<tr>
			<td><a href="/contacts/{contact.id}">Edit</a></td>
			<td>{contact.id}</td>
			<td>{contact.firstName}</td>
			<td>{contact.lastName}</td>
			<td>{contact.email}</td>
		</tr>
	{/each}
</table>
