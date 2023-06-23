<template>
    <div class="text-bg-secondary p-1">
        <div class="comment-input">
            <div class="input-row">
                <div class="author-rating">
                    <label class="author">작성자: ss</label>
                    <div class="star-rating">
                        <span class="star" v-for="n in 5" :key="n" @click="setRating(n)" :class="{ filled: n <= rating }">★</span>
                    </div>
                </div>
            </div>
            <div class="text-area">
                <textarea v-model="text" placeholder="댓글"></textarea>
                <button @click="addComment">댓글 추가</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            author: 'User',
            text: '',
            rating: 0,
        };
    },
    methods: {
        setRating(rating) {
            this.rating = rating;
        },
        addComment() {
            if (!this.text || !this.rating) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            this.$emit('comment-added', { author: this.author, text: this.text, rating: this.rating });
            this.text = '';
            this.rating = 0;
        },
    },
};
</script>

<style scoped>
.comment-input {
    margin-top: 1%;
    margin-bottom: 1%;
}
.input-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.author-rating {
    display: flex;
    align-items: center;
}
.author {
    margin-right: 10px;
}
.star-rating {
    cursor: pointer;
}
.star {
    color: #ccc;
    font-size: 20px;
}
.filled {
    color: gold;
}
.text-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.comment-input textarea {
    flex-grow: 1;
    margin-right: 10px;
}
.comment-input button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
