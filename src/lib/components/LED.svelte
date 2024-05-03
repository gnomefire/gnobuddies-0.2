<script lang="ts">

	import { T } from "@threlte/core";
	import { writable } from "svelte/store";
	import { Color } from "three";
    export let position : [number, number, number] = [0,0,0]    
    export let color = writable(new Color (0, 0, 0))

</script>
<T.Mesh {position}>
    <T.CapsuleGeometry  args={[0.5, 2,10, 10]} />

    <T.MeshStandardMaterial color={"white"} transparent opacity={0.5} />
    <T.PointLight position={[0, 0, 1]} intensity={2} {$color} />
</T.Mesh>