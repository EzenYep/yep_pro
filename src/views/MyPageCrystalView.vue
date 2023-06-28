<template>
    <div class="container">
        <br>
        <div class="row" style = "background-color :gray">
            <div class="col1" align="right">
                <br>
                <button style="width:120px; height:50px; border:1px; background-color:rgba(0,0,0,0);
      font-size: 1.3em; font-weight: nomal" @click="goMypageView">예매관리</button>
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
            <div class="row6" align="center">
                <br>
                <div class="con7"  style="width:85%; height:50px; border:1px; float:center; text-align:left; padding : 10px 0; background-color:White" >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;극장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;시간&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;인원&nbsp;&nbsp;
                </div>
            </div>
            <div class="row3" align="center">
                <div class="con2"  style="width:85%; height:185px; border:1px; float:center; background-color:#11DEFB">
                </div>
                <br>
            </div>
        </div>

        <div class="row" style="background-color:rgba(0,0,0,0)">
            <br><br>
        </div>

    </div>
    <div class="row">
        <div class="row2"  style = "width:15%;height:700px; background-color :rgba(0,0,0,0);" > </div>
        <div class="row2"  style = "width:20%;height:700px; background-color :gray;" >

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
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <button type="button" class="btn btn-danger" style="font-size:18px;" @click="deleteUser">탈퇴하기</button>

            </div>
        </div>

        <div class="row2"  style = "width:5%;height:700px; background-color:gray;" >

            <!-- 세로줄 -->
            <div style="width:75%; height:100%; borde:1px; float:left;">
                <div class="d-flex" style="height: 100%; z-index: 1;">
                    <div class="vr"></div>


                </div>
            </div>
        </div>


        <div class="row2"  style = "width:45%;height:700px; background-color:gray;" >
            <div style="width:100%; height:100%; border:1px; float:left; padding:10px;">
                <br>
                <div style="width:100% height:220px; border:1px; text-align:left; font-size: 18px;">{{getuser.name}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{getuser.birthday}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{getuser.tel}}</div>
                <hr>
                <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">{{getuser.email}}</div>
                <hr>
                  <div style="width:100% height:250px; border:1px; text-align:left; font-size: 18px;">
    <button type="button" class="btn btn-success" @click="showPasswordForm">비밀번호 변경</button>

                <br>
 <div v-if="showForm">
    <form @submit="changePassword">
      <div for="currentPassword">현재 비밀번호:
        <input style="float:right" type="password" id="currentPassword" v-model="currentPassword" required>
      </div>
      <br>
      <div for="newPassword">새로운 비밀번호:
        <input style="float:right" type="password" id="newPassword" v-model="newPassword" required>
      </div>
      <br>
      <div for="confirmPassword">새로운 비밀번호 확인:
        <input style="float:right" type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <br><br>
      <button type="submit" class="btn btn-info" style="font-size:20px; padding:6px 45px 6px 45px; margin-right: 15px;">수정</button>
      <button type="button" class="btn btn-info" style="font-size:20px; padding:6px 45px 6px 45px;" @click="cancelPasswordChange">취소</button>

    </form>

  </div>
                  </div>


            </div>
        </div>
    </div>
    <div class="row" style="background-color:rgba(0,0,0,0)">
        <br><br>
    </div>

</template>

<script setup>
import router from '@/router';
import axios from "axios";
import { ref, onMounted } from 'vue';

const goMypageView = () => {
    router.push({
        name: 'mypage',
    });
};

const showForm = ref(false);

const showPasswordForm = () => {
  showForm.value = true;
};

const cancelPasswordChange = () => {
  showForm.value = false;
};

const crystarInfo = ref({});

const CrystalEvent = async () => {
  try {
    const response = await axios.get('http://localhost:9121/crystarinfo/');
    crystarInfo.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(CrystalEvent);

const getuser = ref({});

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:9121/user/');
    getuser.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchUserData);


const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const changePassword = async (event) => {
  event.preventDefault();

  if (newPassword.value !== confirmPassword.value) {
    alert('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return;
  }

  try {
    await axios.post('/api/user/change-password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    });

    // 비밀번호 변경 성공
    alert('비밀번호가 성공적으로 변경되었습니다.');

    // 데이터 초기화
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (error) {
    // 비밀번호 변경 실패
    alert('비밀번호 변경에 실패하였습니다. 현재 비밀번호가 올바른지 확인해주세요.');
  }
};

const showConfirmation = ref(false);

const deleteUser = async () => {
  if (showConfirmation.value) {
    try {
      await axios.delete('/api/user/delete'); // 백엔드 API로 DELETE 요청을 보냅니다.
      alert("탈퇴가 완료되었습니다."); // 성공적으로 탈퇴한 경우 알림을 표시합니다.
      // TODO: 탈퇴 후 로그인 페이지 등으로 이동하는 로직을 추가할 수 있습니다.
    } catch (error) {
      console.error(error);
      alert("탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요."); // 탈퇴에 실패한 경우 알림을 표시합니다.
    }
  } else {
    showConfirmation.value = true; // 탈퇴 확인 메시지를 표시합니다.
  }
};
 
</script>

<style scoped>
.hello{
    width: 50px;
    height: auto;
    display: inline-block;
}

</style>