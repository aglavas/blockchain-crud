<template>
  <div>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Crud</h1>
          <hr>
          <h2>Create user</h2>
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="create.name" id="name" type="text" class="form-control">
            <ValidationErrors :errors="errors.create"></ValidationErrors>
          </div>
          <button @click="createUser" class="btn btn-primary">Submit</button>
          <p id="create-result"> {{ create.result}} </p>
          <hr>
          <h2>Read user</h2>
          <div class="form-group">
            <label for="read-id">Id</label>
            <input v-model="read.id" id="read-id" type="number" class="form-control">
            <ValidationErrors :errors="errors.read"></ValidationErrors>
          </div>
          <button @click="readUser" class="btn btn-primary">Submit</button>
          <p id="read-result"> {{ read.result }}</p>
          <hr>
          <h2>Update user</h2>
          <div class="form-group">
            <label for="edit-id">Id</label>
            <input v-model="update.id" id="edit-id" type="number" class="form-control">
            <label for="edit-name">Name</label>
            <input v-model="update.name" id="edit-name" type="text" class="form-control">
            <ValidationErrors :errors="errors.update"></ValidationErrors>
          </div>
          <button @click="updateUser" type="submit" class="btn btn-primary">Submit</button>
          <p id="edit-result"> {{ update.result }} </p>
          <hr>
          <h2>Delete user</h2>
          <div class="form-group">
            <label for="delete-id">Id</label>
            <input v-model="deleteData.id" id="delete-id" type="number" class="form-control">
            <ValidationErrors :errors="errors.delete"></ValidationErrors>
          </div>
          <button @click="deleteUser" class="btn btn-primary">Submit</button>
          <p id="delete-result"> {{ deleteData.result }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrudManager from './models/crudManager.js'
import ValidationErrors from './components/ValidationErrors.vue'

export default {
  name: 'App',
  components: {
    ValidationErrors
  },
  data() {
    return {
      errors: {
        create: [],
        read: [],
        update: [],
        delete: []
      },
      crudManager: null,
      create: {
        name: null,
        result: null
      },
      read: {
        id: null,
        result: null
      },
      update: {
        id: null,
        name: null,
        result: null
      },
      deleteData: {
        id: null,
        result: null
      }
    }
  },
  async mounted() {
    this.crudManager = CrudManager;  
  },
  methods: {
    async createUser() {
      this.errors.create = [];
      this.create.result = null;

      if (!this.create.name) {
        this.errors.create.push("Please fill out the new user name");
        return true;
      }

      const resultPromise = this.crudManager.create(this.create.name);
      resultPromise.then(() => {
        this.create.result = `New user ${this.create.name} successfully created`;
      }).catch(() => {
        this.create.result = `Error while trying to create a new user.`; 
      });
    },
    async readUser() {
      this.errors.read = [];
      this.read.result = null;

      if (!this.read.id) {
        this.errors.read.push("Please fill out the users id");
        return true;
      }

      const resultPromise = this.crudManager.read(this.read.id);
      resultPromise.then(result => {
        this.read.result = `Id: ${result[0]} Name: ${result[1]}`;
      }).catch(() => {
        this.read.result = `Error while trying to read user.`; 
      });
    },
    async updateUser() {
      this.errors.update = [];
      this.update.result = null;

      if (!this.update.id) {
        this.errors.update.push("Please fill out the users id");
        return true;
      }

      if (!this.update.name) {
        this.errors.update.push("Please fill out the users name");
        return true;
      }

      const resultPromise = this.crudManager.update(this.update.id, this.update.name);
      resultPromise.then(() => {
        this.update.result = `Changed name of user ${this.update.id} to ${this.update.name}`;
      }).catch(() => {
        this.update.result = `Error while trying to update name of user ${this.update.id} to ${this.update.name}.`; 
      });
    },
    async deleteUser() {
      this.errors.delete = [];
      this.deleteData.result = null;

      if (!this.deleteData.id) {
        this.errors.delete.push("Please fill out the users id");
        return true;
      }

      const resultPromise = this.crudManager.delete(this.deleteData.id);
      resultPromise.then(() => {
        this.deleteData.result = `Deleted user ${this.deleteData.id}`;
      }).catch(() => {
        this.deleteData.result = `Error while trying to delete the user with id ${this.deleteData.id}.`; 
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
