const path = require('path');
const fs = require('fs');

const stylesPath = path.join(__dirname, 'styles/');
const folderPath = path.join(__dirname, 'project-dist/');

let writeableStream = fs.createWriteStream(`${folderPath}bundle.css`);

function mergeStyles() {
//   let writeableStream = [];

  fs.readdir(stylesPath, (err, files) => {
   if (err) {
       console.error(err);
       return;
   }

   files.forEach(file => {
       const ext = path.extname(file).slice(1);

       if (ext === 'css') {
           let readableStream = fs.createReadStream(`${stylesPath}${file}`, "utf8");

           //свяжем поток для чтения и поток для записи, для счета из потока чтения в поток записи
           readableStream.pipe(writeableStream);
       }
   });
});

console.log('\n Ready! Check out project-dist/ :) \n')
}

mergeStyles();

// - [+] После завершения работы скрипта в папке **project-dist** должен находиться файл **bundle.css** содержащий стили из всех файлов папки **css**.
// - [+] При добавлении/удалении/изменении файлов стилей в папке **css** и повторном запуске скрипта файл **bundle.css** перезаписывается и содержит актуальные стили.
// - [+] Любые файлы имеющие расширение отличное от **css** или директории игнорируются.
// - [+] Стили находящиеся в файле **bundle.css** созданном в процессе сборки не должны быть повреждены. 


