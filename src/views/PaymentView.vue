<template>
    <div class="container">
        <div class="horizontal-line"></div> 
        <div class="horizontal-line"></div> 
        <div class="payment">
            <div class="payment-left">
                <div><br></div>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            할인 쿠폰
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <strong>할인 쿠폰 선택</strong>  <code> </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                            관람권 / 기프티콘
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <strong>기프티콘 / 관람권 선택</strong>  <code> </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                                포인트 및 결제수단
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <strong>포인트 및 결제수단 선택</strong>  <code> </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="end"><h4>최종 결제수단</h4></div>
                <div class="payment-container">
                    <div class="payment-btn">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                            <label class="form-check-label" for="inlineRadio1">신용카드</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                            <label class="form-check-label" for="inlineRadio2">휴대폰 결제</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                            <label class="form-check-label" for="inlineRadio3">간편 결제</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4">
                            <label class="form-check-label" for="inlineRadio4">카카오 결제</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="payment-divider"></div> <!-- 선을 추가할 div 요소 -->
            <!-- 오른쪽 섹션을 위한 새로운 div 요소 추가 -->
            <div class="payment-right">
                <div><br></div>
                <table class="payment-table">
                    <tr>
                        <td>결제금액</td>
                    </tr>
                    <tr>
                        <td class="data1">데이터</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="accordion" id="payment-accordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#discount" aria-expanded="true" aria-controls="discount">
                                            할인내역
                                        </button>
                                    </h2>
                                    <div id="discount" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
                                        <div class="accordion-body">
                                            <strong>할인내역 출력</strong>  <code> </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>총 할인금액</td>
                    </tr>
                    <tr>
                        <td class="data3">데이터</td>
                    </tr>
                    <tr>
                        <td>결제내역</td>
                    </tr>
                    <tr>
                        <td class="data4">데이터</td>
                    </tr>
                </table>
                <div class="account-btn">
                    <button class="account">결제하기</button>
                </div>
            </div>
        </div>
        <div class="horizontal-underline"></div> 
        <div class="horizontal-line"></div> 
    </div>

</template>




<style scoped>
.container {
    overflow: hidden;
    position: relative;
}

.payment {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽 섹션을 컨테이너의 양 끝에 배치합니다 */
}

.payment-left,
.payment-right {
    flex-grow: 1;
}

.payment-divider {
    width: 1px; /* 선의 너비 조정 */
    height: auto;
    background-color: #000; /* 선의 색상 설정 */
    margin: 0 10px; /* 선의 여백 설정 */
}

.horizontal-line {
  height: 1px;
  background-color: black;
  margin-top: 5%;
}
.horizontal-underline {
    height: 1px;
    background-color: black;
}

.end {
    margin-top: 5%;
}

.payment-container{
    margin-top: 5%;
    margin-bottom: 5%;
}


table {
    border: 1px solid black;
    width: 60%;
    border-collapse: collapse; /* 테이블 경계를 병합 */
    margin-bottom: 3%;
}

td {
    padding-left: 10px; /* 왼쪽 여백 설정 */
    text-align: left; /* 왼쪽 정렬 설정 */
}

td.data1 {
    height: 5rem; /* 원하는 높이로 조정하세요 */
}
td.data2 {
    height: 10rem; /* 원하는 높이로 조정하세요 */
}
td.data3 {
    height: 5rem; /* 원하는 높이로 조정하세요 */
}
td.data4 {
    height: 5rem; /* 원하는 높이로 조정하세요 */
}

#payment-accordion {
    margin-bottom: 5%;
}

.account {
    width: 60%;
    height: 5rem;
}

.account-btn {
    margin-bottom: 3%;
}
</style>
