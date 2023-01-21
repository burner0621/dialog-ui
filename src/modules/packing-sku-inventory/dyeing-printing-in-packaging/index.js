export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Packing - Dyeing & Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Packing - Dyeing & Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Packing - Dyeing & Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Packing - Dyeing & Printing' },
        ]);

        this.router = router;
    }
}