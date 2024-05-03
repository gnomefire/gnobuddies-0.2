<script lang="ts">
    import { onMount } from 'svelte';
    import { T, useFrame} from '@threlte/core';
    import { MeshStandardMaterial, TextureLoader } from 'three';
    import { RigidBody, AutoColliders, Attractor } from '@threlte/rapier';
	import { writable } from 'svelte/store';
    import {HTML, interactivity} from '@threlte/extras'
    import {Progressbar} from 'flowbite-svelte'
    export let src
    const lifetime = writable(100)
   const material = new MeshStandardMaterial();
   $: if (src) {
    const loader = new TextureLoader();
    const texture = loader.load(src);
    material.map = texture;    
   }
   useFrame(() => {
    console.log($lifetime)
       
   })
   onMount(() => {
   })
</script>
{#if $lifetime  > 0 }
<RigidBody type='dynamic'>
            
            
    <AutoColliders friction={0.5} restitution={0.5} on:contact={() => lifetime.set($lifetime - 1  )}>
        
    <T.Mesh position={[Math.random() * 5, Math.random() * 10, Math.random() * 5]} scale={3} {material}>
        <T.BoxGeometry args={[1,1,1]} />
        
       
    </T.Mesh>
    <HTML transform >
        <div class="w-100" scale={2}>
        <Progressbar bind:progress={$lifetime} labelInside size="h-2.5"/>
        </div>
    </HTML>
</AutoColliders>

</RigidBody>

{/if}
