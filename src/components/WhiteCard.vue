<template>
<div class="card"><span v-html="text"></span></div>
</template>


<script>
import draggable from 'vuedraggable'

export default {
    data: function() {
        return {
            text_val: this.text,
        };
    },
    props: {
        text: {
            type: String,
            required: true
        },
    },
    components: {
        draggable
    }
};
</script>:

<style scoped>
div {
    width: 7em;
    /* width: 50%; */
    height: 10em;
    /* padding-bottom: 75%; */
    color: black;
    background-color: white;
    display: inline-block;
    overflow-x: hidden;
}

</style>
