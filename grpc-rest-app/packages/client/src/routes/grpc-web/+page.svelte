<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const hasNextPage = data.pageSize * (data.pageNumber + 1) < data.totalCount;
	const lastPage = Math.floor(data.totalCount / (data.pageSize || 25));
</script>

<style>
	nav a {
		padding: 5px;
		text-decoration: none;
		font-weight: bold;
		font-size: 1.2em;
	}

	nav, .orderby, .create {
		margin-bottom: 16px;
	}
</style>

<nav>
	<a href="/?orderBy={data.orderBy}">{'<<'}</a> |
	{#if data.pageNumber > 0}
		<a href="?orderBy={data.orderBy}&pageNumber={data.pageNumber - 1}">{'<'}</a> |
	{/if}
	{#if hasNextPage}
		<a href="?orderBy={data.orderBy}&pageNumber={data.pageNumber + 1}">{'>'}</a> |
	{/if}
	<a href="?orderBy={data.orderBy}&pageNumber={lastPage}">{'>>'}</a>
</nav>

<div class="orderby">
	Order by:
	<a href="?orderBy=firstName">First name</a> |
	<a href="?orderBy=lastName">Last name</a> |
	<a href="?orderBy=email">Email</a>
</div>

<div class="create">
	<a href="contacts">Create new contact</a>
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
