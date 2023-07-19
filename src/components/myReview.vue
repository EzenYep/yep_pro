<template>
    <div class="row" style="background-color: #FFFAF8; height: 250px;">
        <div class="row6" align="center" >
            <br>


            <div class="text1">
                <h4 class="review-title">나의 리뷰 내역</h4>
                <div class="button-container">
                    <button class="btn btn-danger" style="font-weight: normal;" @click="toggleEditSelectedReviews">
                        {{ editingSelectedReviews ? '저장' : '수정' }}
                    </button>
                    <button class="btn btn-danger" style="background-color: #FF9D9D; font-weight: normal;" @click="deleteSelectedReviews">삭제</button>

                </div>
            </div>


            <div class="con7" style="width: 85%; height: 90%; border: 1px; float: center; line-height: 250%; background-color: rgba(0, 0, 0, 0);">
                <div class="user-list">
                    <table>
                        <thead>
                        <tr>
                            <th class="column column-small">구분</th>
                            <th class="column column-small">영화 이름</th>
                            <th class="column column-small">별점</th>
                            <th class="column column-large">리뷰내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="review in currentPageReviews" :key="review.review_id">
                            <td class="column column-small">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="review.review_id"
                                    v-model="selectedItems"
                                />
                            </td>
                            <td class="column column-small">{{ review.movie_title }}</td>
                            <td :style="{ color: 'black' }">
                                <template v-if="review.isEditing">
                                    <input type="text" v-model="review.starkit" />
                                </template>
                                <template v-else>
                                    <span>{{ review.starkit }}</span>
                                </template>
                            </td>
                            <td :style="{ color: 'black' }">
                                <template v-if="review.isEditing">
                                    <input type="text" v-model="review.comment" />
                                </template>
                                <template v-else>
                                    <span>{{ review.comment }}</span>
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="v-line2" align="right">
            </div>
        </div>
    </div>
    <nav aria-label="Page navigation example" class="pagination-container">
        <br>
        <div class="pagination justify-content-center">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                    <a class="page-link" href="#" @click.prevent="gotoFirstPage" aria-label="First">
                        <span aria-hidden="true">&laquo;&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                    <a class="page-link" href="#" @click.prevent="prevPage" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li
                    class="page-item"
                    v-for="page in visiblePages"
                    :key="page"
                    :class="{ active: page === currentPage + 1 }"
                >
                    <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                    <a class="page-link" href="#" @click.prevent="nextPage" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                    <a class="page-link" href="#" @click.prevent="gotoLastPage" aria-label="Last">
                        <span aria-hidden="true">&raquo;&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>

    </nav>


</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import store from "@/store/store";

const reviewList = ref([]);

const fetchReviewList = async () => {
    try {
        const email = store.state.email;
        const response = await axios.post("http://localhost:9212/api/get-review-list", { email });

        // review_id를 기준으로 내림차순 정렬
        const data = response.data.sort((a, b) => b.review_id - a.review_id);

        // 리뷰 객체에 isEditing 속성 추가
        reviewList.value = data.map((review) => ({ ...review, isEditing: false }));
    } catch (error) {
        console.error("리뷰 조회에 실패하셨습니다.", error);
    }
};

onMounted(fetchReviewList);

// 리뷰 삭제
const selectedItems = ref([]);

const deleteSelectedReviews = async () => {
    console.log("dd");
    const selectedReviews = selectedItems.value;
    console.log(selectedReviews);
    if (selectedReviews.length === 0) {
        console.log("삭제할 댓글이 선택되지 않았습니다.");
        return;
    }

    if (window.confirm("정말로 선택된 리뷰를 삭제하시겠습니까?")) {
        const email = store.state.email; // 현재 로그인된 유저의 이메일 정보

        try {
            const response = await axios.post("http://localhost:9212/api/deleteComment", {
                reviewIds: selectedReviews,
                email: email,
            });
            if (response.status === 200) {
                console.log({
                    reviewIds: selectedReviews,
                    email: email,
                });
                console.log("리뷰 삭제 성공");
                selectedItems.value = [];
            }
        } catch (err) {
            console.error("리뷰 삭제 실패:", err);
        }
    } else {
        console.log("삭제 취소");
    }
};

