<template>
    <div class="container">
        <br>
        <div class="row" style = "background-color :gray">
            <div class="col1" align="right">
                <br>
                <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
      font-size: 1.3em; font-weight: nomal;" @click="goMypageView">예매관리</button>
                <div class="vr"></div>
                <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
      font-size: 1.3em; font-weight: bold">회원관리</button>
            </div>

            <div class="col2" align="left" >
                <div style="width:30px; height:25px; border:1px; float:left;"></div>
                <div style="width:120px; height:25px; border:1px; float:left;">님 안녕하세연</div>


            </div>

            <br><br><br>

            <div class="col2" align="left">
                <div style="width:30px; height:25px; border:1px; float:left;"></div>
                <div style="width:80px; height:25px; border:1px; float:left;">예매 내역</div>
                <div style="width:20px; height:25px; border:1px; float:left;"></div>
                <div style="width:80px; height:25px; border:1px; float:left;">건</div>
            </div>
            <div>
                <br>
            </div>
            <div class="row2" align="center">
                <div class="con1"  style="width: 85%; height:155px; border:1px; float:center; background-color:#11DEFB">
                </div>
                <br>
            </div>
        </div>

        <div class="row" style="background-color : #000000">/* 빈공간(보이기 쉽게 컬러적용) */
            <br><br>
        </div>

    </div>
    <div class="row">
        <div class="row2"  style = "width:15%;height:800px; background-color :rgba(0,0,0,0);" > </div>
        <div class="row2"  style = "width:20%;height:800px; background-color :gray;" >

            <br>
            <div style="width:100%; height:100%; border:1px; float:left; padding:10px;">
                <div style="width:100% height:220px; border:1px; float:center; font-size: 18px;">이름</div>
                <hr>
                <div style="width:100% height:250px; border:1px; float:center; font-size: 18px;">생년월일</div>
                <hr>
                <div style="width:100% height:250px; border:1px; float:center; font-size: 18px;">휴대전화번호</div>
                <hr>
                <div style="width:100% height:250px; border:1px; float:center; font-size: 18px;">이메일</div>
                <hr>
                <div style="width:100% height:250px; border:1px; float:center; font-size: 18px;">비밀번호</div>
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <button type="button" class="btn btn-danger" style="font-size:18px;">탈퇴하기</button>
            </div>
        </div>

        <div class="row2"  style = "width:5%;height:800px; background-color:gray;" >

            <!-- 세로줄 -->
            <div style="width:75%; height:100%; borde:1px; float:left;">
                <div class="d-flex" style="height: 100%; z-index: 1;">
                    <div class="vr"></div>


                </div>
            </div>
        </div>


        <div class="row2"  style = "width:45%;height:800px; background-color:gray;" >
            <div style="width:100%; height:100%; border:1px; float:left; padding:10px;">
                <br>
                <div style="width:100% height:220px; border:1px; text-align:left; font-size: 18px;">{{my_data.member_name}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{my_data.birthday}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{my_data.member_tel}}
                    <button type="button" class="btn btn-outline-light" style="float:right">전화번호 변경</button></div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{email}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;"><button type="button" class="btn btn-success">비밀번호 변경</button></div>
                <br>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">현재 비밀번호 <input type='text' style="float:right" size="30"></div>
                <br>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">새로운 비밀번호 <input type='text' style="float:right" size="30"></div>
                <br>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">새로운 비밀번호 확인 <input type='text' style="float:right" size="30"></div>
                <br><br><br><br><br><br><br><br><br><br><br>

                <button type="button" class="btn btn-info" style="font-size:20px; padding:6px 45px 6px 45px;">수정</button><div class="hello"></div> <button type="button" class="btn btn-light" style="font-size:20px; padding:6px 45px 6px 45px;">변경</button>
            </div>
        </div>
    </div>
    <div class="row" style="background-color : #000000">/* 빈공간(보이기 쉽게 컬러적용) */
        <br><br>
    </div>
</template>

<script setup>
import router from '@/router';
import axios from "axios";
import store from "@/store/store";
import {reactive} from "vue";

const my_data = reactive({
    member_name:'',
    member_tel:'',
    birthday: ''
})
const email = store.state.email;
const myPage = async ()=>{
    const body = {email : store.state.email}
    const res = await axios.post("http://localhost:9212/api/crystars",body)
    const code = res.data.code
    if(code === 200){
        my_data.member_name = res.data.member_name;
        my_data.member_tel = res.data.member_tel;
        my_data.birthday = res.data.member_birthday;
    }else if(code === 400){
        alert("사용자 조회에 실패하셧습니다.")
    }
}

myPage();
const goMypageView = () => {
    router.push({
        name: 'mypage',
    });
};
</script>

<style scoped>
.hello{
    width: 50px;
    height: auto;
    display: inline-block;
}

</style>