const Person = function(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
};

Person.prototype.speak = function (msg) {
    console.log(`${this.firstname} ${this.lastname} dit: ${msg}`);
}

const Employee = function(firstname, lastname, title) {
    Person.call(this, firstname, lastname);
    this.title = title;
};

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

let person1 = new Person("Nina", "Gagneux");
let employee1 = new Employee("Madelaine", "Manager");

// ----------------

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