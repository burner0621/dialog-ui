export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Keterangan Loss Event' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Keterangan Loss Event' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Keterangan Loss Event' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Keterangan Loss Event' }
        ]);

        this.router = router;
    }
}