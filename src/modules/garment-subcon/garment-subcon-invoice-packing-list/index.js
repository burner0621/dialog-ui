export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Subcon Invoice Packing List' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Subcon Invoice Packing List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Subcon Invoice Packing List' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Subcon Invoice Packing List' },
        ]);
        this.router = router;
    }
}