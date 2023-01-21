export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Pencatatan Output Mesin' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Pencatatan Output Mesin' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Pencatatan Output Mesin' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pencatatan Output Mesin' },
        ]);

        this.router = router;
    }
}
