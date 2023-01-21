export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Master Minggu' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Minggu' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Minggu' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Minggu' },
        ]);

        this.router = router;
    }
}