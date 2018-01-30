console.log('app.js');

const app = angular.module('EverythingListApp', []);

app.controller('MainController', ['$http', function($http) {

  this.list_categories = [];
  this.list_category = {};
  this.list_item = [];
  this.list_items = {};
  this.users = [];
  this.user = {};
  this.url = 'http://localhost:3000/list_categories';
  this.userPass = {};
  this.loggedIn = false;
  this.formdata = {};
  this.showOne = false;
  this.showEdit = 0;


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



     //CREATE LIST CATEGORY
     this.createList_Item = () => {
   $http({
     method: 'POST',
     url: this.url + "list_categories/" + this.list_category.id + '/list_items',
     data: this.createForm
   }).then((response) => {
     console.log("New task:", response.data);
     this.list_item = response.data;
     this.list_items.unshift(this.list_item);
   }).catch((err) => {
     console.log("Error:", err);
   })};


       //CREATE LIST ITEM
       this.processForm = () => {
         $http({
           method: 'POST',
           url: this.url + "/list_items",
           data: this.formdata
         }).then(response => {
           this.list = response.data;
           this.list_items.unshift(this.list);
           this.createList(this.list_item.id, this.user.id)
           this.formdata = {}
           console.log('this.list:', this.list_item);
         }).catch(error => {
           console.log('error:', error);
         });
       }

      //EDIT LIST ITEM
       this.editList_Item = (list_item) => {
         this.list_item = list_item;
         console.log(this.list_item);
         console.log("Edit button works");
         $http({
           method: 'PUT',
           url: this.url + "list_categories/" + this.list_category.id + '/list_items/' + this.list_item.id,
           data: this.editForm
         }).then((response) => {
           console.log("Edited list_item:", response.data);
           this.list_item = response.data;
         }).catch((err) => {
           console.log("Error:", err);
         })};

         this.showThisEdit = (list_item) => {
           this.editForm = {};
           this.showEdit = list_item.id;
         };

       //DELETE LIST CATEGORY
       this.deleteList_Item = (list_itemToDelete) => {
          $http({
            method: 'DELETE',
            url: this.url + "list_categories/" + this.list_category.id + '/list_items/' + list_itemToDelete.id
          }).then((response) => {
            const list_itemIndex = this.list_items.findIndex(list_item => this.list_item.id === list_itemToDelete.id);
            this.list_items.splice(list_itemIndex, 1);
          }).catch((err) => {
            console.log("Error:", err);
          })};

}]);
