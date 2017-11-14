<template>
<div class="cah-card"><span v-html="text"></span></div>
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

</script>

<style scoped>
.cah-card {
    width: 7em;
    height: 11em;
    color: black;
    background-color: white;
    display: inline-flex;
    overflow-x: hidden;
}

span {
    white-space: pre-wrap;
    font-size: 0.95em;
}

</style>
