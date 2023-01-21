export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Pencatatan Keluar Shipping - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pencatatan Keluar Shipping - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Pencatatan Keluar Shipping - Dyeing/Printing' },
            { route: 'view-bon/:id', moduleId: './view-bon', name: 'view-bon', nav: false, title: 'View-Bon:  Pencatatan Keluar Shipping - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Pencatatan Keluar Shipping - Dyeing/Printing' },
            { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Download Pencatatan Keluar Shipping - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}