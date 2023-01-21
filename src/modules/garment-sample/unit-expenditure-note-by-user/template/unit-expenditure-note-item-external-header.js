export class UnitExpenditureNoteItemHeader {

    activate(context) {
      this.context = context;
      this.data = context.data;
      this.items = context.items;
      this.options = context.options;
      this.readOnly = this.options.readOnly;
      this.isExternal=true;
    }
  
    changeCheckedAll() {
        this.items.filter(item => item.data.IsDisabled === false)
            .forEach(item => {
                item.data.IsSave = (this.options.checkedAll === true);
            });
    }
  }