export function makeElement(elementType: string, setType: string, name: string): HTMLElement {
    const element = document.createElement(elementType) as HTMLElement;
    element.setAttribute(setType, name);
    return element;
}