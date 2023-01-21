export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Koreksi Bon Terima Unit' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Koreksi Bon Terima Unit' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Koreksi Bon Terima Unit' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Koreksi Bon Terima Unit' },
        ]);

        this.router = router;
    }
}