<template>
<div class="cah-card"><span v-html="text"></span></div>
</template>


<script>
export default {
    data: function() {
        return {
            text_val: this.text,
            pick_val: this.pick,
        };
    },
    props: {
        text: {
            type: String,
            required: true
        },
        pick: {
            required: true
        }
    }
};
</script>:

<style scoped>
div {
    height: 50%;
    width: 9em;
    color: white;
    background-color: black;
    display: inline-block;
    vertical-align: top;
}
</style>
