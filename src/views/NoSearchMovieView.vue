<template>
    <div class="container">
        <div class="search">
            <input type="text" class="searchTerm" placeholder="검색어를 입력하세요."/>
            <button type="submit" class="searchButton" @click="searchmovie">검색</button>
        </div>

        <h3>검색결과</h3>
        <hr class="center-hr" style="font-weight: 900;"/>
        <h5>일치하는 영화가 없습니다.</h5>

          
    </div>
    

</template>

<script setup>

</script>

<style scoped>
.container {
    position: relative;
    margin: auto;
    width: 100%;
    height: 100%;
    padding: 50px;
    background: rgba(227, 187, 187, 0.402);
    box-sizing: border-box;
    /* box-shadow: 0 5px 5px rgba(0,0,0,.6); */
    border-radius: 10px;
}
.container h3{
    margin: 0 0 30px;
    padding: 0;
    color: #000000;
    text-align: center;
    margin-bottom: -5;
    letter-spacing: 10px;
}
.search {
    position: relative;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 40px;
    text-align: right;
}

</style>