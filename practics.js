var input = '1234surya-name4321&42-age1234&male-gender4321'

// output = { name: 'surya', age: '42', gender: 'male' };

let stack =[];
let splitby1=input.split("-");
splitby1=splitby1.split("1234");
splitby1=splitby1.split("4321");
splitby1=splitby1.split("8");
console.log(splitby1);
// for(let i=0;i<input.length;i++){

// }