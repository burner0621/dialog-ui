export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:Id', moduleId: './view', name: 'view', nav: false, title: 'View:Unit' }, 
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Unit' }
        ]);

        this.router = router;
    }
}
