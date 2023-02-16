<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<style>
	nav a {
		padding: 5px;
		text-decoration: none;
		font-weight: bold;
		font-size: 1.2em;
	}

	nav, .orderby {
		margin-bottom: 16px;
	}
</style>

<nav>
	{#if data._links?.firstPage}
		<a href="?url={encodeURIComponent(data._links.firstPage.href)}">{'<<'}</a> |
	{/if}
	{#if data._links?.previousPage}
		<a href="?url={encodeURIComponent(data._links.previousPage.href)}">{'<'}</a>  |
	{/if}
	{#if data._links?.nextPage}
		<a href="?url={encodeURIComponent(data._links.nextPage.href)}">{'>'}</a>  |
	{/if}
	{#if data._links?.lastPage}
		<a href="?url={encodeURIComponent(data._links.lastPage.href)}">{'>>'}</a>
	{/if}
</nav>

<div class="orderby">
	Order by:
	{#if data._links?.orderByFirstName}
		<a href="?url={encodeURIComponent(data._links.orderByFirstName.href)}">First name</a>  |
	{/if}
	{#if data._links?.orderByLastName}
		<a href="?url={encodeURIComponent(data._links.orderByLastName.href)}">Last name</a>  |
	{/if}
	{#if data._links?.orderByEmail}
		<a href="?url={encodeURIComponent(data._links.orderByEmail.href)}">Email</a>
	{/if}
</div>

<table>
	{#each data.resource.list as contact}
		<tr>
			<td><a href="contacts?url={encodeURIComponent(contact._links.self.href)}">Edit</a></td>
			<td>{contact.firstName}</td>
			<td>{contact.lastName}</td>
			<td>{contact.email}</td>
		</tr>
	{/each}
</table>
