const fs = require('fs');
const path = require('path');   
const folderPath = path.join(__dirname, 'secret-folder');

function fileInfo(file) {
   let name = path.basename(file, path.extname(file));
   let ext = path.extname(file).slice(1);
   let filePath = path.join(folderPath, file);

   fs.stat(filePath, (error, data) => {
     const size = Math.ceil(data['size']/1025);
     console.log(`${name} - ${ext} - ${size}kB`);
   });
}

fs.promises.readdir(folderPath, {withFileTypes: true}).then( 
   files => {
     for (let file of files) {
       if (file.isFile()) {
         fileInfo(file.name);
       }
     }
});

// - [+] При выполнении команды ```node 03-files-in-folder``` в корневом каталоге репозитория в консоль выводится информация о файлах содержащихся внутри ***03-files-in-folder/secret-folder***. Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла кб>. Пример: ```example - txt - 128kb```
// - [+] Информация должна выводиться только для файлов. Наличие информации о директориях считается ошибкой.

