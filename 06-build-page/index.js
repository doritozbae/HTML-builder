const fs = require('fs');
const {writeFile, readFile, readdir} = require('fs/promises');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist/');
const stylePath = path.join(__dirname, 'styles/');
const componentsPath = path.join(__dirname, 'components/');
const templateFiles = path.join(__dirname, 'template.html');

const assetsPath = path.join(__dirname, 'assets/');
const assetsProjectPath = path.join(projectPath, 'assets/');

fs.mkdir(projectPath, { recursive: true }, err => {
   if (err) {
      throw err;
   }
});

async function buildHtml() {
   let template = await readFile(templateFiles, 'utf8');
   const files = await readdir(componentsPath);
   const arr = [];
   console.log('\n HTML file is ready! Check out project-dist/')

   for await (const file of files) {
       const text = await readFile(`${componentsPath}${file}`, 'utf8');
       const fileName = file.replace('.html', '');
       arr.push([fileName, text]);
   }

   for (const [templateText, htmlText] of arr) {
       template = template.replace(`{{${templateText}}}`, htmlText);
   }

   await writeFile(`${projectPath}index.html`, template);
}
buildHtml();

let writeableStream = fs.createWriteStream(`${projectPath}style.css`);
function buildCSS() {
   //   let writeableStream = [];

  fs.readdir(stylePath, (err, files) => {
   if (err) {
       console.error(err);
       return;
   }

       files.forEach(file => {
           const ext = path.extname(file).slice(1);

           if (ext === 'css') {
               let readableStream = fs.createReadStream(`${stylePath}${file}`, "utf8");

               //свяжем поток для чтения и поток для записи, для счета из потока чтения в поток записи
               readableStream.pipe(writeableStream);
           }
       });
   });
   console.log('\n CSS file is ready! Check out project-dist/')
}
buildCSS();


const copyAssets = (assetsPath, assetsProjectPath) => {
   fs.readdir(assetsPath, (err, files) => {
   if (err) {
         console.error(err);
         return;
      }

     files.forEach(file => {
      fs.stat(`${assetsPath}${file}`, (err, stats) => {
         if (err) {
            console.log(err);
         } 
         else {
            if (stats.isDirectory()) {
               // console.log('check')
               return copyAssets(path.join(__dirname, `assets/${file}/`), path.join(__dirname, `project-dist/assets/${file}/`));
            }
            fs.copyFile(`${assetsPath}${file}`,
               `${assetsProjectPath}${file}`, (err) => {
                  if (err) {
                     throw err;
                  }
               });
         }
      });
   });
   }
   );

   fs.mkdir(assetsProjectPath, { recursive: true }, err => {
      if (err) {
        throw err; 
      }   
  });
};
copyAssets(assetsPath, assetsProjectPath);

// - [+] После завершения работы скрипта должна быть создана папка **project-dist**
// - [+] В папке **project-dist** должны находиться файлы **index.html** и **stye.css** 
// - [+] В папке **project-dist** должна находиться папка **assets** являющаяся точной копией папки **assets** находящейся в **06-build-page**
// - [+] Файл **index.html** должен содержать разметку являющуюся результатом замены шаблонных тегов в файле **template.html**
// - [+] Файл **style.css** должен содержать стили собранные из файлов папки **styles** 
// - [+] При добавлении компонента в папку и соответствующего тега в исходный файл **template.html** повторное выполнение скрипта приведёт файл **index.html** в папке **project-dist** в актуальное состояние перезаписав его. Файл **style.css** и папка **assets** так же должны поддерживать актуальное состояние 
// - [+] Исходный файл **template.html** не должен быть изменён в ходе выполнения скрипта
// - [+] Запись в шаблон содержимого любых файлов кроме файлов с расширением **.html** является ошибкой  