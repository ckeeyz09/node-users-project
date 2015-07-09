// CLIENT-SIDE JAVASCRIPT

$(function() {

  // `phrasesController` holds all our phrase funtionality
  var usersController = {}
    
    // compile user template
  template: _.template($('#user-template').html()),

    usersController.all = function() {
      $.get('/users', function(data) {
        var allUsers = data;
        
        // iterate through allPhrases
        _.each(allUsers, function(user) {
          // pass each phrase object through template and append to view
          var $userHtml = $(usersController.template(user));
          $('#user-list').append($userHtml);
        });
        // add event-handlers to phrases for updating/deleting
        usersController.addEventHandlers();
      });
    },

    usersController.create = function(newFirst, newLast, newAge) {
      $.ajax({
        type: 'POST',
        url: '/users/' + userId,
        data: {
          firstname: updatedFirst,
          lastname: updatedLast,
          age: updatedAge
        },
        success: function(data) {
          // pass phrase object through template and append to view
          var $userHtml = $(usersController.template(data));
          $('#user-list').append($userHtml);
        }
      });
    };


    usersController.update = function(userId, updatedFirst, updatedLast, updatedAge) {
      // send PUT request to server to update phrase
      $.ajax({
        type: 'PUT',
        url: '/users/' + userId,
        data: {
          firstname: updatedFirst,
          lastname: updatedLast,
          age: updatedAge
        },
        success: function(data) {
          // pass phrase object through template and append to view
          var $userHtml = $(usersController.template(data));
          $('#user-' + userId).replaceWith($userHtml);
        }
      });
    };

    usersController.delete = function(userId) {
    // send DELETE request to server to delete phrase
      $.ajax({
       type: 'DELETE',
       url: '/users/' + userId,
       success: function(data) {
        // remove deleted phrase li from the view
        $('#user-' + userId).remove();
       }
      });
    }

    // add event-handlers to phrases for updating/deleting
    usersController.addEventHandlers = function () {
      // for update: submit event on `.update-phrase` form

      // for delete: click event on `.delete-phrase` button
    },

    usersController.setupView = function() {
      // append existing phrases to view
      usersController.all();
      
      // add event-handler to new-phrase form
      $('#new-user').on('submit', function(event) {
        event.preventDefault();
        var newFirstname = $('#new-firstname').val();
        var newLastname = $('#new-lastname').val();
        var newAge = $('#new-age').val();
        usersController.create(newFirstname, newLastname, newAge);
        
        // reset the form
        $(this)[0].reset();
        $('#new-user').focus();
      });
    }
  

  usersController.setupView();

});