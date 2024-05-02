<script lang="ts">
    import { onMount } from 'svelte';
    import { T, useLoader ,useTask, useThrelte} from '@threlte/core';
    import { MeshStandardMaterial, TextureLoader } from 'three';
    import { RigidBody, AutoColliders, Attractor } from '@threlte/rapier';
	import { writable } from 'svelte/store';
    export let src
   const material = new MeshStandardMaterial();
   $: if (src) {
    const loader = new TextureLoader();
    const texture = loader.load(src);
    material.map = texture;    
   }
</script>

<RigidBody type='dynamic'>
            
            
    <AutoColliders restitution={1}>
        <Attractor position={[0, 0, 0]} strength={Math.random()} />
        
    <T.Mesh position={[0, 2, 0]} scale={1} {material}>
        <T.SphereGeometry args={[Math.random()*1.5, 10,10]} />
       
    </T.Mesh>

</AutoColliders>

</RigidBody>
