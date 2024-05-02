<script>
    import '../app.css'
    export let data
   
</script>
<div id="main" class="w-screen h-screen bg-[#393939]">
    <ul>
    </ul>

    <slot {data}/>

</div>
