<script>

	import Chat from './Chat.svelte';
	import Menu from './Menu.svelte';
	import Scene from './Scene.svelte';
	import { onMount } from 'svelte';
	import { showScene, showChat } from '$lib/stores';
	import { Button, Gallery } from 'flowbite-svelte';
   import {aiImages} from '$lib/stores'
	
</script>


<div class="w-full flex flex-col flex-wrap overflow-hidden p-0 m-0">
    <Menu />
   <div class="w-fixed w-80 flex-shrink flex-grow-0 px-4 absolute top-20 ">
      <div class=" top-0 p-4 w-full h-full">
   {#if $showChat}
      <Chat />
   {/if}
      </div>
   </div>
   
   <div class="  w-full flex-grow pt-1 px-10 fixed top-20 left-96" hidden={!$showScene}>
      <Scene />
   </div>

</div>
