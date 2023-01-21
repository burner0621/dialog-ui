export class SubconDetailHeader {
    activate(context) {
        this.context = context;
        this.items = context.items;
        this.options = context.options;

        // this.readOnly = this.options.readOnly;
    }

    changeCheckedAll() {
        this.items
            .forEach(item => {
                item.data.IsSave = (this.options.checkedAll === true);
            });
    }
}
