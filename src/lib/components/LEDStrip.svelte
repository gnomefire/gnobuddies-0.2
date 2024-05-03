<script lang="ts">
import { Canvas, T } from '@threlte/core'
	import { writable } from 'svelte/store';
    import Led from './LED.svelte';
	
export let numLeds = 50;

</script>

<Canvas>
 <T.Group>
    {#each [...Array(numLeds).keys()] as i}
      <Led position={[i *2 - numLeds, 0, 0]} />
    {/each}
  </T.Group>
</Canvas>