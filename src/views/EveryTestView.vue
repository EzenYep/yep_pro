<template>
    <div>
      <ul>
        <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
      </ul>
      <div ref="scrollContainer" style="height: 300px; overflow-y: scroll;">
        <!-- 스크롤 컨테이너 -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const movies = ref([]); // 영화 검색 결과 배열
  let page = 1; // 페이지 번호
  let loading = false; // 데이터 로딩 상태
  
  onMounted(() => {
    const scrollContainer = ref.value.$refs.scrollContainer;
  
    // 스크롤 이벤트 리스너
    scrollContainer.addEventListener('scroll', () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight
      ) {
        loadMoreResults();
      }
    });
  
    // 초기 검색 결과 로딩
    loadMoreResults();
  });
  
  async function loadMoreResults() {
    if (loading) return;
  
    loading = true;
  
    try {
      const newMovies = await fetchData(page);
  
      if (newMovies.length > 0) {
        // 검색 결과를 동적으로 추가합니다.
        movies.value = [...movies.value, ...newMovies];
        page++;
      } else {
        // 추가 검색 결과가 없을 때는 더 이상 가져올 데이터가 없다고 표시합니다.
        console.log('더 이상 결과가 없습니다.');
      }
    } catch (error) {
      console.error('검색 결과를 가져오는 도중 오류가 발생했습니다:', error);
    }
  
    loading = false;
  }
  
  // 검색 결과를 비동기적으로 가져오는 예시 함수
  // 이 함수는 실제로 데이터를 가져오는 방법에 따라서 수정해야 합니다.
  async function fetchData(page) {
    // 여기에서는 가짜 데이터를 반환합니다.
    // 실제로는 서버에 요청하여 데이터를 가져와야 합니다.
    const response = await fetch(`https://api.example.com/movies?page=${page}`);
    const data = await response.json();
    return data.results;
  }
  </script>