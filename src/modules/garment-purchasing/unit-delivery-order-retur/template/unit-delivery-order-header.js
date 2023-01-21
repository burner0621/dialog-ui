export class UnitDeliveryOrderHeader {
    activate(context) {
        this.context = context;
        this.items = context.items;
        this.options = context.options;

        this.readOnly = this.options.readOnly;
    }

    changeCheckedAll() {
        this.items.filter(item => item.data.IsDisabled === false)
            .forEach(item => {
                item.data.IsSave = (this.options.checkedAll === true);
            });
    }
}
