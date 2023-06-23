<template>
    <div class="findUser-box">
        <h2>아이디 찾기</h2>

        <hr class="center-hr"/>
        <div class="findbtn">
            <button class="findIDPW" type="button" >아이디찾기</button>
                <div class="IdPwline"></div>
            <button class="findIDPW" type="button">비밀번호찾기</button>

        </div>
        <div class="a">
        <div class="user-box">
        <input type="text" name="" required="">
        <label>이름</label>
      </div>
      <div class="user-box">
        <input type="text" name="" required="">
        <label>휴대폰 번호</label>
      </div>
      </div>
      <div class="d-flex justify-content-end" >
      <button id="next" type="button"><label>다음</label></button>
    </div>
    </div>
</template>



<style scoped>
.findUser-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    height: 600px;
    padding: 100px;
    margin-top: 50px;
    transform: translate(-50%, -50%);
    background: rgba(233, 202, 202, 0.402);
    box-sizing: border-box;
    border-radius: 10px;
  }
  .findbtn{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    
  }
  
  .findIDPW {
    top:30%;
    background-color:#343495;
    color: #fff;
    border:none; 
    border-radius:10%; 
    padding:3%;
    /* min-height:10%;  */
    /* min-width: 120px; */
    width: 100%;
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
  .IdPwline{
    border-left :thin solid #000000;
    /* border: #000000; */
    margin-left: 5%;
    margin-right: 5%;
    height : 40px;
  }
  .a{
    margin-top: 20%;
    align: center;
  }
  .user-box{
    position: relative;
  }
  .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;                 /*입력창 깜빡이*/
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #000000;           /*유저네임 밑 줄*/
    outline: none;
    background: transparent;
  }
  .user-box label {    /*유저네임 패스워드*/
    position:absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;
    pointer-events: none;
    transition: .5s;
  }
  
  .user-box input:focus ~ label,
  .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #000000;
    font-size: 12px;
  }
  
  #next{
    margin-top: 10%;
    top:30%;
    background-color:#343495;
    color: #fff;
    border:none; 
    border-radius:10px; 
    padding:10px;
    /* min-height:35px;  */
    /* min-width: 120px; */
    width: 40%;
  }
  #next label{
    font-size: large;
  }
  
</style>