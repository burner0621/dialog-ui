export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Resep Pemakaian Dyestuff & Chemical' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Resep Pemakaian Dyestuff & Chemical' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Resep Pemakaian Dyestuff & Chemical' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Resep Pemakaian Dyestuff & Chemical' }
        ]);

        this.router = router;
    }
}