<script>

	import Chat from './Chat.svelte';
	import Menu from './Menu.svelte';
	import Scene from './Scene.svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { showScene, showChat } from '$lib/stores';
	import { Button, Gallery } from 'flowbite-svelte';
   import {aiImages} from '$lib/stores'
	import LedStrip from './LEDStrip.svelte';
	import { Canvas } from '@threlte/core';
   import { fly, slide } from 'svelte/transition';
   import  {WebMidi} from 'webmidi';

   const onEnabled=  () => {
      WebMidi.inputs.forEach(input => {
         console.log(input.manufacturer, input.name);
      })
   }
   onMount(() => {
      
      WebMidi.enable().then(() => {
         
         console.log('WebMidi enabled');
      }).catch(err => {
         console.log(err);
      });
   })
   afterUpdate(() => {
      onEnabled()
   })
	
</script>


<div class="w-full h-full overflow-hidden m-0 p-0" transition:slide={{delay:0, duration:1500}}>
    <Menu />
   <div class=" flex-shrink flex-grow-0 px-4 absolute top-20 z-10 overflow-hidden ">
      
   {#if $showChat}
      <Chat />
   {/if}
      
   </div>
   
   <div class="w-full h-full pt-1 px-10 absolute top-20   bg-blue-600 overflow-hidden z-0" hidden={!$showScene} >
    <Canvas>
      <Scene />
   </Canvas>
   </div>
   </div>
