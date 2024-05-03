<script lang="ts">
    import { onMount } from 'svelte';
    import { T, useLoader ,useTask, useThrelte} from '@threlte/core';
    import { MeshStandardMaterial, TextureLoader } from 'three';
    import { RigidBody, AutoColliders, Attractor } from '@threlte/rapier';
	import { writable } from 'svelte/store';
    export let src
    export let i
   const material = new MeshStandardMaterial();
   $: if (src) {
    const loader = new TextureLoader();
    const texture = loader.load(src);
    material.map = texture;    
   }
</script>

<RigidBody type='dynamic'>
            
            
    <AutoColliders restitution={1}>
        
    <T.Mesh position={[Math.random() * 5, Math.random() * 10, Math.random() * 5]} scale={3} {material}>
        <T.BoxGeometry args={[2, 2,0.25]} />
        <Attractor strength={-.25} />
       
    </T.Mesh>

</AutoColliders>

</RigidBody>
