<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { fade, fly, slide } from 'svelte/transition';
	import { io } from 'socket.io-client';
	import {Carousel, Gallery} from 'flowbite-svelte'
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
<aside class="flex justify-between bg-purple-700 h-screen w-96">
<ul class="font-mono flex-col">
	{#if $messages}
{#each $messages as message, i   (message)  }
<li in:fly={{x: 200, duration: 2000}} >
<Message {message} user={$users.find((user) => user.id === message.authorId)}/>
</li>
{/each}
{/if}
</ul>


</aside>

<style>
	
</style>