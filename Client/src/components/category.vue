<template>
    <div v-bind:class="{backlog: kelas.isBacklog, 'border-1': kelas.isBorder1, todo: kelas.isTodos, 'border-2': kelas.isBorder2,
    done: kelas.isDone, 'border-3': kelas.isBorder3, completed: kelas.isCompleted, 'border-4': kelas.isBorder4}">
        <div class="container-title" style="border-top-left-radius: 7px; border-top-right-radius: 7px;">
            <h3>{{title}}</h3>
        </div>
        <div class="card">
            <task v-for="task in data" :key="task.id" :task="task" :kelas="kelas" @deleteTask = "deleteTask">
            </task>
        </div>
    </div>
</template>
<script>
    import Task from './task'
    import axios from 'axios'
    export default {
        components: {
            'task': Task
        },
        props: ['title', 'data', 'kelas'],
        data: function(){
            return {
                
            }
        },
        methods: {
            deleteTask(id){  
                this.$emit('deleteTask', id)
            }
                       
        }
    }
</script>