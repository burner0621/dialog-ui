export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Product Type' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Product Type' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Product Type' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Product Type' },
            
        ]);

        this.router = router;
    }
}