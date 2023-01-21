export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Garment Purchase Order Internal' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Garment Purchase Order Internal' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Garment Purchase Order Internal' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Garment Purchase Order Internal' }
        ]);

        this.router = router;
    }
}