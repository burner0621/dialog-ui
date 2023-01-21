export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Jenis Order' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Jenis Order' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jenis Order' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jenis Order' },
            
        ]);

        this.router = router;
    }
}
