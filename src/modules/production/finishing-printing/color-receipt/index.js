export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Resep Warna' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Resep Warna' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Resep Warna' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Resep Warna' }
        ]);

        this.router = router;
    }
}