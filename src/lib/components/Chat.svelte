<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';
	import { io } from 'socket.io-client';
	import {Sidebar, SidebarGroup, SidebarItem} from 'flowbite-svelte'
	import {messages, users, aiImages} from '../stores'
	import Message from './Message.svelte';
	const socket = io('http://localhost:3000', {transports: ['websocket']});

	let div: HTMLDivElement;
	let index = 0
	
	


	
	$: socket.on('eventFromServer', (data) => {
		console.log(data)	
	})
	$: socket.on('user created', (data) => {
		users.update(($users) => [data, ...$users]);	
	})
	

	

	
	
	
	// ...

	
</script>

<Sidebar class="flex justify-between bg-purple-700 w-96 h-[75vh] text-wrap overflow-visible">
<ul class="font-mono flex-col">
	{#if $messages}
{#each $messages as message, i   (message)  }
<li >
	<SidebarGroup active={i === index} class="text-white text-wrap">
<Message {message} user={$users.find((user) => user.id === message.authorId)}/>
	</SidebarGroup>
</li>
{/each}
{/if}
</ul>


</Sidebar>

<style>
	
</style>