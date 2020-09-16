/*const fs = require('fs'); //import from file system functions

fs.writeFileSync('hello.txt', 'Hello from Node.js');*/

const person = {
    name: 'Tati',
    age: 23,
    greet: () => {
        console.log('Hi, I am ' + this.name); //you can't use "this" inside a arrow function, you have to use like the example below
    },
    greetNew() {
        console.log('Hi, I am ' + this.name);
    }
};
const printName = ({ name }) => console.log(name);

printName(person);


const copiedPerson = { ...person };
person.greetNew();

const hobbies = ['Sports', 'Cooking'];

for (let hobby of hobbies) {
    console.log(hobby);
}
const copiedHobbies = [...hobbies];
console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
console.log(copiedHobbies);

const toArray = (...args) => args;

console.log(toArray(1, 2, 3, 4)); //I use rest operator on the function, so I can pass how many parameters I want to the function

