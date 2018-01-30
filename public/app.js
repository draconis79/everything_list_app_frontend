console.log('app.js working');
const app = angular.module('MyListApp', []);

app.controller('MainController', ['$http', function ($http) {
  this.url = 'http://localhost:3000'
  this.addForm = true;


  // ========================
  // GET Route
  // ========================

  this.getLists = () => {
    $http({
      url: this.url + '/lists',
      method: 'GET'
    }).then(response => {
      this.lists = response.data
    }, error => {
      // console.log(error.message);
    }).catch(err => console.log(err))
  }

  this.getLists();

  // ==============
  // CREATE Route
  // ==============

  this.createForm = {}

  this.processCreateForm = () => {
    console.log('===');
    $http({
      url: this.url + '/lists',
      method: 'POST',
      data: this.createForm
    }).then(response => {
      this.lists.push(response.data);
      this.createForm = {};
    }).catch(err => console.log('Catch', err))
  }

  // ==============
  // UPDATE Route
  // ==============

  this.createForm = {}

  this.processEditForm = (list) => {
    console.log(list);
    $http({
      url: this.url + '/lists/' + list.id,
      method: 'PUT',
      data: this.createForm
    }).then(response => {
      this.getLists();
      this.createForm = {};
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  // ==============
  // DELETE Route
  // ==============

  this.deleteList = (id) => {
    $http({
      url: this.url + '/lists/' + id,
      method: 'DELETE'
    }).then(response => {
      this.getLists();
    }, error => {
      console.log(error.message);
    }).catch(err => console.log(err))
  }

  // // ========================
  // // subjects starts here
  // // ========================
  //
  //
  // // ========================
  // // GET Route Subject
  // // ========================
  //
  // this.getSubjects = () => {
  //   $http({
  //     url: this.url + '/subjects'
  //     method: 'GET'
  //   }).then(response => {
  //     this.subjects = response.data
  //   }, error => {
  //     // console.log(error.message);
  //   }).catch(err => console.log(err))
  // }
  //
  // this.getSubjects();

  // // ==============
  // // CREATE Route
  // // ==============
  //
  // this.createForm = {}
  //
  // this.processCreateForm = () => {
  //   console.log('===');
  //   $http({
  //     url: this.url + '/lists',
  //     method: 'POST',
  //     data: this.createForm
  //   }).then(response => {
  //     this.lists.push(response.data);
  //     this.createForm = {};
  //   }).catch(err => console.log('Catch', err))
  // }
  //
  // // ==============
  // // UPDATE Route
  // // ==============
  //
  // this.createForm = {}
  //
  // this.processEditForm = (list) => {
  //   console.log(list);
  //   $http({
  //     url: this.url + '/lists/' + list.id,
  //     method: 'PUT',
  //     data: this.createForm
  //   }).then(response => {
  //     this.getLists();
  //     this.createForm = {};
  //   }, error => {
  //     console.log(error.message);
  //   }).catch(err => console.log(err))
  // }
  //
  // // ==============
  // // DELETE Route
  // // ==============
  //
  // this.deleteList = (id) => {
  //   $http({
  //     url: this.url + '/lists/' + id,
  //     method: 'DELETE'
  //   }).then(response => {
  //     this.getLists();
  //   }, error => {
  //     console.log(error.message);
  //   }).catch(err => console.log(err))
  // }

}]);

// ======================
// ratings.ejs functions
// ======================

function openNav() {
  document.getElementById("mySidenav").style.width = "500px";
}
function openNavLogin() {
  document.getElementById("mySidenavLogin").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function closeNavLogin() {
  document.getElementById("mySidenavLogin").style.width = "0";
}
