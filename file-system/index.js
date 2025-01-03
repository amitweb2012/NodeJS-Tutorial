const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("data folder created");
}
const filePath = path.join(dataFolder, "example.txt");

fs.writeFileSync(filePath, 'Hello from node js');
console.log("file has been created");

const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log(readContentFromFile);

fs.appendFileSync(filePath, '\n This is added line from append');

console.log("new file content added");

//async way of creating the file
const asyncFilePath = path.join(dataFolder, "async-example.txt");

fs.writeFile(asyncFilePath, "Hello, Async node js", (err) => {
  if (err) throw err;
  console.log("File has been created with text")
  fs.readFile(asyncFilePath, (err, data) => {
    if (err) throw err;
    console.log(`Reading from aync file ${data}`);
    fs.appendFile(asyncFilePath, "\n This is new line in asyn file", (err) => {
      if (err) throw err;
      console.log("File has been updated with new data");
      fs.readFile(asyncFilePath, (err, data) => {
        if(err) throw err
        console.log(`Reading from aync file after append ${data}`);
      })
    })
  })
});
