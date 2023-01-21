export class Detail {

    constructor() {
    }

    activate(context) {
        this.data = context.data;
        this.error = context.error;
    }
}