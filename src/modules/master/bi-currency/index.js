export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Kurs BI' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Kurs BI' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Kurs BI' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Kurs BI' },
        ]);

        this.router = router;
    }
}
