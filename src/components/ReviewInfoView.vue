<template>
    <div class="comments-section">
        <div class="comment">
            <h5>평균 별점: {{ averageRating }}</h5>
        </div>
        <div class="comment" v-for="(comment, index) in comments" :key="index">
            <div class="comment-header">
                <h5>{{ comment.author }}
                    <span class="rating">
                        ({{ comment.rating }}점)
                        <span v-for="n in 5" :key="n" class="star">
                            {{ n <= comment.rating ? '★' : '☆' }}
                        </span>
                    </span>
                </h5>
                <button class="report-button">신고</button>
            </div>
            <p>{{ comment.text }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const comments = ref([
    { author: 'User1', text: 'This is a test comment', rating: 5 },
    { author: 'User2', text: 'This is another test comment', rating: 3 },
    { author: 'User3', text: 'This is yet another test comment', rating: 4 },
    { author: 'User4', text: 'This is still another test comment', rating: 2 },
    { author: 'User5', text: 'This is definitely another test comment', rating: 1 },
]);

const averageRating = computed(() => {
    const totalRating = comments.value.reduce((total, comment) => total + comment.rating, 0);
    return (totalRating / comments.value.length).toFixed(1);
});

</script>

<style scoped>
.comments-section {
    width: 100%;
    margin-top: 5%;
}
.comment {
    background-color: #f8f9fa;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
}
.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rating {
    font-size: 0.8em;
    color: #777;
}
.star {
    margin-left: 2px;
}
.report-button {
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: #f44336;
    color: white;
    cursor: pointer;
}
</style>
