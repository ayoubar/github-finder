"use strict";

/*
    Endpoint  : https://api.github.com/
*/

/*
    https://api.github.com/search/users?q=ayoub
*/
var inputSearch = document.getElementById('search');
var form = document.querySelector('form');
console.log(inputSearch);
console.log(form);

function get_all_users_by_username(username) {
  var url, config, response, data;
  return regeneratorRuntime.async(function get_all_users_by_username$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "https://api.github.com/search/users?q=".concat(username);
          config = {
            method: 'GET'
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url, config));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function set_notification(class_background, message) {
  var elementToast = document.querySelector('.toast');
  var elementToastHeader = document.querySelector('.toast-header');
  var toastBody = document.querySelector('.toast-body');
  elementToast.classList.add(class_background);
  elementToastHeader.classList.add(class_background);
  toastBody.textContent = message;
  $('.toast').toast('show');
}

function display_users(users) {
  // le type du parameter `users` : tableau
  users.forEach(function (element) {
    var colmd4 = "\n    <div class=\"col-md-4 mb-3 mt-3\">\n      <div class=\"card\">\n      \n        <!-- Background color -->\n        <div class=\"card-up indigo lighten-1\"></div>\n      \n        <!-- Avatar -->\n        <div class=\"avatar mx-auto white\">\n          <img src=\"".concat(element.avatar_url, "\" class=\"rounded-circle\" style=\"width:110px; height:110px\"\n            alt=\"woman avatar\">\n        </div>\n      \n        <!-- Content -->\n        <div class=\"card-body\">\n          <!-- Name -->\n          <h4 class=\"card-title\">").concat(element.login, "</h4>\n          <hr>\n          <!-- Quotation -->\n          <a href=\"").concat(element.html_url, "\"><i class=\"fas fa-quote-left\"></i> Profile gihtub</p>\n        </div>\n      \n      </div>\n      </div>\n      ");
    document.getElementById('users-github').innerHTML += colmd4;
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault(); // recuperze la valeur de l'input `inputSearch`

  var valueSearch = inputSearch.value;

  if (valueSearch === '') {
    set_notification('bg-danger', 'Error ! Svp Remplit le formulaire');
  } else {
    // envoi la request vers l'API
    var users = get_all_users_by_username(valueSearch);
    users.then(function (d) {
      console.log(d.items);
      display_users(d.items);
    });
    set_notification('bg-success', 'Yes ! ');
  }
});