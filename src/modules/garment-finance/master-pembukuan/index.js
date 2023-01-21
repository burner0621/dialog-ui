export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Pembukuan' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Pembukuan' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Pembukuan' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Pembukuan' },
        ]);

        this.router = router;
    }
}
