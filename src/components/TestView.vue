<template>
    <div class="hello">
        <div>
            <button @click="showText">Click me</button>
            <p v-if="textVisible">{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            text: '이 편지는 영국에서부터 시작되어',
            textVisible: false
        };
    },
    methods: {
        showText() {
            this.textVisible = !this.textVisible;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
