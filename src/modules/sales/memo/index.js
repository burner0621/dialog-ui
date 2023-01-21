export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Memo' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Memo' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Memo' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Memo' },
            { route: 'post', moduleId: './post', name: 'post', nav: false, title: 'Post: Memo' }
        ]);

        this.router = router;
    }
}
