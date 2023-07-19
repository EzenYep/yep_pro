<template>
    <div class="comments-section">
        <div v-if="averagestarkit !== '리뷰가 없습니다'">
            <div class="comment">
                <h5>
                    평균 별점:
                    <div class="starkit">
                        <div class="stars-outer">
                            <div class="stars-empty">
                                ★★★★★
                            </div>
                            <div class="stars-fill" :style="{ width: starPercentage(averagestarkit) }">
                                ★★★★★
                            </div>
                        </div>
                        ({{ averagestarkit }})
                    </div>
                </h5>
            </div>
        </div>
        <div v-else>
            리뷰가 없습니다
        </div>

        <div class="comment" v-for="(comment, index) in comments" :key="index">
            <div class="comment-header">
                <h5>
                    {{ comment.member_name }}
                    <span class="starkit">
            <div class="stars-outer">
              <div class="stars-empty">
                ★★★★★
              </div>
              <div class="stars-fill" :style="{ width: starPercentage(comment.starkit) }">
                ★★★★★
              </div>
            </div>
            ({{ comment.starkit }}점)
          </span>
                </h5>
                <button class="report-button" @click="report_comment(comment.review_id)">신고</button>
            </div>
            <p>{{ comment.comment }}</p>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { computed, defineProps, ref, onMounted, watch } from "vue";
import store from "@/store/store";

const props = defineProps(["id"]);
const comments = ref([]);
let report = ref('')
const fetchComments = async () => {
    try {
        const data = {
            id: props.id,
        };
        const res = await axios.post("http://localhost:9212/api/review/commentInfo", data);
        comments.value = res.data;

    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchComments);

const report_comment = async (reviewId) => {
    const data = {
        email: store.state.email,
        review_id: reviewId,
    };

    const res = await axios.post("http://localhost:9212/api/report/report_comment", data);
    const code = res.data.code;

    if (code === 200) {
        alert("신고 접수되었습니다.");
    } else {
        alert("신고가 처리되지 않았습니다.");
    }
}; 
const averagestarkit = computed(() => {
    if (comments.value.length === 0) {
        return "리뷰가 없습니다";
    }
    const totalstarkit = comments.value.reduce((total, comment) => total + comment.starkit, 0);
    return (totalstarkit / comments.value.length).toFixed(1);
});

const starPercentage = (starkit) => {
    const starPercentage = (starkit / 5) * 100;
    return `${starPercentage}%`;
};

watch(() => comments.value, (newComments) => {
    console.log(newComments);
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

.starkit {
    font-size: 1.3rem; /*별의 크기를 조정함*/
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
