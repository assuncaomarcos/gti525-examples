let json = '{"name":"Marie", "age":30, "city":"Montreal"}';
let obj = JSON.parse(json);
console.log(obj.name + ", " + obj.age + ", " + obj.city);

let obj2 = {name:"Marie", age:30, city:"Montreal"};
console.log(JSON.stringify(obj2));

