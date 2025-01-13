<template>
  <div class="container mx-auto p-4">
    <!-- Add Task Form -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-center mb-4">Task Management</h2>
      <div class="flex gap-4">
        <input 
          v-model="newTask.name" 
          type="text" 
          placeholder="Task Name" 
          class="px-4 py-2 border border-gray-300 rounded-md w-full" 
        />
        <input 
          v-model="newTask.dueDate" 
          type="date" 
          class="px-4 py-2 border border-gray-300 rounded-md" 
        />
        <select 
          v-model="newTask.status" 
          class="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button 
          @click="addTask" 
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </div>
    </div>

    <!-- Task Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 border-b">Task Name</th>
            <th class="px-6 py-3 border-b">Due Date</th>
            <th class="px-6 py-3 border-b">Status</th>
            <th class="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td class="px-6 py-4 border-b">{{ task.name }}</td>
            <td class="px-6 py-4 border-b">{{ task.dueDate }}</td>
            <td class="px-6 py-4 border-b">{{ task.status }}</td>
            <td class="px-6 py-4 border-b">
              <button 
                @click="editTask(index)" 
                class="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button 
                @click="deleteTask(index)" 
                class="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      newTask: {
        name: '',
        dueDate: '',
        status: 'Pending'
      },
      tasks: [
        { name: 'Sample Task 1', dueDate: '2025-01-15', status: 'Pending' },
        { name: 'Sample Task 2', dueDate: '2025-01-16', status: 'In Progress' },
      ],
    };
  },
  methods: {
    // Method to add a new task to the table
    addTask() {
      if (this.newTask.name && this.newTask.dueDate) {
        this.tasks.push({ ...this.newTask });
        this.newTask.name = '';
        this.newTask.dueDate = '';
        this.newTask.status = 'Pending';
      } else {
        alert('Please fill out all fields.');
      }
    },

    // Method to delete a task
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },

    // Method to edit a task (opens input fields with existing data)
    editTask(index) {
      const task = this.tasks[index];
      this.newTask.name = task.name;
      this.newTask.dueDate = task.dueDate;
      this.newTask.status = task.status;
      this.deleteTask(index);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
