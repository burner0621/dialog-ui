export class PersonItem {

    columns = [{ header: "Hobby", value: "name" }, "rating"];

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        console.log(this.data);
    }

    addNewHobby() {
        this.data.hobbies = this.data.hobbies || [];
        this.data.hobbies.push({ name: "", rating: "1" });
    }
    get addCallback() {
        // console.log("addCallback")
        return () => {
            this.addNewHobby();
        }
    }
}