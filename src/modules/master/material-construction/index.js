export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Material Construction' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Material Construction' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Material Construction' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Material Construction' },
            
        ]);

        this.router = router;
    }
}
