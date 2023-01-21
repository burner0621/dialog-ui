export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Pencatatan Keluar Transit - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pencatatan Keluar Transit - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Pencatatan Keluar Transit - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Pencatatan Keluar Transit - Dyeing/Printing' },
            { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Download Pencatatan Keluar Transit - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}