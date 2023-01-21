export class StepIndicatorItem {
  activate(context) {
    this.context = context;
    this.stepIndicator = context.data;
    this.error = context.error;
    this.options = context.options;

    this.options.isNotDone = context.context.options.isNotDone;
  } 

  controlOptions = {
    control: {
      length: 12
    }
  };
}