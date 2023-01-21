export class Detail {

    activate(context) {
        this.data = context.data;
        this.readOnly = context.options.readOnly;
    }
}