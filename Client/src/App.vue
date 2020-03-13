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
                <login-page :loginPage="loginPage" :logInError="logInError" @logIn="logIn" :baseUrl="baseUrl"></login-page>
                <register-page :registerPage="registerPage" :registerError="registerError" @register="register" ></register-page>
            </div>
        </div>
        <div class="main-page" v-if="isLogin">
            <h1>Hello {{name}}, This Is Your Kanban</h1>
            <span style="font-size: 18px;">Drag the task to change its category</span>
            <div class="kanban">
                <category v-for="i in category" :key="i.id" :id="i.id" :data="filtered[i.id]" 
                    :kelas="i.kelas" @deleteTask="deleteTask" @editTask="editTask" :baseUrl="baseUrl">
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
    import LoginPage from './components/login-page'
    import RegisterPage from './components/register-page'
    let rootUrl = 'https://quiet-sierra-03283.herokuapp.com'
    var socket = io.connect(rootUrl)
    export default {
        components: {
            'category': Category,
            'header-comp' : Header,
            'login-page': LoginPage,
            'register-page': RegisterPage
        },
        data: function(){
            return{
                name: '',
                tasks : [],
                isLogin: false,
                loginPage: true,
                registerPage: false,
                baseUrl: rootUrl,
                addTaskForm: false,
                addTaskTitle: '',
                addTaskDesc: '',
                addTaskError: '',
                logInError: '',
                registerError: [],
                category: [
                    {
                        id: 'Backlog',
                        kelas: {
                            isBacklog: true, isBorder1: true, isTodos: false, isBorder2: false, isDone: false, 
                            isBorder3: false, isCompleted: false, isBorder4: false
                        }
                    },
                    {
                        id: 'Todo',
                        kelas: {
                            isBacklog: false, isBorder1: false, isTodos: true, isBorder2: true,
                            isDone: false, isBorder3: false, isCompleted: false, isBorder4: false
                        }
                    },
                    {
                        id: 'Done',
                        kelas: {
                            isBacklog: false, isBorder1: false, isTodos: false, isBorder2: false,
                            isDone: true, isBorder3: true, isCompleted: false, isBorder4: false
                        }
                    },
                    {
                        id: 'Completed',
                        kelas: {
                            isBacklog: false, isBorder1: false, isTodos: false, isBorder2: false,
                            isDone: false, isBorder3: false, isCompleted: true, isBorder4: true
                        }
                    }
                ]
            }
        } ,
        created: function(){
            console.log(this.tasks, 'ini tasks')
            if(localStorage.token){
                console.log('masuk if')
                this.isLogin = true
                this.name = localStorage.name
                this.getTasks()
            }
            socket.on('update-data', data=>{
                this.getTasks()
            })
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
                logIn: function(data){
                    if(data.name){
                        this.name = data.name
                        this.isLogin = true
                        this.getTasks()
                        this.logInError = ''
                    }else{
                        this.logInError = ''
                        this.logInError = data.error
                    }
                },
                logout: function(){
                    localStorage.removeItem('token')
                    this.name = ''
                    this.isLogin = false
                },
                register: function(data){
                    let options = {
                        url: `${this.baseUrl}/user/register`,
                        method: 'post',
                        data: {
                            name: data.name,
                            email: data.email,
                            password: data.password
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
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('name', data.name)
                        this.name = data.name
                        this.isLogin = true
                        this.getTasks()
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
                        this.tasks.push(data)
                        socket.emit('update-data', this.tasks)
                    })
                    .catch(err => {
                        err.response.data.error.forEach(item => {
                            this.addTaskError += `${item.msg}`
                        })
                    })
                },
                editTask(data){
                    let id = data.id
                    let task = this.tasks.find(item => item.id === id)
                    this.tasks.forEach(item => {
                        if(item.id === id){
                            item.category = data.category
                        }
                    })
                    let options = {
                        url: `${this.baseUrl}/tasks/${data.id}`,
                        method: 'put',
                        data: {
                            title: task.title,
                            description: task.description,
                            category: data.category
                        },
                        headers: {
                            token: localStorage.token
                        }
                    }
                    axios(options)
                    .then(({data}) => {
                        console.log(`updated ${data.title} category into ${data.category}`)
                        socket.emit('update-data', this.tasks)
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                },
                deleteTask(id){
                    this.tasks = this.tasks.filter(item => item.id != id)
                    socket.emit('update-data', this.tasks)
                }
        },
        computed: {
            filtered(){
                return {
                    Backlog : this.backLogs,
                    Todo: this.todos,
                    Done: this.dones,
                    Completed: this.completeds
                }
            },
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