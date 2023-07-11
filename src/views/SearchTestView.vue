<template><div class="search">
    <input
            type="text"
            class="searchTerm"
            placeholder="영화 제목을 입력하세요."
            v-model="searchQuery"
    />
    <button type="submit" class="searchButton"  @click="searchmovie">검색</button>
</div>
</template>

<script setup>
// import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

const searchQuery = ref('');

const searchmovie = () => { 
  router.push({ name: "SearchMovieView",
  query: { searchQuery:searchQuery.value },
}) 
}



</script>