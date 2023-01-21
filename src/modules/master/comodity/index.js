export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Komoditas' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Komoditas' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Komoditas' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Komoditas' },
            
        ]);

        this.router = router;
    }
}
