export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Pajak PPN ' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Pajak PPN' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Pajak PPN' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pajak PPN' },
            
        ]);

        this.router = router;
    }
}
