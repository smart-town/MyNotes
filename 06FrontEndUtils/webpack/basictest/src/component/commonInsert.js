export const commonInsert = (content='default', label='div') => {
    let element = document.createElement(label);
    element.innerHTML = content+"🐷";
    document.body.appendChild(element);
}