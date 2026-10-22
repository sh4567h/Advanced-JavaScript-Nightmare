/*
==============================
customMap
==============================
**/

function customMap(array , callBackFunction) {

    let mapArray =[]
    for (let index = 0; index < array.length; index++) {
       mapArray.push(callBackFunction(array[index]))
    }
    return mapArray
}

/*
==============================
customFilter
==============================
**/

function customFilter(array , callBackFunction) {

    let filterArray =[]
    for (let index = 0; index < array.length; index++) {
      if(callBackFunction(array[index])){
        filterArray.push(array[index])
      }
    }
    return filterArray
}

/*
==============================
customReduce
==============================
**/
function customReduce(array , callBackFunction , initialeValue) {
   let finalResult = initialeValue
    for (let index = 0; index < array.length; index++) {
     finalResult =callBackFunction(finalResult , array[index])
    } 
    return finalResult
    
}

/*
==============================
groupBy
==============================
**/

function groupBy(array , property) {
    let finalResult ={
        
    }
    let currentProperty=''
    for (let index = 0; index < array.length; index++) {
      currentProperty =array[index][property]
       if (finalResult[currentProperty] !=undefined ) {
        finalResult[currentProperty].push(array[index])
       }else{
    
         finalResult[currentProperty]=[]
         finalResult[currentProperty].push(array[index])
       }
        
    }
    return finalResult
}

/*
==============================
deepClone
==============================
**/

function deepClone(object) {
    let newObject = {};

    for (const key in object) {
        if (object[key] === undefined || object[key] === null) {
            newObject[key] = object[key];

        } else if (typeof object[key] !== 'object') {
            newObject[key] = object[key];

        } else if (Array.isArray(object[key])) {
            newObject[key] = [];

            for (let i = 0; i < object[key].length; i++) {
                if (
                    object[key][i] === null ||
                    object[key][i] === undefined
                ) {
                    newObject[key].push(object[key][i]);

                } else if (typeof object[key][i] !== 'object') {
                    newObject[key].push(object[key][i]);

                } else if (Array.isArray(object[key][i])) {
                    newObject[key].push(deepCloneArray(object[key][i]));

                } else {
                    newObject[key].push(deepClone(object[key][i]));
                }
            }

        } else {
            newObject[key] = deepClone(object[key]);
        }
    }
console.log('deepClone')
    return newObject;
}

function deepCloneArray(array) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] === null || array[i] === undefined) {
            newArray.push(array[i]);
        } else if (typeof array[i] !== 'object') {
            newArray.push(array[i]);
        } else if (Array.isArray(array[i])) {
            newArray.push(deepCloneArray(array[i]));
        } else {
            newArray.push(deepClone(array[i]));
        }
    }
 
    return newArray;
}


/*
==============================
once
==============================
**/
function once(callBack) {
    let count =0
    return function(){
        if(count<1){
            count++
          return  callBack()
        }
        return ;
    }
}


/*
==============================
memoize
==============================
**/
function memoize(fn) {
    let cache = new Map()

    return function(input){
        if(cache.has(input)){
            console.log('from Cache')
            return cache.get(input)
        }
        const res = fn(input)
        cache.set(input , res)
        return res
    }
}

/*
==============================
compose
==============================
**/
function compose(fn1 , fn2 , fn3) {
   
    return function(value){
         let number1=fn1(value)
    let number2 = fn2(number1)
    let number3 = fn3(number2)
    return number3
    }
}


/*
==============================
flattenArray
==============================
**/
 function flattenArray(array) {
    let newArray =[]
    let currentVallue=0
for (let index = 0; index < array.length; index++) {
    if (Array.isArray(array[index])) {
        currentVallue = flattenArray(array[index]);

for (const value of currentVallue) {
    newArray.push(value);
}
    }else{
        newArray.push(array[index]) 
    }
    
}
return newArray
 }

/*
==============================
createCounter
==============================
**/

 function createCounter() {
    let counter =0
    return function(){
        counter++
        return counter
    }
 }

/*
==============================
SecretHolder
==============================
**/

 function createSecretHolder(number) {
    let secretNumber = number
    return {
      getNumber:  function(params) {
            return secretNumber
        },
    change: function (newValue) {
    secretNumber = newValue;
}
    }
 }



 /*
==============================
createEmitter
==============================
**/

function createEmitter() {
    let events = {};

    return {
        on: function (event, callback) {
            if (!events[event]) {
                events[event] = [];
            }

            events[event].push(callback);
        },

        emit: function (event, data) {
            if (events[event]) {
                for (let i = 0; i < events[event].length; i++) {
                    events[event][i](data);
                }
            }
        }
    };
}








// test customMap
console.log('**********test customMap**********')
let nums =[1, 2, 3]
 let result = customMap(nums , function(num){
    return num * 2
 })
 console.log( result)

//  test custom Filter
console.log('**********test custom Filter**********')
const users = [
{name:"Ahmed", age:22},
{name:"Sara", age:15}
];
 
let adualtUser= customFilter(users , function (params) {
    return params.age >=18
})

console.log( adualtUser)

// test customReduc
console.log('**********test customReduc**********')
const total = customReduce(
[1,2,3,8],
function(acc, current){
return acc + current;
},
0
);
console.log(total)

// test groupBy
console.log('**********test groupBy**********')

const students = [
    { name: "Ali", department: "CS" },
    { name: "Sara", department: "IT" },
    { name: "Omar", department: "CS" },
    { name: "Mona", department: "IT" }
];
 

let csStudents= groupBy(students, "department");
console.log(csStudents);


// test deepClone
console.log('**********test deepClone**********')
let items={ name: "Ali", 
    department: "CS",
    array:['nmn' , 56],
    wife:{
        name:'nhfjeh',
         age:909,
         son:{
            name:'lkljfk'
         }

    },
    function (params) {
       console.log('say hello') 
    }



}
let nObject = deepClone(items)
console.log(nObject)


//test Once
console.log('**********test Once**********')
let neg3=once(function () {
 return  'hello';
    
})
console.log(neg3());
console.log(neg3());


// test  memoize

console.log('**********test memoize**********')
let square = memoize( function (number ) {
    return number * number
})
console.log(square(5))
console.log(square(5))



// test  compose

console.log('**********test compose**********')

let result3=compose(function (num) {
    return  num -1
} , 
function (num) {
    return  num * 3
} , 
function (num) {
    return  num  + 2
} )
console.log(result3(5))

// test flattenArray

console.log('**********test flattenArray**********')

let result5= flattenArray([1, [2, [3, 4]], 5])
console.log(result5)

// test createCounter

console.log('**********test createCounter**********')
 let counter =createCounter()
console.log(counter());
console.log(counter());
console.log(counter());


// test createSecretHolder

console.log('**********test createSecretHolder*********')

let secret = createSecretHolder('128')

console.log(secret.getNumber())
secret.change('6768')
console.log(secret.getNumber())


// test Emiter
console.log('**********test Emiter*********')

const emitter = createEmitter();

function welcome(name) {
    console.log(`Welcome ${name}`);
}

function notify(name) {
    console.log(`${name} logged in successfully`);
}

emitter.on("login", welcome);
emitter.on("login", notify);

emitter.emit("login", "Shorouk");