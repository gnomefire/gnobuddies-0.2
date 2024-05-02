<script lang="ts">
	import { T, Canvas, useLoader, watch, useThrelteUserContext, useTask } from '@threlte/core';
	import {
		
	Texture,
		TextureLoader
	} from 'three';
	import { HTML, OrbitControls,Suspense,interactivity } from '@threlte/extras';
	import { World, RigidBody, AutoColliders, Attractor } from '@threlte/rapier';
	import { messages, users, aiImages} from '../stores';
	import { fade, fly } from 'svelte/transition';
	import { io } from 'socket.io-client';
	import { linear } from 'svelte/easing';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
    import {SoundCloud} from 'sveltekit-embed'
	import { Carousel } from 'flowbite-svelte';
	import Particle  from './Particle.svelte';
	import { derived } from 'svelte/store';
    

	
	
	

	
	
  
	

    beforeUpdate(() => {
		if(window){
			
			const clientWidth = window.innerWidth;
			const clientHeight = window.innerHeight;
			
		}
		if($aiImages){	
		
		watch(aiImages, (value) => {
			console.log(value)
		})
	   
		watch(messages, (value) => {
			console.log(value)
		})
	  }
	  });
  
	
      

     
	
</script>

<Canvas size={{ width: 960, height: 720 }}  >
	
	<T.PerspectiveCamera position={[0, 2, 15]} makeDefault>
	
	</T.PerspectiveCamera>

	<T.DirectionalLight position={[0, 2, 10]} />
	<T.AmbientLight intensity={0.5} />
	<World>
		<RigidBody type="fixed" lockRotations lockTranslations>
			<T.Mesh>
			<T.PlaneGeometry args={[100, 100]} />
			<T.MeshStandardMaterial color="lime" transparent opacity={0} />
			</T.Mesh>
		</RigidBody>
		{#each $users as user , i}
			<RigidBody>
				<T.Group position={[i, i, 0]}>
					<AutoColliders restitution={1}>
                        <Attractor strength={0.125} />
						<T.Mesh
                            
                        >
                        <T.SphereGeometry args={[1, 3, 3]} />
                            <T.MeshStandardMaterial transparent opacity={0}></T.MeshStandardMaterial>
							
							<HTML transform position.y={0.5} scale = {0.5}>
                            <div
                            style="font-size: 1em; background-color: {user.chatColor};"
                            class="w-auto content-center rounded-lg min-w-40 max-w-96 p-2 m-2 overflow-hidden shadow-md h-40"
                            transition:fade={{ duration: 1000, easing: linear }}
                            >
                            <span class="flex">
                            <img src={user.profileImageUrl} alt={user.displayName} class="rounded-full w-5 h-5" />
									<h1>{user.displayName}</h1>
                                </span>
									<div
										class="bg-black flex  content-center w-full h-full text-white p-3 text-5xl"
										in:fly={{ duration: 1000, easing: linear, x: -200 }}
									>
										{@html user.message}
									</div>
								</div></HTML>							
						</T.Mesh>
					</AutoColliders>
				</T.Group>
			</RigidBody>
		{/each}

		<RigidBody type="fixed" lockRotations lockTranslations>
			<AutoColliders shape="cuboid" restitution={0.5}>
				<Attractor position={[0, 0, 0]} strength={0.1} />
				<Attractor position={[0, 0, 2]} strength={0.1} />
				<Attractor position={[0, 0, -2]} strength={0.1} />
				<T.Mesh>
                    
					<T.BoxGeometry args={[100, 1, 100]} position={[0, -5, 0]} />
					<T.MeshStandardMaterial color="gray" />
				</T.Mesh>
			</AutoColliders>
		</RigidBody>
	 {#if $aiImages.length > 0}
        {#each $aiImages as {src, alt} , i}
		
		<Particle  {src}/>
		
        
{/each}
{/if}

</World>
</Canvas>
