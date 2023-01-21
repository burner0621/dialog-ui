export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:UnitofMeasurement' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:UnitofMeasurement' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:UnitofMeasurement' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:UnitofMeasurement' }
        ]);

        this.router = router;
    }
}
