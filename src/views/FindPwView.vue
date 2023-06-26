<template>
    <div class="findUser-box">
      <h2>비밀번호 찾기</h2>
      <hr class="center-hr" />
      <div class="findbtn">
        <button class="findIDPW" type="button">아이디찾기</button>
        <div class="IdPwline"></div>
        <button class="findIDPW" type="button">비밀번호찾기</button>
      </div>
      <div class="a">
        <div class="user-box">
          <input type="text" name="" required="">
          <label>이름</label>
        </div>
        
        <div class="user-box">
          <input type="email" name="aa" required="">
          <label>이메일</label>
          <button id="sendMessage" value="">인증번호 전송</button>
        </div>
    
        <div class="user-box">
          <input type="text" name="bb" required="">
          <label>인증번호</label>
          <button id="sendMessage">인증</button>
        </div>
        <div class="d-flex justify-content-end">
          <button id="next" type="button"><label>다음</label></button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .findUser-box {
    position: relative;
    margin: auto;
    width: 600px;
    height: 600px;
    padding: 100px;
    margin-top: 0;
    background: rgba(233, 202, 202, 0.402);
    box-sizing: border-box;
    border-radius: 10px;
  }
  
  .findbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
  
  .findIDPW {
    top: 30%;
    background-color: #343495;
    color: #fff;
    border: none;
    border-radius: 10%;
    padding: 3%;
    min-height: 10%;
    width: 100%;
  }
  
  .findUser-box h2 {
    margin: -10% 0 30px;
    padding: 0;
    color: #000000;
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: larger;
  }
  
  .IdPwline {
    border-left: thin solid #000000;
    margin-left: 5%;
    margin-right: 5%;
    height: 40px;
  }
  
  .a {
    margin-top: 20%;
    align: center;
  }
  
  .user-box {
    position: relative;
  }
  
  .user-box input {
    width: 70%;
    padding: 10px 0;
    font-size: 16px;
    color: #000000;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    background: transparent;
    margin-left: -30%;
  }
  

  
  .user-box label {
    position: absolute;
    top: 0;
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
  
  #sendMessage {
    margin-left: 10px;
    font-size: 9pt;
  }
  
  #next {
    margin-top: 10%;
    top: 30%;
    background-color: #343495;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px;
    min-height: 35px;
    width: 40%;
  }
  
  #next label {
    font-size: large;
  }
  
  .user-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-box button{
    background-color: rgb(113, 113, 113);
  color: white;
  border: none;
  text-align: right;
  }
  .user-box [name="aa"]{
    margin-left: -5%;
  }
  .user-box [name="bb"]{
    margin-left: -19%;
  }
  
  </style>