// 페이징 처리
let currentPage = ref(0);
let reviewsPerPage = ref(1);

const currentPageReviews = computed(() => {
    const start = currentPage.value * reviewsPerPage.value;
    const end = start + reviewsPerPage.value;
    return reviewList.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(reviewList.value.length / reviewsPerPage.value));

const pageRange = computed(() => {
    const start = Math.max(currentPage.value - 2, 0);
    const end = Math.min(start + 5, totalPages.value);
    return { start, end };
});

const visiblePages = computed(() => {
    const { start, end } = pageRange.value;
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
    }
};

const gotoPage = (page) => {
    currentPage.value = page - 1;
};

const gotoFirstPage = () => {
    currentPage.value = 0;
};

const gotoLastPage = () => {
    currentPage.value = totalPages.value - 1;
};

async function editReview(review) {
    try {
        const { review_id, starkit, comment } = review;

        console.log(review);
        // 서버로 수정된 리뷰 정보 전송
        await axios.post(`http://localhost:9212/api/updateComment`, {
            review_id,
            starkit,
            comment
        });

        console.log("리뷰가 수정되었습니다.");
    } catch (error) {
        console.error("리뷰 수정 실패:", error);
    }
}

const toggleEdit = async (review) => {
    review.isEditing = !review.isEditing;
    if (!review.isEditing) {
        await editReview({ ...review, review_id: review.review_id });
    }
};

const toggleEditSelectedReviews = async () => {
    if (editingSelectedReviews.value) {
        // 저장 버튼이 클릭된 경우, 선택된 리뷰들을 저장
        for (const review of reviewList.value) {
            if (selectedItems.value.includes(review.review_id)) {
                if (review.isEditing) {
                    await toggleEdit(review);
                }
            }
        }
    } else {
        // 수정 버튼이 클릭된 경우, 선택된 리뷰들의 편집 모드를 토글
        for (const review of reviewList.value) {
            if (selectedItems.value.includes(review.review_id)) {
                review.isEditing = !review.isEditing;
            }
        }
    }
};

const editingSelectedReviews = computed(() => {
    return selectedItems.value.some((itemId) => {
        const review = reviewList.value.find((item) => item.review_id === itemId);
        return review && review.isEditing;
    });
});

</script>

<style scoped>

/************* 회원조회 칼럼 *************/
table {
    margin-top: 20px;
    width: 100%; /* 원하는 값으로 조정하세요 */
    border-collapse: collapse;
}

td {
    padding: 40px;
    text-align: left;
    border-bottom: 1px solid #FF8551;
    text-align: center;
    font-size: 15px; /* 원하는 폰트 크기로 수정하세요 */
}


th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #FF8551;
    text-align: center;
}

th.column {
    background-color: #FFFAF8;
    text-align: center;
}

th.column-small {
    width: 80px;
}

th.column-large {
    width: 150px; /* 원하는 값으로 조정하세요 */
}



.btn-light {
    font-size: 15px;
    padding: 6px 25px 6px 25px;
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.text1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1px;
}

.review-title {
    margin: 0;
    margin-bottom: 5px;
}

.button-container {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
}



.btn-danger {
    font-size: 15px;
    padding: 6px 25px 6px 25px;
    margin-right: 10px;
    color: black;
    background-color: #FFE2C0;
    font-weight: bold;
    border: 1px solid black;
}


/* .user-list table {
  font-size: 15px;
} */

.user-list td {
    padding: 5px;
    line-height: 90px;
    vertical-align: middle; /* 수정된 부분 */
}

/* .user-list th, */
.user-list input {
    line-height: 90px;
    vertical-align: middle; /* 수정된 부분 */
}

.user-list .text1 {
    height: 90px;
    vertical-align: middle; /* 수정된 부분 */
}
</style>

