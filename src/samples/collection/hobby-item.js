export class HobbyItem
{
    activate(context)
    {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        console.log(this.data);
    }
}