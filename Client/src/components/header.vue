<template>
    <div class="header">
            <div class="header-content">
                <div class="logo" style="float: left; margin-left: 20px;">
                    <h2 style="margin-top: 14px;">KANBAN</h2>
                </div>
                <div class="navbar" style="float: left; margin-top: 6px; display: none;">
                    <ul>
                        <li>HOME</li>
                        <li>ABOUT US</li>
                    </ul>
                </div>
                <div class="sign-in" style="float: right; margin-right: 20px; margin-top: 6px;" v-if="!isLogin">
                    <ul>
                        <li v-on:click="showLogin">SIGN IN</li>
                        <li v-on:click="showRegister">REGISTER</li>
                    </ul>
                </div>
                <div class="logout" style="float: right; margin-right: 20px; margin-top: 6px;" v-if="isLogin">
                    <ul>
                        <li @click="logout">SIGN OUT</li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: ['isLogin'],
    methods: {
        showLogin(){
            this.$emit('showLogin')
        },
        showRegister(){
            this.$emit('showRegister')
        },
        logout(){
            this.$emit('logout')
        }
    }
}
</script>