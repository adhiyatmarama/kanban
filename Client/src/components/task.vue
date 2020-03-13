<template>
    <div 
        class="container-content" 
        v-bind:class="{'border-1': kelas.isBorder1, 'border-2': kelas.isBorder2, 'border-3': kelas.isBorder3, 'border-4': kelas.isBorder4}" 
        :id="id"
        :draggable="draggable"
        @dragstart="dragStart"
        @dragover.stop
    >
        <div class="task-content">
            <div class="task-title">
                <span>{{ task.title }}</span>
            </div>
            <div class="task-description">
                <span>{{ task.description }}</span>
            </div>
        </div>
        <div class="action">
            <i class="fa fa-trash btn-delete" style="font-size: 23px;" @click="deleteTask(task.id)"></i>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: ['task', 'kelas', 'draggable', 'id', 'baseUrl'],
    data: function(){
        return {
        }
    },
    methods: {
        dragStart: e => {
            const target = e.target;
            e.dataTransfer.setData('task_id', target.id)
            setTimeout(() => {
                target.style.display = "none";
            }, 0)
        },
        deleteTask(id){
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this task!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        let options = {
                            url: `${this.baseUrl}/tasks/${id}`,
                            method: 'delete',
                            headers: {
                                token: localStorage.token
                            }
                        }
                        axios(options)
                        .then(({data}) => {
                            swal("Poof! Your Task has been deleted!", {
                                icon: "success",
                            });
                            this.$emit('deleteTask', id)
                        })
                        .catch(error => {
                            console.log(error)
                        })   
                    } else {
                        swal("Your Task is safe!");
                    }
                });
                
        }
    }
}

</script>