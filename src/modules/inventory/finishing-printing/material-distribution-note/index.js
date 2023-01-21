export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bon Pengantar Greige' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bon Pengantar Greige' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bon Pengantar Greige' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bon Pengantar Greige' }
        ]);

        this.router = router;
    }
}
