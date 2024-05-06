<script lang="ts">
	import type { User, Message } from '@prisma/client';
	import { SidebarItem } from 'flowbite-svelte';
	import { fade, fly } from 'svelte/transition';
	export let user: User = {
		id: '',
		name: '',
		displayName: '',
		profileImageUrl: '',
		chatColor: '',
		message: '',
		createdAt: new Date()
	};
	export let message: Message = { id: 0, authorId: '', content: '', createdAt: new Date() };
</script>

<div
	style="background-color: {user.chatColor};"
	class="w-auto content-center rounded-lg  p-2  shadow-md items-center"
	transition:fade={{ duration: 1000 }}
    >

	<span class="flex">
		<img src={user.profileImageUrl} alt={user.displayName} class="rounded-full w-5 h-5" />
		<h1>{user.displayName}</h1>
	</span>
	<div
		class="bg-black flex content-center w-full h-full text-white p-3"
		in:fly={{ duration: 1000, x: -200 }}
	>
		{@html message.content}
	</div>
</div>
