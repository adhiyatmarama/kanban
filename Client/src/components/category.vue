<template>
    <div 
        v-bind:class="{backlog: kelas.isBacklog, 'border-1': kelas.isBorder1, todo: kelas.isTodos, 'border-2': kelas.isBorder2,
            done: kelas.isDone, 'border-3': kelas.isBorder3, completed: kelas.isCompleted, 'border-4': kelas.isBorder4}"
    >
        <div class="container-title" style="border-top-left-radius: 7px; border-top-right-radius: 7px;">
            <h3>{{id}}</h3>
        </div>
        <div class="card" :id="id" @dragover.prevent @drop.prevent="drop">
            <task v-for="task in data" :key="task.id" :task="task" :kelas="kelas" @deleteTask = "deleteTask" draggable="true" :id="task.id">
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
        props: ['data', 'kelas', 'id'],
        data: function(){
            return {
                
            }
        },
        methods: {
            drop: function(e) {
                const task_id = e.dataTransfer.getData('task_id');
                const task = document.getElementById(task_id)
                let id = Number(task.id)
                let category = e.target.id
                if(category === 'Backlog'){
                    task.className = 'container-content border-1'
                }else if(category === 'Todo'){
                    task.className = 'container-content border-2'
                }else if(category === 'Done'){
                    task.className = 'container-content border-3'
                }else{
                    task.className = 'container-content border-4'
                }
                task.style.display = "flex";
                e.target.appendChild(task)
                let data = {
                    id: id,
                    category: category
                }
                this.$emit('editTask', data)
            },
            deleteTask(id){  
                this.$emit('deleteTask', id)
            }
                       
        }
    }
</script>