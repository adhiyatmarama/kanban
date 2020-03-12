<template>
    <div class="register" v-if="registerPage">
        <h3>Register</h3>
        <form style="width: 300px; margin: 10px auto;" id="submit-register" @submit.prevent="register">
            <input type="text" placeholder="Name" v-model="registerName"><br>
            <input type="text"  placeholder="Email" v-model="registerEmail"><br>
            <input type="password"  placeholder="Password" v-model="registerPassword"><br>
            <button type="submit" style="margin-top: 10px;">Register</button>
            <p v-for="item in registerError" style="color: red" :key="item">{{item}}</p>
        </form> 
    </div>
</template>
<script>
export default {
    props: ['registerPage', 'registerError'],
    data() {
        return {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    },
    methods: {
        register(){
            let data = {
                name: this.registerName,
                email: this.registerEmail,
                password: this.registerPassword
            }
            this.$emit('register', data)
        }
    },
}
</script>