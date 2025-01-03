// callback function 

function person(name, callbackFn) {
    console.log(`Hello ${name}`);
    callbackFn()
}

function address() {
    console.log("Kolkata");
}

person("Amit Das", address);