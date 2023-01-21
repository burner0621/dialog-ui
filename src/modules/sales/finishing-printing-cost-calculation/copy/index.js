export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: ["", "list"],
                moduleId: "./list",
                name: "list",
                nav: true,
            },
            {
                route: "copy/:id",
                moduleId: "./copy",
                name: "copy",
                nav: false,
            }
        ]);

        this.router = router;
    }
}