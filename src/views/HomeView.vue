<template>
    <div>
        <div>
            <button @click="showText">Click me</button>
            <p v-if="textVisible">{{ text }}</p>

            <br>
            <button @click="showText2">Click me</button>
            <p v-if="textVisible2">{{ text2 }}</p>
            <p>dddddddd</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('이 편지는 영국에서부터 시작되어');
const text2 = ref('dddsdsdsdsdsdws');
const textVisible = ref(false);
const textVisible2 = ref(false);
const showText = () => {
    textVisible.value = !textVisible.value;
}

const showText2 = () => {
    textVisible2.value = !textVisible2.value;
}
</script>