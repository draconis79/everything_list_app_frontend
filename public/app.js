console.log('app.js');

const app = angular.module('EverythingListApp', []);

app.controller('MainController', ['$http', function($http) {

  this.list.categories = [];
  this.list.items = [];
  this.users = [];
  this.url = 'http://localhost:3000/list_categories';
  this.userPass = {};
  this.user = {};
  this.loggedIn = false;
  this.formdata = {};


  // log in function
   this.login = (userPass) => {
     $http({
       method: 'POST',
       url: this.url + '/users/login',
       data: {
         user: {
           username: userPass.username,
           password: userPass.password
         }
       },
     }).then(response => {
       this.user = response.data.user;
       localStorage.setItem('token', JSON.stringify(response.data.token));
       this.loggedIn = true;
     });
   }

   //REGISTER//
   this.register = (regData) => {
      $http({
        method: 'POST',
        url: this.url + '/users/create',
        data: { user: { username: regData.username, password: regData.password
        }}
      }).then(response => {
        this.user = response.data.user;
        this.logged = true;
        this.clickedLog = false;
        localStorage.setItem('token', JSON.stringify(response.data.token));
      });
    }

   //LOGOUT//
   this.logout = ()=> {
     localStorage.clear('token');
     location.reload();
     this.loggedIn = false;
     this.user = {};
     console.log('this.user:', this.user);
   }

   //ALL CATEGORY LISTS
   this.getAllLists = () => {
     $http({
       method: 'GET',
       url: this.url + '/list_categories',
     }).then(response => {
       this.list_categories = response.data;
     }).catch(reject => {
       console.log('reject: ', reject);
     });
   }

   this.getAllLists();


   this.getUser = (id) => {
       $http({
         url: this.url + '/users/' + id + '/list_categories',
         method: "GET"
       }).then(response => {
         this.oneUser = response.data;
         this.oneUser_id = id;
         console.log('this.oneUser:', this.oneUser);
         this.getTask(this.oneUser_id);
       }).catch(reject => {
         console.log('reject: ', reject);
       });
     }

     //DELETE LIST CATEGORY
     this.delete = (id) => {
       $http({
         url: this.url + "/list_categories/" + id,
         method: "DELETE"
       }).then(response => {
         this.list_categories.splice(response.data, 1);
         this.getUser(this.oneUser_id);
         this.getAllLists();
       }).catch(reject => {
         console.log('reject: ', reject);
       });
     }

     //CREATE LIST CATEGORY
       this.createList = (list_id, user_id) => {
         console.log("list id: " + list_id + " user id: " + user_id);
         this.newCategory = {
           user_id: user_id,
           list_item_id: list_id
         };
         $http({
           method: 'POST',
           url: this.url + "/list_categories",
           data: this.newCategory
         }).then(response => {
           this.list_categories.push(response.data)
           this.getAllLists();
         }).catch(error => {
           console.log('error:', error);
         });
       }


       //CREATE LIST ITEM
       this.processForm = () => {
         $http({
           method: 'POST',
           url: this.url + "/list_items",
           data: this.formdata
         }).then(response => {
           this.list = response.data;
           this.list_items.unshift(this.list);
           this.createList(this.list.id, this.user.id)
           this.formdata = {}
           console.log('this.list:', this.list);
         }).catch(error => {
           console.log('error:', error);
         });
       }

}]);
