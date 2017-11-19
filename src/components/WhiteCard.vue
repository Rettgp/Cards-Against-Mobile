<template>
<div class="cah-card"><span v-html="text"></span></div>
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
    },
};

</script>

<style scoped>
.cah-card {
    height: 40%;
    width: 44%;
    color: black;
    background-color: white;
    display: inline-flex;
    overflow-x: hidden;
}

span {
    white-space: pre-wrap;
    font-size: 0.85em;
}

</style>
