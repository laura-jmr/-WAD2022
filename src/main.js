const login_data = {admin: {name: 'admina', password: "password"},
                    guest: {name: 'guest', password: "password"}}

function check_login(){
    const form = document.getElementById("login");
    const form_data = new FormData(form);
    //console.log(form_data.get("password"), form_data.get("username"));
    const users = Object.values(login_data);

    for (let i = 0; i < users.length; i++){
        if (form_data.get("username") == users[i].name){
            if (form_data.get("password") == users[i].password){
                return users[i].name;
            };
            return "false password";
        };
    };
    return null;
}

window.onload = function() {
    document.getElementById("main").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("update-delete").style.display = "none";
  };