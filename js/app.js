/*
    Endpoint  : https://api.github.com/
*/

/*
    https://api.github.com/search/users?q=ayoub
*/

const inputSearch = document.getElementById('search');
const form = document.querySelector('form');

console.log(inputSearch);
console.log(form);

async function get_all_users_by_username(username) {
  const url = `https://api.github.com/search/users?q=${username}`;
  const config = {
    method: 'GET',
  };
  const response = await fetch(url, config);
  const data = await response.json();

  return data;
}

function set_notification(class_background, message) {
  const elementToast = document.querySelector('.toast');
  const elementToastHeader = document.querySelector('.toast-header');
  const toastBody = document.querySelector('.toast-body');

  elementToast.classList.add(class_background);
  elementToastHeader.classList.add(class_background);
  toastBody.textContent = message;

  $('.toast').toast('show');
}

function display_users(users) {
  // le type du parameter `users` : tableau

  users.forEach((element) => {
    const colmd4 = `
    <div class="col-md-4 mb-3 mt-3">
      <div class="card">
      
        <!-- Background color -->
        <div class="card-up indigo lighten-1"></div>
      
        <!-- Avatar -->
        <div class="avatar mx-auto white">
          <img src="${element.avatar_url}" class="rounded-circle" style="width:110px; height:110px"
            alt="woman avatar">
        </div>
      
        <!-- Content -->
        <div class="card-body">
          <!-- Name -->
          <h4 class="card-title">${element.login}</h4>
          <hr>
          <!-- Quotation -->
          <a href="${element.html_url}"><i class="fas fa-quote-left"></i> Profile gihtub</p>
        </div>
      
      </div>
      </div>
      `;

    document.getElementById('users-github').innerHTML += colmd4;
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // recuperze la valeur de l'input `inputSearch`
  const valueSearch = inputSearch.value;

  if (valueSearch === '') {
    set_notification('bg-danger', 'Error ! Svp Remplit le formulaire');
  } else {
    // envoi la request vers l'API
    const users = get_all_users_by_username(valueSearch);
    users.then((d) => {
      console.log(d.items);
      display_users(d.items);
    });
    set_notification('bg-success', 'Yes ! ');
  }
});
