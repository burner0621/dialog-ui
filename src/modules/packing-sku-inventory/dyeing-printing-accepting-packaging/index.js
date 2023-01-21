export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'Penerimaan Packaging Area Dyeing Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Buat Packaging Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Penerimaan Packaging - Dyeing & Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Penerimaan Packaging - Dyeing & Printing' },
        ]);

        this.router = router;
    }
}