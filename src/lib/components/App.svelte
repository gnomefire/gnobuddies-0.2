<script>

	import Chat from './Chat.svelte';
	import Menu from './Menu.svelte';
	import Scene from './Scene.svelte';
	import { onMount } from 'svelte';
	import { showScene, showChat } from '$lib/stores';
	import { Button, Gallery } from 'flowbite-svelte';
   import {aiImages} from '$lib/stores'
	import LedStrip from './LEDStrip.svelte';
	import { Canvas } from '@threlte/core';
   import { fly, slide } from 'svelte/transition';
	
</script>


<div class="w-full h-full overflow-hidden m-0 p-0" transition:slide={{delay:0, duration:1500}}>
    <Menu />
   <div class="w-fixed w-80 flex-shrink flex-grow-0 px-4 absolute top-20 z-10 overflow-hidden ">
      <div class="  h-full  overflow-hidden">
   {#if $showChat}
      <Chat />
   {/if}
      </div>
   </div>
   
   <div class="w-full h-full pt-1 px-10 absolute top-20   bg-blue-600 overflow-hidden z-0" hidden={!$showScene} >
    <Canvas>
      <Scene />
   </Canvas>
   </div>
   </div>
