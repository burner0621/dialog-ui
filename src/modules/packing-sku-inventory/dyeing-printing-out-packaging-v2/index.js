export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Packaging - Dyeing & Printing' },
            { route: 'create-v2', moduleId: './create-v2', name: 'create', nav: false, title: 'Create: Packaging - Dyeing & Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Packaging - Dyeing & Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Packaging - Dyeing & Printing' },
        ]);

        this.router = router;
    }
}