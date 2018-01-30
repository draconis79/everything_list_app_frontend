console.log('app.js');

const app = angular.module('EverythingListApp', []);

  app.controller('MainController', ['$http', function($http) {

  this.test = 'test';
  this.lists = [];
  this.list = {};
  this.showOne = false;
  this.showEdit = 0;
  this.task = {};
  this.tasks = [];
  this.url = 'http://localhost:3000/lists'

    $http({
      method: 'GET',
      url: this.url + 'lists'
    }).then((response) => {
      console.log("Response:", response.data);
      this.lists = response.data;
    }).catch((err) => {
      console.log("Error:", err);
    });

    this.listShow = (list) => {
      this.showOne = !this.showOne;
      this.list = list;
      console.log("list:", list);
    };

    this.createTask = () => {
      $http({
        method: 'POST',
        url: this.url + "lists/" + this.list.id + '/tasks',
        data: this.createForm
      }).then((response) => {
        console.log("New task:", response.data);
        this.task = response.data;
        this.tasks.unshift(this.task);
      }).catch((err) => {
        console.log("Error:", err);
      })};

    this.editTask = (task) => {
      this.task = task;
      console.log(this.task);
      console.log("Edit button works");
      $http({
        method: 'PUT',
        url: this.url + "lists/" + this.list.id + '/tasks/' + this.task.id,
        data: this.editForm
      }).then((response) => {
        console.log("Edited task:", response.data);
        this.task = response.data;
      }).catch((err) => {
        console.log("Error:", err);
      })};

      this.showThisEdit = (task) => {
        this.editForm = {};
        this.showEdit = task.id;
      };

      this.deleteTask = (taskToDelete) => {
        console.log("Deleting:", taskToDelete.id);
        $http({
          method: 'DELETE',
          url: this.url + "lists/" + this.list.id + '/tasks/' + taskToDelete.id
        }).then((response) => {
          const taskIndex = this.tasks.findIndex(task => this.task.id === taskToDelete.id);
          this.tasks.splice(taskIndex, 1);
        }).catch((err) => {
          console.log("Error:", err);
        })};


}]);
