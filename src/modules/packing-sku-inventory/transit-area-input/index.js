export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Penerimaan Transit - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Transit - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'Penerimaan Transit - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Penerimaan Transit - Dyeing/Printing' },
            { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Download Penerimaan Transit - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}