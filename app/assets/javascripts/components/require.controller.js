var page = window.location.pathname;
var page = page.substr(10, page.length).split('/');
require(['jQuery', 'session', 'modal']);
switch(page[0]) {
    case 'users' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete', 'listUser'], function() {
                list.field.field = 'username';
                list.init("list.do", ["username", "fullname", "roles", "enable"]);
                list.del(['user', 'users']);
                list.sort();
                list.search();
                list.activatePagination();
                sidebar.init('users');
            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar', 'select', 'formUsers', 'checkbox'], function() {
                checkbox.init(true);
                sidebar.init('users');
            });
        }
        break;
    case 'roles' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'listRole', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete'], function() {
                list.field.field = 'lastModified';
                list.init("list.do", ["name", "assignedUsers", "lastModified"]);
                list.del(['role', 'roles']);
                list.sort();
                list.search();
                list.activatePagination();
                sidebar.init('roles');
            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar', 'validation', 'formRole', 'checkbox'], function() {
                checkbox.init(true);
                sidebar.init('roles');
            });
        }
        break;
    case 'groups' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'listGroup', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete'], function() {
                list.field.field = 'lastModified';
                list.init("list.do", ["name", "studentsNumber", "trainer", "lastModified"]);
                list.del(['group', 'groups']);
                list.sort();
                list.search();
                list.activatePagination();
                sidebar.init('groups');
            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar',  'formGroup', 'checkbox'], function() {
                checkbox.init(true);
                sidebar.init('groups');
            });
        }
        break;
    case 'logs' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'select', 'datepicker', 'listLog', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-logType', 'list-logDate' ], function() {
                list.field.field = 'username';
                list.init("list.do", ["eventId", "username", "customer", "type", "created"]);
                list.sort();
                list.search();
                list.logType();
                list.logFilterDate();
                list.activatePagination();
                sidebar.init('logs');
            });
        }
        break;
    case 'capabilities' :
        if (!page[1]) {
            require(['jQuery', 'sidebar', 'showCapabilities', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete'], function() {
                list.init("list.do", ["name", "object", "date"]);
                list.del(['capabilitiy', 'capabilities']);
                list.sort();
                list.search();
                list.search();
                list.activatePagination();
                sidebar.init('capabilities');
            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar', 'validation', 'select', 'formCapabilities', 'checkbox'], function() {
                checkbox.init();
                sidebar.init('capabilities');
            });
        }
        break;
    case 'profiles' :
        if (page[1] === 'view') {
            require(['jQuery', 'bootstrap', 'select', 'sidebar', 'showProfiles', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-group'], function() {
                list.init("showProfiles.do", ["fullname", "trainer", "status"]);
                list.sort();
                list.search();
                list.search();
                list.group();
                list.activatePagination();
                sidebar.init('profiles/view');
            });
        } else if (page[1] === 'template') {
            require(['jQuery', 'bootstrap', 'sidebar', 'select', 'profileTemplate'], function() {
                sidebar.init('profiles/template');
                lists.init();
            });
        } else if (page[1] === 'edit') {
            require(['jQuery', 'bootstrap', 'select', 'sidebar', 'formProfiles', 'showTech'], function() {
                sidebar.init('profile/edit');
                lists.init();
            });
        }
        break;
    case 'blocks' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'showBlocks', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete'], function() {
                list.init("list.do", ["name", "type", "mutable", "date"]);
                list.del(['block', 'blocks']);
                list.sort();
                list.search();
                list.search();
                list.activatePagination();
                sidebar.init('blocks');

            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar', 'formBlocks', 'checkbox'], function() {
                checkbox.init();
                sidebar.init('blocks');
            });
        }
        break;
    case 'customers' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'showCustomers', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete'], function() {
                list.field.field = 'title';
                list.init("list.do", ["name", "active"]);
                list.del(['customer', 'customers']);
                list.sort();
                list.search();
                list.search();
                list.activatePagination();
                sidebar.init('customers');
            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar', 'formCustomer'], function() {
                sidebar.init('customers');
            });
        }
        break;
    case 'pages' :
        if (!page[1]) {
            require(['jQuery', 'bootstrap', 'sidebar', 'showPages', 'checkbox', 'list', 'list-pagination', 'list-sort', 'list-search', 'list-delete'], function() {
                list.field.field = 'title';
                list.init("list.do", ["name", "published", "date"]);
                list.del(['page', 'pages']);
                list.sort();
                list.search();
                list.search();
                list.activatePagination();
                sidebar.init('pages');
            });
        } else {
            require(['jQuery', 'bootstrap', 'sidebar', 'formPages', 'checkbox'], function() {
                checkbox.init();
                sidebar.init('pages');
            });
        }
        break;
    case 'competences' :
        require(['jQuery', 'bootstrap', 'sidebar', 'masked', 'showCompetences', 'select'], function() {
            sidebar.init('competences');
            $.mask.definitions['h'] = "[-A-Za-z0-9 \.,:;_]";
            util.init();
        });
        break;
    case 'dashboard' :
	if (!page[1]) {
          require(['sidebar'], function() {
            sidebar.init('dashboard');
         });
	} else {
	     if (page[1] === 'edit' && !page[2]){
   		require(['sidebar','select',  'formPersonalData'], function() {
                  sidebar.init('dashboard/edit');
                });
	    }
	    if (page[1] === 'edit' && page[2]==='password'){
 		require(['sidebar', 'formPassword'], function() {
                  sidebar.init('dashboard/edit');
               });
	   }
	}
	break;
    case 'companyinfo' :
        if (page[1] === 'view') {
            require(['jQuery', 'sidebar'], function() {
                sidebar.init('companyinfo/view');
            });
        } else if (page[1] === 'edit') {
            require(['sidebar', 'formCustomer', 'modal'], function() {
                sidebar.init('companyinfo/view');
            });
        }
        break;
}

