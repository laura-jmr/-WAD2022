/**
 * Define Globals
 */

// store current loggedIn User
window.currentUser = null;


/**
 * Login
 * */


const loginForm = document.getElementById('loginForm');
const loginErrorResponseField = document.getElementById('login-error-response');


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const loginStatus = await check_login();
    console.log('Login Status (false = falsch, user object = success)', loginStatus);
    // if login is ok
    if (loginStatus) {
        window.currentUser = loginStatus;
        document.getElementById("greetingHeader").innerHTML = window.currentUser.username;
        if(getCurrentRole() != 1) {
            document.getElementById("AddButtonMain").style.display = "none";
        }
        routeTo('main');
        return;
    }
    alert("Wrong login, try again");
    loginErrorResponseField.innerText = "Wrong login, try again."
    return false;
})

async function check_login() {
    const form_data = new FormData(loginForm);
    console.log(form_data.get("password"), form_data.get("username"));
    return await window.apiClient.user.login(form_data.get("username") ,form_data.get("password"))
}

function logout() {
    window.currentUser = null;
    //routeTo('login')
    location.reload();
}

/**
 * return 1 for admin and 0 for guest and -1 for not loggedIn
 */
function getCurrentRole() {
    if (window.currentUser.role === 'guest') {
        return 0;
    }
    if (window.currentUser.role === 'admin') {
        return 1;
    }
    return -1;
}

function cancel_login() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}
