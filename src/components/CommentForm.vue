<template>
    <div style="background-color:#FAF0E4;">
        <div class="comment-input">
            <div class="input-row">
                <div class="author-rating">
                    <label className="author" v-if="isUserLoggedIn">{{user}}</label>
                    <label className="author" v-else>로그인 해주십시오.</label>
                    <div class="star-rating">
            <span
                class="star"
                v-for="n in 5"
                :key="n"
                @click="setRating(n)"
                :class="{ filled: n <= rating }"
            >★</span
            >
                    </div>
                </div>
            </div>
            <div class="text-area">
                <textarea v-model="text" placeholder="댓글"></textarea>
                <button @click="addComment"  v-if="isUserLoggedIn" >댓글 추가</button>
                <button @click="goLogin"  v-else >로그인 해주십시오</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,defineProps } from 'vue';
import store from "@/store/store";
import { computed } from 'vue';
import router from "@/router";
import axios from "axios";
const user = store.state.email
// computed property를 정의합니다.
const isUserLoggedIn = computed(() => store.state.token !== '');
const text = ref('');
const rating = ref(0);
const props = defineProps(['id']);
const setRating = (selectedRating) => {
    rating.value = selectedRating;
};

const addComment = async () => {
    if (!text.value || !rating.value) {
        alert('모든 필드를 입력해주세요.');
        return;
    }else {
        console.log(user)
        console.log(rating.value)
        const data = {
            user: user,
            id: props.id,
            comment:text.value,
            starkit:rating.value
        };
        axios.post("http://localhost:9212/api/review/commentCreate",data)
            .then(res => {
                console.log(res.data)
                if(res.data.code ===200){
                    router.push({name: "home"})
                }
            })
            .catch(err => {
                if(err.response && err.response.data) {
                    const errorCode = err.response.data.code;
                    if(errorCode === 404) {
                        alert('결제 정보를 찾을 수 없습니다.');
                    } else {
                        alert('결제 정보를 찾을 수 없습니다.');
                    }
                } else {
                    console.error(err);
                }
            });
    }
};

const goLogin = ()=>{
    router.push({
        name:'login'
    })
}
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
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
