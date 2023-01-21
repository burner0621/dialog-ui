export class SuggestionTextValueConverter {
  toView(suggestion, field) {
    if (!suggestion)
      return "";
    else if (typeof suggestion === "string")
      return suggestion;
    else if (typeof suggestion === "object" && field) {
      if (typeof field === "function")
        return field(suggestion);
      else
        return suggestion[field];
    }
    else
      return suggestion.toString();
  }
}
