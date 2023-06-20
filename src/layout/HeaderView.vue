<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#" style="font-size: 0.5rem;">로그인</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#" style="font-size: 0.5rem;">회원가입</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#" style="font-size: 0.5rem;">고객센터</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="line">
        <div class="d-flex justify-content-center">
            <span class="divider">영화</span>
            <span class="divider">ㅣ</span>
            <span class="divider">예매</span>
            <span class="divider">ㅣ</span>
            <span class="divider">이벤트</span>
        </div>
        </div>
    </div>

</template>

<script setup>

</script>

<style scoped>
.line {
    color: #000000; /* 검정색 */
    margin-top: 3%; /* 구분 기호의 좌우 여백 설정 */
    border: 1px solid #000000; /* 외곽선 추가 */
    padding: 5px; /* 내부 여백 설정 */
}
</style>
