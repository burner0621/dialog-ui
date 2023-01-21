export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Garment Purchase Request' },
            // { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Garment Purchase Request' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Garment Purchase Request' },
            // { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Garment Purchase Request' },
        ]);

        this.router = router;
    }
}
