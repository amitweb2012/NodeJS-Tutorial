const fs = require('fs');
const path = require("path")

const destinationFolder = path.join(__dirname, "textFolder");
if(!fs.existsSync(destinationFolder)){
    fs.mkdirSync(destinationFolder);
    console.log('Folder has been created');
}

const filePath = path.join(destinationFolder, 'inputText.txt');

// callback hell

fs.writeFile(filePath, "This is first line of node js", (err) => {
    if(err) {
        console.error("Error writing input txt file", err);
    }
    console.log("Recoded has been added as line in  text file");

    fs.readFile(filePath, (err, data) => {
        if(err) {
            console.error("Error reading file file", err);
        }
        console.log(`Data read from input txt file ${data}`);

        const anotherDestinationFolder = path.join(__dirname, "outputText.txt");

        const modifyFileData = data.toString().toUpperCase();

        fs.writeFile(anotherDestinationFolder, modifyFileData, (err) => {
            if(err) {
                console.error("Error writing output txt file", err);
            }
            console.log("Record has been updated to output txt file");
        })
    }) 
})