function talksAbout(node, str) {
    if (node.nodeType == Node.ELEMENT_NODE) {
        for (let i = 0; i < node.childNodes.length; i++) {
            if (talksAbout(node.childNodes[i], str)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType == Node.TEXT_NODE) {
        return node.nodeValue.indexOf(str) > -1 ;
    }
}

console.log(talksAbout(document.body, "article"));
console.log(talksAbout(document.body, "livre"));