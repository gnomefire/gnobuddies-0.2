<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, get, writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';
	import { io } from 'socket.io-client';
	import { Sidebar, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import { messages, users, aiImages } from '../stores';
	import Message from './Message.svelte';
	const socket = io('http://localhost:3000', { transports: ['websocket'] });

	let div: HTMLDivElement;
	let index = 0;

	$: socket.on('eventFromServer', (data) => {
		console.log(data);
	});
	$: socket.on('user created', (data) => {
		users.update(($users) => [data, ...$users]);
	});

	// ...
</script>

<Sidebar class="flex justify-between bg-transparent w-full h-[75vh] text-wrap mt-10">
	<ul class="font-mono flex-col text-md text-wrap">
		{#if $messages}
			{#each $messages as message, i (message)}
			{#if new Date().getSeconds() - new Date(message.createdAt).getSeconds() < 20 }
				<li>
					<SidebarGroup active={i === index} class="text-white text-wrap mr-20 w-96">
						<Message {message} user={$users.find((user) => user.id === message.authorId)} />
					</SidebarGroup>
				</li>
				{/if}
				{/each}
		{/if}
	</ul>
</Sidebar>

<style>
</style>
