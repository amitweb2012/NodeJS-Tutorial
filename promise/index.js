function delayFn(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

console.log("Promise starts");
delayFn(200).then(() => console.log("after 2 seconds promise resolved"));
console.log("end");

function divide(num1, num2) {
    return new Promise((resolve, reject)=> {
        if(num2 == 0) {
            reject("Can not perform division by 0");
        } else {
            resolve(num1/num2);
        }
    })
}

divide(10,5).then((result) => console.log(result, "res"))
.catch((error) => console.log(error, "err"));