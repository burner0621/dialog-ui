export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view-input/:id', moduleId: './view-input', name: 'view-input', nav: false, title: 'View:Monitoring Daily Operational setiap Mesin' },
            { route: 'view-output/:id', moduleId: './view-output', name: 'view-output', nav: false, title: 'View:Monitoring Daily Operational setiap Mesin' },
            { route: 'edit-input/:id', moduleId: './edit-input', name: 'edit-input', nav: false, title: 'Edit:Input Monitoring Daily Operational setiap Mesin' },
            { route: 'edit-output/:id', moduleId: './edit-output', name: 'edit-output', nav: false, title: 'Edit:Output Monitoring Daily Operational setiap Mesin' },
            { route: 'create-input', moduleId: './create-input', name: 'create-input', nav: false, title: 'Create:Monitoring Daily Operational setiap Mesin' },
            { route: 'create-output/:id', moduleId: './create-output', name: 'create-output', nav: false, title: 'Create:Monitoring Daily Operational setiap Mesin' }
        ]);

        this.router = router;
    }
}
