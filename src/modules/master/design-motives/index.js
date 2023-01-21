export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Desain Motif' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Desain Motif' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Desain Motif' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Desain Motif' },
            
        ]);

        this.router = router;
    }
}
