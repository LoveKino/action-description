'use strict';

let getNodeDes = (action) => {
    if (action.form === 'script') {
        return 'script';
    }
    let sourceNode = action.source.node;
    let rest = `${getContent(sourceNode, action.source.path)}${getId(sourceNode)}`;
    return `${getTagName(sourceNode)}${rest}`;
};

let getTagName = (sourceNode) => {
    let attributes = sourceNode.attributes;
    let tagName = `${sourceNode.tagName || ''}`;
    if (tagName === 'input') {
        let type = attributes.type || 'text';
        tagName = `${tagName}[${type}]`;
    }
    return tagName;
};

let getId = (sourceNode) => {
    let attributes = sourceNode.attributes;
    let content = `${attributes.id? ' #' + attributes.id : ''}`;
    return content;
};

let getContent = (sourceNode, path) => {
    let textContent = getCnt(sourceNode);
    if (sourceNode.tagName === 'INPUT' && sourceNode.attributes['type'] === 'radio') {
        textContent = radioText(path, textContent);
    }

    return textContent ? `<${textContent}>` : '';
};

let radioText = (path, textContent) => {
    let newCnt = textContent;
    let index = 0;
    while (path && newCnt === textContent && index < path.length) {
        newCnt = (getCnt(path[index++]) || '').trim();
    }
    return newCnt;
};

let getCnt = (node) => {
    if (!node) return '';
    let textContent = node.textContent || '';
    textContent = textContent.trim();
    return textContent;
};

let getSimpleNodeText = (action) => {
    if (action && action.name) return action.name;
    return getSimpleAutoText(action);
};

let getSimpleAutoText = (action) => {
    if (action && action.event) {
        let event = action.event;
        return `${event.type}: ${getNodeDes(action)}`;
    }
    return '';
};

module.exports = {
    getNodeDes,
    getSimpleNodeText,
    getSimpleAutoText
};
