<template>
    <div class="comments-section">
        <CommentForm></CommentForm>
        <div class="comment">
            <h5>평균 별점:
                <div class="rating">
                    <div class="stars-outer">
                        <div class="stars-empty">
                            ★★★★★
                        </div>
                        <div class="stars-fill" :style="{width: starPercentage(averageRating)}">
                            ★★★★★
                        </div>
                    </div>
                    ({{ averageRating }}점)
                </div>
            </h5>
        </div>

        <div class="comment" v-for="(comment, index) in comments" :key="index">
            <div class="comment-header">
                <h5>{{ comment.author }}
                    <span class="rating">
                        <div class="stars-outer">
                            <div class="stars-empty">
                                ★★★★★
                            </div>
                            <div class="stars-fill" :style="{width: starPercentage(comment.rating)}"><!--여기가 지정된 점수에따라 별에 색이 채워진다.-->
                                ★★★★★
                            </div>
                        </div>
                        ({{ comment.rating }}점)
                    </span>
                </h5>
                <button class="report-button">신고</button>
            </div>
            <p>{{ comment.text }}</p>
        </div>
    </div>
</template>

<script>
import CommentForm from "@/components/CommentForm.vue";
export default {

    data() {
        return {
            comments: [//더미데이터들 db 연결이 되면 이 부분을 끌어오는 데이터로 수정할거임
                { author: 'User1', text: 'This is a test comment', rating: 5 },
                { author: 'User2', text: 'This is another test comment', rating: 3 },
                { author: 'User3', text: 'This is yet another test comment', rating: 4 },
                { author: 'User4', text: 'This is still another test comment', rating: 2 },
                { author: 'User5', text: 'This is definitely another test comment', rating: 1 },
                { author: 'User6', text: 'This is another test comment', rating: 5 },
                { author: 'User7', text: 'This is another test comment', rating: 4 },
                { author: 'User8', text: 'This is another test comment', rating: 5 },
            ],
        };
    },
    computed: {
        averageRating() {
            const totalRating = this.comments.reduce((total, comment) => total + comment.rating, 0);
            return (totalRating / this.comments.length).toFixed(1);
        },
    },
    methods: {
        starPercentage(rating) {
            const starPercentage = (rating / 5) * 100;
            return `${starPercentage}%`;
        },
    },
    components:{
        CommentForm,
    }
};
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
    font-size: 1.3rem;/*별의 크기를 조정함*/
    color: #777;
}
.stars-outer {
    position: relative;
    display: inline-block;
    overflow: hidden;
}
.stars-empty {
    color: #ccc;
}
.stars-fill {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    color: gold;
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
