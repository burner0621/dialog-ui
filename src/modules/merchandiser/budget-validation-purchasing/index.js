export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ["", "list"], moduleId: "./list", name: "list", nav: true },
            { route: "view/:id", moduleId: "./view", name: "view", nav: false, title: "Detail" }
        ]);

        this.router = router;
    }
}