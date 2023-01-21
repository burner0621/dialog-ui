export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Kategori Losses Event' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Kategori Losses Event' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Kategori Losses Event' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Kategori Losses Event' }
        ]);

        this.router = router;
    }
}