require.config({
    baseUrl : '/rms-info/static/jscript',
    paths : {
        /*libs*/
        'jQuery' : ['libs/jquery-1.9.1.min'],
        'bootstrap' : ['libs/bootstrap.min'],
        'select' : ['plugins/bootstrap-select'],

        /*moduls*/
        'list' : ['components/listBuilder'],
        'list-pagination' : ['components/pagination'],
        'list-sort' : ['components/sort'],
        'list-search' : ['components/search'],
        'list-group' : ['components/group'],
        'list-logType' : ['components/logType'],
        'list-logDate' : ['components/logFilterDate'],
        'list-delete' : ['components/delete'],
        'checkbox' : ['components/checkbox'],
        'sidebar' : ['components/sidebar'],
        'modal' : ['plugins/multiModal'],
        'validation' : ['scripts/commonValidation'],
        'masked' : ['libs/jquery.maskedinput-1.3.1.min'],
        'session' : ['scripts/sessionHandler'],
        'wysiwyg' : ['plugins/bootstrap-wysiwyg'],
        'hotkeys' : ['plugins/jquery.hotkeys'],
        'datepicker' : ['plugins/bootstrap-datepicker'],

        /*pages*/
        'listUser' : ['scripts/listUser'],
        'listRole' : ['scripts/listRole'],
        'listGroup' : ['scripts/listGroup'],
        'listLog' : ['scripts/listLog'],
        'profileTemplate' : ['scripts/showProfCompetences'],
        'showBlocks' : ['scripts/showBlocks'],
        'showProfiles' : ['scripts/showProfiles'],
        'showCustomers' : ['scripts/showCustomer'],
        'showCapabilities' : ['scripts/showCapability'],
        'showPages' : ['scripts/showPages'],
        'showCompetences' : ['scripts/showCompetences'],
        'formCustomer' : ['scripts/formCustomer'],
        'formPages' : ['scripts/formPages'],
        'formProfiles' : ['scripts/formProfiles'],
        'formCapabilities' : ['scripts/formCapabilities'],
        'formBlocks' : ['scripts/formBlock'],
        'formUsers' : ['scripts/formUser'],
        'formRole' : ['scripts/formRole'],
        'formGroup' : ['scripts/formGroup'],
 	'formPersonalData' : ['scripts/formPersonalData'],
	'formPassword' : ['scripts/formPassword'],
	'showTech' : ['scripts/showTechProfileCompetences']
    },
    shim : {
        'list' : {
            deps : ['checkbox']
        },
        'list-pagination' : {
            deps : ['list']
        },
        'list-sort' : {
            deps : ['list']
        },
        'list-search' : {
            deps : ['list']
        },
        'list-delete' : {
            deps : ['list']
        },
        'list-group' : {
            deps : ['list']
        },
        'list-logType' : {
            deps : ['list']
        },
        'list-logDate' : {
            deps : ['list']
        },
        'session' : {
            deps : ['jQuery', 'modal']
        },
        'modal' : {
            deps : ['jQuery', 'bootstrap']
        },
        'bootstrap' : {
            deps : ['jQuery']
        },
        'masked' : {
            deps : ['jQuery']
        },
        'wysiwyg' : {
            deps : ['jQuery', 'bootstrap', 'hotkeys']
        },
        'hotkeys' : {
            deps : ['jQuery', 'bootstrap']
        },
        'select' : {
            deps : ['jQuery', 'bootstrap']
        },
        'showProfiles' : {
            deps : ['jQuery', 'select']
        },
        'showCompetences' : {
            deps : ['jQuery']
        },
        'formUsers' : {
            deps : ['jQuery', 'bootstrap', 'select', 'validation']
        },
        'showCapabilities' : {
            deps : ['jQuery', 'bootstrap']
        },
        'formCapabilities' : {
            deps : ['jQuery', 'bootstrap', 'select', 'validation']
        },
        'formRoles' : {
            deps : ['jQuery', 'bootstrap', 'validation']
        },
        'listUser' : {
            deps : ['jQuery', 'bootstrap']
        },
        'listRole' : {
            deps : ['jQuery', 'bootstrap']
        },
        'listLog' : {
            deps : ['jQuery', 'bootstrap', 'select', 'datepicker']
        },
        'showPages' : {
            deps : ['jQuery', 'bootstrap']
        },
        'formPages' : {
            deps : ['jQuery', 'bootstrap', 'validation', 'select', 'wysiwyg', 'hotkeys']
        },
        'formGroup' : {
            deps : ['jQuery', 'bootstrap', 'validation', 'select']
        },
        'formCustomer' : {
            deps : ['jQuery', 'bootstrap', 'validation', 'masked']
        },
        'formProfiles' : {
            deps : ['jQuery', 'bootstrap', 'validation', 'select']
        },
        'showTech' : {
            deps : ['jQuery', 'bootstrap', 'validation', 'select']
        },
	'formPersonalData' : {
            deps : ['jQuery', 'bootstrap', 'validation']
        },
	'formPassword' : {
            deps : ['jQuery', 'bootstrap']
        }
    }
}); 