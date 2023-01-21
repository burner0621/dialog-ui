export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Purchase Request' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Purchase Request' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Purchase Request' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Purchase Request' },
        ]);

        this.router = router;
    }
}
