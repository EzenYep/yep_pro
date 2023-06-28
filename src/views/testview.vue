<script setup>
//db연결 테스트
import axios from "axios";
import {reactive} from "vue";
import router from "@/router";
import store from "@/store/store";

let body = reactive({});
const LogInEvent = async () => {
    body = {
        name: body.name,
        email: body.email,
        password: body.password,
        tel: body.tel,
        birthday: body.birthday
    }
    console.log(body)
    await axios.post("http://localhost:8081/api/user/addUser", body).then(
        (res) => {
            const code = res.data.code;
            if(code === 200){
                alert("dd")
            }
        }
    )

}

</script>

<template>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <h2 class="fw-bold mb-2 text-uppercase">SignUp</h2>
                                <p class="text-white-50 mb-5">Please enter your login and password and Name!</p>

                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeNameX" class="form-control form-control-lg"
                                           v-model="body.name"/>
                                    <label class="form-label" for="typeNameX" v-model="body.name">Name</label>
                                </div>
                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" class="form-control form-control-lg"
                                           v-model="body.email"/>
                                    <label class="form-label" for="typeEmailX" v-model="body.email">Email</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" class="form-control form-control-lg"
                                           v-model="body.password"/>
                                    <label class="form-label" for="typePasswordX"
                                           v-model="body.password">Password</label>
                                </div>
                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX_1" class="form-control form-control-lg"/>
                                    <label class="form-label" for="typePasswordX_1">Password reconfirm</label>
                                </div>
                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" class="form-control form-control-lg"
                                           v-model="body.tel"/>
                                    <label class="form-label" for="typeEmailX" v-model="body.email">Email</label>
                                </div>
                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" class="form-control form-control-lg"
                                           v-model="body.birthday"/>
                                    <label class="form-label" for="typeEmailX" v-model="body.email">Email</label>
                                </div>
                                <button type="submit" class="btn btn-outline-light btn-lg px-5" @click="LogInEvent">
                                    SignUp
                                </button>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>

</style>