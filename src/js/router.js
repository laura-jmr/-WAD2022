/**
 * Define Globals
 */

/**
 * Give Element that should be visible and an init function to do some stuff when page loads
 */
window.pages = {
    login: {
        element: document.getElementById('login'), init: function () {
            console.log('Routed to login Page')
        }
    },
    main: {
        element: document.getElementById('main'), init: function () {
            console.log('Routed to main Page')
            renderAddressBook();
        }
    },
    add: {
        element: document.getElementById('add'), init: function () {
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
