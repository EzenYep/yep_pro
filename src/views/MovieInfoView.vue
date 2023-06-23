<template>
    <div class="container">
        <div class="movie_poster">
            <div class="main_poster">
            </div>
        </div>
        <div class="movie_info">
            <div style="margin-top: 30%;">

            </div>
            <div class="flex-container">
                <h4 class="flex-item">제목:</h4> <label class="flex-label"><h1>aaa</h1></label>
            </div>
            <br>
            <div class="flex-container">
                <h6 class="flex-item">감독:</h6> <label class="flex-label">ddd</label>
            </div>
            <br>
            <div class="flex-container">
                <h6 class="flex-item">장르:</h6> <label class="flex-label">ddd</label>
            </div>
            <br>
            <div class="flex-container">
                <h6 class="flex-item">개봉일:</h6> <label class="flex-label">1997-12-13</label>
            </div>
        </div>
    </div>
    <ReviewInfoView></ReviewInfoView>
</template>

<script setup>
import ReviewInfoView from "@/components/ReviewInfoView.vue";
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.movie_poster {
    flex: 1;
}

.movie_info {
    flex: 1;
    margin-bottom: 3%;
}

.main_poster {
    background-color: #000000;
}
.flex-container {
    display: flex;
    align-items: center;
}

.flex-item {
    flex: 1;
    margin-right: 10px;
}

.flex-label {
    flex: 2;
    margin-left: 10px;
}
.main_poster{
    background-color: #00720B;
    width: 80%;
    height: 100%;
}
</style>
