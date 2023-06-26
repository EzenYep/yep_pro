<template>
  
    <div class="findUser-box">
        <h2>아이디 찾기 결과</h2>

        <hr class="center-hr"/>
        
        <div class="message">
            입력 하신 정보의 아이디 입니다.
        </div>

        <div class="result">
            <h1>아이디</h1>
        </div>

      <div class="d-flex justify-content-center" >
      <button id="next" type="button"><label>로그인 창으로</label></button>
    </div>
    </div>
  
</template>



<style scoped>

.findUser-box {
    position: relative;
    margin: auto;
    /* left: 25%; */
    width: 600px;
    height: 500px;
    padding: 100px;
    /* margin-top: 30px; */
    background: rgba(233, 202, 202, 0.402);
    box-sizing: border-box;
    /* box-shadow: 0 5px 5px rgba(0,0,0,.6); */
    border-radius: 10px;
  }
  
  .findUser-box h2 {
    margin: -10% 0 30px;
    padding: 0;
    color: #000000;
    text-align: center;
    font-style:normal;
    font-weight: 500;
    font-size: larger;
  }
  
  #next{
    margin-top: 40%;
    top:30%;
    background-color:#343495;
    color: #fff;
    border:none; 
    border-radius:10px; 
    padding:10px;
    min-height:35px; 
    /* min-width: 120px; */
    width: 40%;
  }
  #next label{
    font-size: large;
  }
  .message{
    margin-top: 10%;
    text-align: center;
  }
  .result{
    margin-top: 5%;
    text-align: center;
  }
</style>