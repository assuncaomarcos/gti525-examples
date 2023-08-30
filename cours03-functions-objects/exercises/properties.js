function iterateOverProperties(obj) {
    let str = "{ ";
    let proto = Object.getPrototypeOf(obj);
    console.log(proto);
    for (let prop in obj) {
        if ( ( obj.hasOwnProperty(prop) )
            && ( typeof(obj[prop]) != "function")
            && (prop in proto ) ) {
            str = str + prop + " = " + obj[prop] + " , ";
        }
    }
    str = str + " } ";
    return str;
}