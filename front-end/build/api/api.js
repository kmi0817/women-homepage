export function makeElement(elementType, setType, name) {
    const element = document.createElement(elementType);
    element.setAttribute(setType, name);
    return element;
}
