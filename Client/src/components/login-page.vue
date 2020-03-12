<template>
    <div class="login" v-if="loginPage">
        <h3>Sign In</h3>
        <form style="width: 300px; margin: 10px auto;" id="submit-login" @submit.prevent="logIn">
            <input type="text" id="login-email" placeholder="Email" v-model="loginEmail"><br>
            <input type="password" id="login-password" placeholder="Password" v-model="loginPassword"><br>
            <div class="g-signin2" data-onsuccess="onSignIn" style="margin:10px auto; width: 100px;"></div>
            <button type="submit">Sign in</button>
            <p v-if="logInError" style="color: red">{{logInError}}</p>
         </form>
    </div>
</template>
<script>
export default {
    props: ['loginPage', 'logInError'],
    data(){
        return {
            loginEmail: '',
            loginPassword: '',
        }
    },
    methods: {
        logIn(){
            let data = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            this.$emit('logIn', data)
        }
    }
}
</script>