## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

fs.readFile("a.txt", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
  }
  else {
    fs.writeFile("someTextFile.txt", data + "\nhello machine!!!!", (error) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log("Content written to file successfully");
      }
    })
  }
});
