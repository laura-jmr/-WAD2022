/**
 * Define Globals
 */

/**
 * Give Element that should be visible and an init function to do some stuff when page loads
 */
window.pages = {
    login: {
        element: document.getElementById('login'), init: function () {
            document.getElementById('footerContainer').style.display = '';
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            console.log('Routed to login Page')
        }
    },
    main: {
        element: document.getElementById('main'), init: function () {
            document.getElementById('footerContainer').style.display = '';
            console.log('Routed to main Page')
            renderAddressBook();
        }
    },
    add: {
        element: document.getElementById('addPopUp'), init: function () {
            document.getElementById('addPopUp').style.zIndex = 99999;
            document.getElementById('main').style.display = '';
            console.log('Routed to Add/Edit/Overview Page')

        }
    },
    edit: {
        element: document.getElementById('editPopUp'), init: function () {
            document.getElementById('editPopUp').style.zIndex = 99999;
            document.getElementById('main').style.display = '';
            console.log('Routed to Add/Edit/Overview Page')

        }
    },
};


/**
 * Router
 * */
function routeTo(routeToPageName) {
    for (const [pageName, pageObject] of Object.entries(pages)) {
        if (pageName === routeToPageName) {
            pageObject.element.style.display = '';
            pageObject.init();

        } else {
            pageObject.element.style.display = 'none';
        }
    }
}
