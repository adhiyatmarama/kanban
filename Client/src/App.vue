<template>
    <div id="app">
        <header-comp :isLogin="isLogin" @showLogin="showLogin" @showRegister="showRegister" @logout="logout"></header-comp>
        <div class="landing-page" v-if="!isLogin">
            <div class="welcome">
                <h3>WELCOME TO</h3>
                <h1>KANBAN APPS</h1>
                <img src="kids-holding-colorful-blocks-illustration_53876-40275.jpg" style="width: 80%; height: auto;">
            </div>
            <div class="login-register">
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
            </div>
        </div>
        <div class="main-page" v-if="isLogin">
            <h1>Hello {{name}}, This Is Your Kanban</h1>
            <div class="kanban">
                <category title="Backlogs" :data="backLogs" :kelas="{isBacklog: true, isBorder1: true, isTodos: false, isBorder2: false,
                    isDone: false, isBorder3: false, isCompleted: false, isBorder4: false}" @deleteTask="deleteTask">
                </category>
                <category title="Todo" :data="todos" :kelas="{isBacklog: false, isBorder1: false, isTodos: true, isBorder2: true,
                    isDone: false, isBorder3: false, isCompleted: false, isBorder4: false}" @deleteTask="deleteTask">
                </category>
                <category title="Done" :data="dones" :kelas="{isBacklog: false, isBorder1: false, isTodos: false, isBorder2: false,
                    isDone: true, isBorder3: true, isCompleted: false, isBorder4: false}" @deleteTask="deleteTask">
                </category>
                <category title="Completed" :data="completeds" :kelas="{isBacklog: false, isBorder1: false, isTodos: false, isBorder2: false,
                    isDone: false, isBorder3: false, isCompleted: true, isBorder4: true}" @deleteTask="deleteTask">
                </category>
            </div>
            <div class="modal-cust" v-if="addTaskForm">
                <div class="add-task">
                    <div>
                        <div class="close" @click="addTaskForm = false; addTaskTitle = ''; addTaskDesc = ''; addTaskError = ''">+</div>
                        <h2 style="margin-bottom: 20px;">Add Task</h2>
                        <i class="fa fa-list" style="font-size: 120px; color: rgb(28, 190, 201); margin: 20px auto"></i>
                        <form @submit.prevent="addTask">
                            <input type="text" placeholder="Title" v-model="addTaskTitle"><br>
                            <input type="text" placeholder="Description" v-model="addTaskDesc"><br>
                            <button type="submit" style="margin-top: 10px;">Add Task</button>
                            <p v-if="addTaskError" style="color: red">{{addTaskError}}</p>
                        </form>
                    </div>
                </div>
            </div>
            <div class="btn-add-task" @click="addTaskForm = true">
                <span>+</span>
            </div>
        </div>
    </div> 
</template>
<script>
    import axios from 'axios'
    import Category from './components/category'
    import Header from './components/header'
    export default {
        components: {
            'category': Category,
            'header-comp' : Header
        },
        data: function(){
            return{
                message: 'Hello Vue!',
                name: '',
                tasks : [],
                isLogin: false,
                loginPage: true,
                registerPage: false,
                baseUrl: 'http://localhost:3001',
                loginEmail: '',
                loginPassword: '',
                registerName: '',
                registerEmail: '',
                registerPassword: '',
                addTaskForm: false,
                addTaskTitle: '',
                addTaskDesc: '',
                logInError: '',
                addTaskError: '',
                registerError: []

            }
        } ,
    created(){
        if(localStorage.token){
            this.isLogin = true
            this.name = localStorage.name
            this.getTasks()
        }
    },
    methods: {
            showRegister: function(){
                this.loginPage = false;
                this.registerPage = true
                this.logInError = ''
            },
            showLogin: function(){
                this.loginPage = true;
                this.registerPage = false
                this.registerError = []
            },
            getTasks: function(){
                this.tasks = []
                let options = {
                    url: `${this.baseUrl}/tasks`,
                    method: 'get',
                    headers: {
                        token: localStorage.token
                    }
                }
                axios(options)
                .then(({data}) => {
                    this.tasks = data
                })
                .catch(err => {
                    console.log(err)
                })
            },
            logIn: function(){
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
                    this.name = data.name
                    this.isLogin = true
                    this.getTasks()
                    this.logInError = ''
                })
                .catch(err => {
                    this.logInError = ''
                    this.logInError = err.response.data.msg
                })
            },
            logout: function(){
                localStorage.removeItem('token')
                this.name = ''
                this.isLogin = false
                this.loginEmail = ''
                this.loginPassword = ''
            },
            register: function(){
                let options = {
                    url: `${this.baseUrl}/user/register`,
                    method: 'post',
                    data: {
                        name: this.registerName,
                        email: this.registerEmail,
                        password: this.registerPassword
                    }
                }
                axios(options)
                .then(({data}) => {
                    this.loginPage = true;
                    this.registerPage = false;
                    this.registerError = []
                    this.registerEmail = '';
                    this.registerName = '';
                    this.registerPassword = ''
                })
                .catch(err => {
                    this.registerError = []
                    if(err.response.data.error){
                        err.response.data.error.forEach(item => {
                            this.registerError.push(item.msg)
                        })
                    }else{
                        this.registerError.push(err.response.data.msg)
                    }
                })
            },
            addTask(){
                let options = {
                    url: `${this.baseUrl}/tasks`,
                    method: 'post',
                    data: {
                        title: this.addTaskTitle,
                        description: this.addTaskDesc
                    },
                    headers: {
                        token: localStorage.token
                    }
                }
                axios(options)
                .then(({data}) => {
                    this.addTaskTitle = ''
                    this.addTaskDesc = ''
                    this.addTaskForm = false,
                    this.addTaskError = ''
                    this.getTasks()
                })
                .catch(err => {
                    err.response.data.error.forEach(item => {
                        this.addTaskError += `${item.msg}`
                    })
                })
            },
            deleteTask(){
                this.getTasks()
            }
    },
    computed: {
        backLogs(){
            return this.tasks.filter(item => item.category === 'Backlog')
        },
        todos(){
            return this.tasks.filter(item => item.category === 'Todo')
        },
        dones(){
            return this.tasks.filter(item => item.category === 'Done')
        },
        completeds(){
            return this.tasks.filter(item => item.category === 'Completed')
        }
    }
    }
</script>