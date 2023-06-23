<template>
    <div class="container1">
        <div class="image-wrap">
            <!-- 여기에 이미지를 추가하세요 -->
            <img src="이미지_파일_경로" alt="광고">
        </div>

        <div class="search-wrap">
            <div class="search">
                <input type="text" class="searchTerm" placeholder="검색">
                <button type="submit" class="searchButton">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>


        <div class="category-wrap">
            <ul>
                <li data-category="action"><a href="#">액션</a></li>
                <li data-category="sf"><a href="#">SF/판타지</a></li>
                <li data-category="romance"><a href="#">로맨스</a></li>
                <li data-category="horror"><a href="#">호러/스릴러</a></li>
                <li data-category="comedy"><a href="#">코미디</a></li>
                <li data-category="family"><a href="#">가족</a></li>
                <li data-category="animation"><a href="#">애니메이션</a></li>
            </ul>
            <ul>
                <li v-for="category in categories" :key="category" :data-category="category">
                    <a href="#" @click="showMoviesByCategory(category)">{{ category }}</a>
                </li>
            </ul>
        </div>




        <div class="container2">
            <a class="photoLink" href="#">
                <div id="item1" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>

            <a class="photoLink" href="#">
                <div id="item2" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>

            <a class="photoLink" href="#">
                <div id="item3" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>

            <a class="photoLink" href="#">
                <div id="item4" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>
        </div>

        <div class="container2">
            <a class="photoLink" href="#">
                <div id="item5" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>

            <a class="photoLink" href="#">
                <div id="item6" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>

            <a class="photoLink" href="#">
                <div id="item7" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>

            <a class="photoLink" href="#">
                <div id="item8" class="item">
                    <div class="color">
                        <img src="이미지_경로" alt="이미지_설명">
                    </div>
                </div>
            </a>
        </div>


        <div class="row">
            <div class="col-sm-12 text-xs-center">
                <nav class="navigation pagination" role="navigation">
                    <h2 class="screen-reader-text">Navigazione articoli</h2>
                    <div class="nav-links">
                        <a class="prev page-numbers" href="#"><i class="ion-ios-arrow-back"></i></a>
                        <a class='page-numbers' href='#'>1</a>
                        <a class='page-numbers' href='#'>2</a>
                        <a class='page-numbers' href='#'>3</a>
                        <a class='page-numbers' href='#'>4</a>
                        <a class='page-numbers' href='#'>5</a>
                        <span class="page-numbers dots">&hellip;</span>
                        <a class='page-numbers' href='#'>8</a>
                        <a class="next page-numbers" href="#"><i class="ion-ios-arrow-forward"></i></a>
                    </div>
                </nav>
            </div>
        </div>
    </div>


</template>

<script>

/*
export default {
  data() {
    return {
      categories: ['action', 'sf', 'romance', 'horror', 'comedy', 'family', 'animation'],
      activeCategory: 'action',
      searchTerm: '',
    };
  },
  methods: {
    showMoviesByCategory(category) {
      this.activeCategory = category;
      // 해당 카테고리에 해당하는 영화를 표시하는 로직을 추가하세요.
    },
    searchMovies() {
      // 검색어를 이용하여 영화를 검색하는 로직을 추가하세요.
    },
  },
};
*/

</script>


<style scoped>
/********************* 검색 버튼과 전체 스타일 *******************/


.image-wrap {
    margin-bottom: 20px;
}

.image-wrap img {
    margin-left: 700px;
    width: 100%;
    max-height: 200px; /* 필요에 따라 높이 조정 */
    object-fit: cover;
    border-radius: 5px;
}

body{
    background: #f2f2f2;
    font-family: 'Open Sans', sans-serif;
}

.search {
    width: 100%;
    position: relative;
    display: flex;
}

.searchTerm {
    width: 100%;
    border: 3px solid #000000;
    border-right: none;
    padding: 5px;
    height: 35px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #000000;
}

.searchTerm:focus{
    color: #ffffff;
}

.searchButton {
    width: 40px;
    height: 35px;
    border: 1px solid white;
    background: #000000;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
}

.search-wrap{
    width: 250px;
    position: relative;
    margin-top: 300px;
    margin-left: 800px;
}


/*************************영화 카테고리 탭 버튼 **********************/
ul {
    margin: 150px auto 0;
    padding: 0;
    list-style: none;
    display: table;
    width: 1100px;
    text-align: center;
}
li {
    display: table-cell;
    position: relative;
    padding: 15px 0;
}
a {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;

    display: inline-block;
    padding: 15px 20px;
    position: relative;
}

a:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: black;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
}
a:hover:after {
    width: 100%;
    left: 0;
}

.category-wrap{
    position: relative;
    top: -150px;
}


/**************** 영화 이미지 넣는 부분 - 카테고리 별로 나와야함 ******************/
.container1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}


.container2 {
    display: flex;
    justify-content: center;
    position: relative;
    animation: 1.5s up;
    top: -300px;
}

a.photoLink {
    position: relative;
    float: left;
    overflow: hidden;
    margin: 10px 3%;
    min-width: 150px;
    max-width: 310px;
    min-height: 300px;
    max-height: 1000px;
    width: 100%;
    background: #000000;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    border-radius: .5rem;
}

div.item * {
    box-sizing: border-box;
    transition: all .2s ease-in-out;
    height: 100px;
    width: 100px;
}

div.item {
    vertical-align: top;
    height: 210px;
    width: 100%;
}

div.item i {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    font-size: 34px;
    color: #000000;
    width: 60px;
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    transform: translate(-50%, -50%) scale(0);
    transition: transform .5s 0 ease;
}

div.item a {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
}

div.item:hover i {
    transform: translate(-50%, -50%) scale(1);
    transition: transform .3s .1s cubic-bezier(.37,1.05,.5,1.21);
}

#item{
    background: center center no-repeat;
    background-size: cover;
}

div.color:hover {
    opacity: 1 !important;
}

div.color{
    width:100%;
    height: 100%;
    opacity: 0;
    background-color: #000000;
}

.screen-reader-text {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
}
.screen-reader-text:hover,
.screen-reader-text:active,
.screen-reader-text:focus {
    background-color: #f1f1f1;
    border-radius: 3px;
    clip: auto !important;
    color: #000000;
    display: block;
    font-size: 14px;
    font-size: 0.875rem;
    font-weight: bold;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
    display: none;
}


/*********** 페이지 표시하는 번호 탭 *************/
a {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.nav-links a {
    margin: 1rem .6rem;
}
.nav-links a.page-numbers {
    color: #000000;
}
.nav-links a.page-numbers:hover {
    color: #000000;
}
.nav-links .page-numbers.current,
.nav-links .page-numbers.dots {
    color: #000000;
}
.nav-links a.next,
.nav-links a.prev {
    display: inline-block;
    padding: .2rem .8rem;
    background-color: #000000;
    color: #fff;
    border-radius: 2px;
}
.nav-links a.next:hover,
.nav-links a.prev:hover {
    color: #fff;
}

.nav-links a.prev::before,
.nav-links a.next::after {
    content: "";
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    margin-right: 5px;
}

.nav-links a.prev::before {
    transform: rotate(45deg);
}

.nav-links a.next::after {
    transform: rotate(-135deg);
}

.row{
    margin-left: 260px;
    margin-top: -300px;
    position: relative;
}

</style>