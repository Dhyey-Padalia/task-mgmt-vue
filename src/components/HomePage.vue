<template>
  <div class="container items-center justify-between w-auto mx-auto p-6 px-2">
    <NavBar
      @filter-tasks="filterByStatus"
      @search-tasks="searchTasks"
      @urgent-task="filterurgenttask"
      :urgentTaskCount="urgentTaskCount"
    />
    <div class="mb-10 pt-8 px-8 text-center justify-items-center ">
      <a onclick="window.location.reload();"
        ><h2 class="text-3xl font-bold text-center mb-4">
          Task Management Application
        </h2></a
      >
      <div class="flex gap-10 flex-wrap justify-center">
        <input
          v-model="newTask.name"
          type="text"
          placeholder="Task Name"
          class="px-4 py-2 border border-gray-300 rounded-md justify-center"
        />
        <input
          v-model="newTask.dueDate"
          type="date"
          class="px-4 py-2 border border-gray-300 rounded-md"
        />
        <select
          v-model="newTask.status"
          class="px-4 py-2 border border-gray-300 rounded-md object-right"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          @click="addTask"
          class="bg-green-600 text-white px-4 py-2 rounded-md"
          style="width: 10em auto; max-height: 5em auto"
        >
          Add Task
        </button>
      </div>
    </div>
    <div class="flex flex-wrap ">
      <table
        class="min-w-full table-auto border-collapse flex-wrp justify-center text-center "
      >
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 border-b">Task Name</th>
            <th class="px-6 py-3 border-b">Due Date</th>
            <th class="px-6 py-3 border-b">Status</th>
            <th class="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(task, index) in filteredTasks" :key="index">
            <td class="px-6 py-4 border-b">{{ task.name }}</td>
            <td class="px-6 py-4 border-b">{{ task.dueDate }}</td>
            <td class="px-6 py-4 border-b">{{ task.status }}</td>
            <td class="px-6 py-4 border-b flex flex-wra gap-2 justify-center place-items-center">
              <button
                @click="editTask(index)"
                class="bg-yellow-500 text-white px-4 py-2 rounded-md mr-6"
              >
                Edit
              </button>
              <button
                @click="deleteTask(index)"
                class="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="!filteredTasks.length">
            <td colspan="4" class="text-center py-4">No tasks available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
  },
  data() {
    return {
      newTask: {
        name: "",
        dueDate: "",
        status: "Pending",
      },
      tasks: [
        {
          name: "Requirement gathering",
          dueDate: "2025-01-01",
          status: "Completed",
        },
        {
          name: "Planning",
          dueDate: "2025-01-12",
          status: "Completed"
        },
        {
          name: "Front-end Development",
          dueDate: "2025-01-15",
          status: "In Progress",
        },
        {
          name: "Back-end Development",
          dueDate: "2025-01-15",
          status: "In Progress",
        },
        {
          name: "Testing",
          dueDate: "2025-01-16",
          status: "Pending"
        },
        {
          name: "Deployment",
          dueDate: "2025-01-31",
          status: "Pending"
        },
        {
          name: "Maintenance",
          dueDate: "2026-12-31",
          status: "Pending"
        },
      ],
      selectedStatus: "",
      searchQuery: "",
      filterurg: "",
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) => {
        const currentDate = new Date();
        const twoDaysFromNow = new Date(currentDate);
        twoDaysFromNow.setDate(currentDate.getDate() + 2);
        const taskDueDate = new Date(task.dueDate);
        const godfilter = this.filterurg
          ? task.status === "Pending" &&
            taskDueDate >= currentDate &&
            taskDueDate <= twoDaysFromNow
          : true;
        const matchesStatus = this.selectedStatus
          ? task.status === this.selectedStatus
          : true;
        const matchesSearch = this.searchQuery
          ? task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;
        return matchesStatus && matchesSearch && godfilter;
      });
    },
    urgentTaskCount() {
      const currentDate = new Date();
      const twoDaysFromNow = new Date(currentDate);
      twoDaysFromNow.setDate(currentDate.getDate() + 2);
      return this.tasks.filter((task) => {
        const taskDueDate = new Date(task.dueDate);
        return (
          task.status === "Pending" &&
          taskDueDate >= currentDate &&
          taskDueDate <= twoDaysFromNow
        );
      }).length;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.name && this.newTask.dueDate) {
        this.tasks.push({ ...this.newTask });
        this.newTask.name = "";
        this.newTask.dueDate = "";
        this.newTask.status = "Pending";
      } else {
        alert("Please fill out all fields.");
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index) {
      const task = this.tasks[index];
      this.newTask = { ...task };
      this.deleteTask(index);
    },
    filterByStatus(status) {
      this.selectedStatus = status;
    },
    searchTasks(query) {
      this.searchQuery = query;
    },
    filterurgenttask(dueDate) {
      this.filterurg = dueDate;
    },
  },
};
</script>
