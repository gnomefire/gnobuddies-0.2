<script lang="ts">
	// your script goes here
    import {Modal, Button, Checkbox} from 'flowbite-svelte'
    import {menuOpen, showScene, showChat} from '../stores'

    
</script>

<div class="w-screen h-screen bg-[#393939]">
	<form>
    <Button on:click={() => showChat.set(!$showChat)} color="dark" size="sm">{!$showChat ? 'Show Chat' : 'Hide Chat'}</Button>
    <Button on:click={() => showScene.set(!$showScene)} color="dark" size="sm">{!$showScene ? 'Show 3D Scene' : 'Hide 3D Scene'}</Button>
        
	</form>
</div>
