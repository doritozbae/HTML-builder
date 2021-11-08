const fs = require('fs/promises');
const path = require('path');  
// const process = require('process'); 

let newDirPath = path.join(__dirname, "files-copy");
let dirPath = path.join(__dirname, "files");

async function copyDir() {
  await fs.mkdir(newDirPath, {recursive: true});
  await deleteFiles(newDirPath);
  const files = await fs.readdir(dirPath, {withFileTypes: true}); 

  for (const file of files) {
    try {
      const filePath = path.join(dirPath, file.name);
      const newFilePath = path.join(newDirPath, file.name);
      await fs.copyFile(filePath, newFilePath);
    } 
    catch {
      console.error(err);
    }
  }
  console.log('\n Files successfully copied!');
}
copyDir();

async function deleteFiles(folder) {
   try {
     const files = await fs.readdir(folder);

     for (const file of files) {
       await fs.unlink(path.join(folder, file));
     }
   } 
   catch (err) {
     console.error(err);
   }
 }

//  - [+] После завершения работы функции создаётся папка **files-copy** содержимое которой является точной копией исходной папки **files**.
// - [+] При добавлении/удалении/изменении файлов в папке **files** и повторном запуске ```node 04-copy-directory``` содержимое папки **files-copy** актуализируется.
