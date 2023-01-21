export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Tarif' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Tarif' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Tarif' },
            { route: 'edit', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Tarif' },
        ]);
        this.router = router;
    }
}