export class MemberItem {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
  }

  get dataLoader() {
    return (start) => fetch("https://api.github.com/users")
      .then(response => response.json())
  }
}
