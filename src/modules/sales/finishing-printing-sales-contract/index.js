export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Sales Contract - Dyeing & Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sales Contract - Dyeing & Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Sales Contract - Dyeing & Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sales Contract - Dyeing & Printing' },
        ]);

        this.router = router;
    }
}