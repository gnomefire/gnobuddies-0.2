<script lang="ts">
    import type {User, Message} from '@prisma/client'
	import { fly } from 'svelte/transition';
    export let user : User = { id: '', name: '', displayName: '', profileImageUrl: '', chatColor: '', message: '', createdAt: new Date() }
    export let message : Message = { id: 0, authorId: '', content: '', createdAt: new Date() }

</script>

<div class="flex h-10 w-auto  space-y-1 mb-6 p-2 text-white align-middle  text-xl"  transition:fly={{delay:0, duration:600, x: -200}} >
    <span><img src={user.profileImageUrl} class="w-8 h-8 rounded-full m-4" alt="Profile" /></span>
    <span class='p-3 ' style="color:{user.chatColor}">{user.displayName}</span>
    <span class="flex h-20 m-3 pt-3 text-md">{@html message.content}</span>
</div>