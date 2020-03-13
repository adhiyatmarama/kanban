<template>
    <div class="login" v-if="loginPage">
        <h3>Sign In</h3>
        <form style="width: 300px; margin: 10px auto;" id="submit-login" @submit.prevent="logIn">
            <input type="text" id="login-email" placeholder="Email" v-model="loginEmail"><br>
            <input type="password" id="login-password" placeholder="Password" v-model="loginPassword"><br>
            <button type="submit">Sign in</button>
            <p v-if="logInError" style="color: red">{{logInError}}</p>
         </form>
         <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
    </div>
</template>
<script>
import dotenv from 'dotenv'
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'
dotenv.config()
export default {
    directives: {
        GoogleSignInButton
    },
    props: ['loginPage', 'logInError'],
    data(){
        return {
            loginEmail: '',
            loginPassword: '',
            baseUrl: 'http://localhost:3001',
            clientId: process.env.CLIENT_ID,
            userPass: process.env.VUE_APP_USER_PASS
        }
    },
    methods: {
        logIn(){
            let options = {
                url: `${this.baseUrl}/user/login`,
                method: 'post',
                data: {
                    email: this.loginEmail,
                    password: this.loginPassword
                }
            }
            axios(options)
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                let user = {
                    name: data.name
                }
                this.$emit('logIn', user)
            })
            .catch(err => {
                this.loginEmail = '',
                this.loginPassword = ''
                let data = {
                    error: err.response.data.msg
                }
                this.$emit('logIn', data)
            })
        },
        OnGoogleAuthSuccess (idToken) {
            // Receive the idToken and make your magic with the backend
            let options = {
                url: `${this.baseUrl}/user/googleLogin`,
                method: 'post',
                data: {
                    id_token: idToken
                }
            }
            axios(options)
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('name', data.name)
                let user = {
                    name: data.name
                }
                this.$emit('logIn', user)
            })
            .catch(err=> {
                let data = {
                    error: err.response.data.msg
                }
                this.$emit('logIn', data)
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>
<style>
.google-signin-button {
  color: rgb(28, 190, 201);
  border: 2px solid rgb(28, 190, 201);
  background-color: white;
  height: 50px;
  font-size: 15px;
  border-radius: 10px;
  padding: 5px 25px 5px 25px;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  margin-top: 5px; margin-bottom: 20px;
}
.google-signin-button:hover{
    color: white;
    background-color: rgb(28, 190, 201);
    cursor: pointer;
}
</style>