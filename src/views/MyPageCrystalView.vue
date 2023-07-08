<template>
<div>
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

        <div class="row" style="background-color : background-color:rgba(0,0,0,0);">
            <br><br>
        </div>

    </div>
    <div class="row">
        <div class="row2"  style = "width:15%;height:600px; background-color :rgba(0,0,0,0);" > </div>
        <div class="row2"  style = "width:20%;height:600px; background-color :gray;" >

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
                <br><br>
                <button type="button" class="btn btn-danger" style="font-size:18px;" @click="confirmDeleteMember" >탈퇴하기</button>
            </div>
        </div>

        <div class="row2"  style = "width:5%;height:600px; background-color:gray;" >

            <!-- 세로줄 -->
            <div style="width:75%; height:600px; borde:1px; float:left;">
                <div class="d-flex" style="height: 600px; z-index: 1;">
                    <div class="vr"></div>


                </div>
            </div>
        </div>


        <div class="row2"  style = "width:45%;height:600px; background-color:gray;" >
            <div style="width:100%; height:100%; border:1px; float:left; padding:10px;">
                <br>
                <div style="width:100% height:220px; border:1px; text-align:left; font-size: 18px;">{{my_data.member_name}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{my_data.birthday}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{my_data.tel}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{email}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">
                  
                  <button type="button" class="btn btn-success" @click="showChangePasswordForm">비밀번호 변경</button></div>
                <form @submit="changePassword">
                    <br>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">현재 비밀번호
                    <input type="password" style="float:right" size="25" v-model="currentPassword" nid="currentPassword" required></div>
                <br>
                <div v-if="changePasswordFormVisible" style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">새로운 비밀번호
                    <input type='password' style="float:right" size="25" v-model="newPassword" id="newPassword" required></div>
                <br>
                <div v-if="changePasswordFormVisible" style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">새로운 비밀번호 확인
                    <input type='password' style="float:right" size="25" v-model="confirmPassword" id="confirmPassword" required></div>
                <br><br>

                <button v-if="changePasswordFormVisible" type="submit" class="btn btn-info" style="font-size:20px; padding:6px 45px 6px 45px;" @click="updatePassword">수정</button><div class="hello"></div>
                <button v-if="changePasswordFormVisible" type="button" class="btn btn-light" style="font-size:20px; padding:6px 45px 6px 45px;" @click="cancelChangePassword">취소</button>
                </form>
            </div>
        </div>
        
    </div>
        <div class="row" style="background-color : background-color:rgba(0,0,0,0);">
        <br><br>
    </div>
</div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import VueCookie from 'vue-cookie';
import { useStore } from 'vuex';
import router from '@/router';
import axios from "axios";
import {reactive, ref} from "vue";

const changePasswordFormVisible = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const store = useStore();


// 비밀번호 변경을 누르면 폼을 표시합니다.
function showChangePasswordForm() {
  changePasswordFormVisible.value = true;
}

function cancelChangePassword() {
  changePasswordFormVisible.value = false;
}

// 비밀번호 변경
async function updatePassword(email) {
  if (newPassword.value !== confirmPassword.value) {
    console.error('새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    return;
  }

  const passwordData = {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    email: email,
  };

  try {
    const response = await axios.post('http://localhost:9212/api/update-password', passwordData);
    console.log('비밀번호 업데이트 성공');
    // 비밀번호 업데이트 성공 처리 로직 추가
  } catch (error) {
    console.error('비밀번호 업데이트 실패', error);
    // 비밀번호 업데이트 실패 처리 로직 추가
  }
}


// 회원 삭제 확인

const confirmDeleteMember = async () => {
  const confirmed = confirm("정말로 회원을 탈퇴하시겠습니까?");

  if (confirmed) {
    const memberEmail = store.state.email;

    try {
        const response = await axios.post('http://localhost:9212/api/delete-member', { memberEmail });
      console.log('회원 삭제 성공');
      // 회원 삭제 성공 처리 로직 추가

      store.commit('CLEAR_TOKEN'); // 토큰 삭제
      await router.replace({ name: 'home' }); // HomepageMainView 페이지로 이동

    } catch (error) {
      console.error('회원 삭제 실패', error);
      // 회원 삭제 실패 처리 로직 추가
    }
  }
}

const my_data = reactive({
    member_name:'',
    tel:'',
    birthday: ''
})

const email = store.state.email;
const myPage = async ()=>{
    const body = {email : store.state.email}
    const res = await axios.post("http://localhost:9212/api/crystars",body)
    const code = res.data.code
    if(code === 200){
        my_data.member_name = res.data.member_name;
        my_data.tel = res.data.tel;
        my_data.birthday = res.data.birthday;
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
