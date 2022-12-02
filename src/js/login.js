/**
 * Define Globals
 */

// store current loggedIn User
window.currentUser = null;


/**
 * Login
 * */

const login_data = {
    admin: {
        name: 'admina',
        password: "password"
    },
    guest: {
        name: 'guest',
        password: "1"
    }
}

const loginForm = document.getElementById('loginForm');
const loginErrorResponseField = document.getElementById('login-error-response');


loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const loginStatus = check_login();
    console.log('Login Status (false = falsch, user object = success)', loginStatus);
    // if login is ok
    if (loginStatus) {
        window.currentUser = loginStatus;
        routeTo('main');
        return;
    }
    alert("Wrong login, try again");
    loginErrorResponseField.innerText = "Wrong login, try again."
    return false;
})

function check_login() {
    const form_data = new FormData(loginForm);
    console.log(form_data.get("password"), form_data.get("username"));
    const users = Object.values(login_data);

    for (let i = 0; i < users.length; i++) {
        if (form_data.get("username") === users[i].name) {
            if (form_data.get("password") === users[i].password) {
                return users[i].name;
            }
        }
    }
    return false;
}

function logout() {
    window.currentUser = null;
    routeTo('login')
}

/**
 * return 1 for admin and 0 for guest and -1 for not loggedIn
 */
function getCurrentRole() {
    if (window.currentUser === 'guest') {
        return 0;
    }
    if (window.currentUser === 'admina') {
        return 1;
    }
    return -1;
}

/**
 * block guest from add/editing
 */
function blockGuestFromAddEdit(){
    if (window.currentUser === 'guest'){
        document.getElementById('addButton').style.display = 'none'
    }
}
