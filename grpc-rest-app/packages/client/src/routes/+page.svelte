<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const hasNextPage = data.pageSize * (data.pageNumber + 1) < data.totalCount;
	const lastPage = Math.floor(data.totalCount / (data.pageSize || 25));
</script>

<nav>
	<a href="/">{'<<'}</a> |
	{#if data.pageNumber > 0}
		<a href="?pageNumber={data.pageNumber - 1}">{'<'}</a> |
	{/if}
	{#if hasNextPage}
		<a href="?pageNumber={data.pageNumber + 1}">{'>'}</a> |
	{/if}
	<a href="?pageNumber={lastPage}">{'>>'}</a>
</nav>

<div class="orderby">
	Order by:
	<a href="?orderBy=firstName">First name</a> |
	<a href="?orderBy=lastName">Last name</a> |
	<a href="?orderBy=email">Email</a>
</div>

<table>
	{#each data.contacts as contact}
		<tr>
			<td><a href="contacts?uri={contact.uri}">Edit</a></td>
			<td>{contact.firstName}</td>
			<td>{contact.lastName}</td>
			<td>{contact.email}</td>
		</tr>
	{/each}
</table>

<style>
	nav a {
		padding: 5px;
		text-decoration: none;
		font-weight: bold;
		font-size: 1.2em;
	}

	nav,
	.orderby {
		margin-bottom: 16px;
	}
</style>
