<template>
<div draggable="true" class="card"><span v-html="text"></span></div>
</template>


<script>
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
    }
};
</script>:

<style scoped>
div {
    height: 2em;
    width: 50%;
    padding-bottom: 75%;
    color: black;
    background-color: white;
    display: inline-block;
    overflow-x: hidden;
}

</style>
