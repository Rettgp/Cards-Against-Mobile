<template>
<div class="card">{{ text }}</div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            greeting: "Hello"
        };
    },
    props: {
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        SetGreeting(greeting) {
            this.greeting = greeting;
        }
    }
};
</script>

<style scoped>
div {
    width: 50%;
    padding-bottom: 50%;
    font-size: 1.5em;
    font-weight: bold;
    font-family: "Helvetica Neue", "Helvetica"; 
    color: white;
    background-color: black;
}
</style>
