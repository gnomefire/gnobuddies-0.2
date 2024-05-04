<script lang="ts">
    import { onMount } from 'svelte';
    import { T, useFrame} from '@threlte/core';
    import { MeshStandardMaterial, TextureLoader } from 'three';
    import { RigidBody, AutoColliders, Attractor, useRapier, useRigidBody } from '@threlte/rapier';
	import { writable } from 'svelte/store';
    import {HTML, interactivity} from '@threlte/extras'
    import {Progressbar} from 'flowbite-svelte'
    import {battling} from '../stores'
    export let src
    const lifetime = writable(100)
   const material = new MeshStandardMaterial();

   const {world}= useRapier()
   $: if (src) {
    const loader = new TextureLoader();
    const texture = loader.load(src);
    material.map = texture;    
   }
   useFrame(() => {
    if(!$battling) lifetime.set(100)
    console.log($lifetime)
       
   })

   onMount(() => {
    battling.set(false)
   })
</script>
{#if $lifetime  > 0 }
<RigidBody type='dynamic' linearVelocity={[0,2, 0]} angularVelocity={[1, 1, 0]} >
            
            
    <AutoColliders friction={1} restitution={0.25} on:contact={() => lifetime.set($lifetime - 1  )}>
        
    <T.Mesh position={[Math.random() * 10 -5, Math.random() * 10, Math.random() * 5]} scale={3} {material}>
        <T.BoxGeometry args={[1,1,1]} />
        
       
    </T.Mesh>
    {#if $lifetime <99 && $battling}    
    <HTML position={[0, 1, 0]} transform>
        <div class="w-100 h-100">
        <Progressbar bind:progress={$lifetime} labelInside size="h-5s"/>
        </div>
    </HTML>
    {/if}
</AutoColliders>

</RigidBody>

{/if}
