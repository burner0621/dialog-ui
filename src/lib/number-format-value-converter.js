import numeral from 'numeral';

export class NumberFormatValueConverter {
  toView(value, format) {
    // console.log(format);
    return numeral(value).format(format);
  }

  fromView(numericString, format) {
    // console.log(format);
    return numeral(numericString).value(format);
  }
}
