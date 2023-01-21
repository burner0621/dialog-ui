export class Header {
    activate(context) {
        this.context = context;
        this.items = context.items;
        this.options = context.options;
    }

    changeCheckedAll() {
        this.items
            .forEach(item => {
                item.data.isChecked = (this.options.isCheckedAll === true);
            });
    }
}
