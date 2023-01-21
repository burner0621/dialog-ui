export default function dispatchCustomEvent(eventName, element, data) {
  let anEvent;
  if (window.CustomEvent) {
    anEvent = new CustomEvent(eventName, {
      detail: data,
      bubbles: true
    });
  } else {
    anEvent = document.createEvent('CustomEvent');
    anEvent.initCustomEvent(eventName, true, true, {
      detail: data
    });
  }
  element.dispatchEvent(anEvent);
}
