const fs = require('fs');
const path = require('path');   
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'name.txt');
const output = fs.createWriteStream(filePath);

stdout.write('Hello, type your name: ');

stdin.on('data', (data) => {
   let string = data.toString();
 
   if (string.trim() == 'exit') {
     stdout.write('See you next time!');
     process.exit();
   }
   else {
      output.write(data);
   }

 });


function exitFunc() {
   stdout.write('See you next time!');
   process.exit();
}
process.on('SIGINT', () => exitFunc());


// - [+] Внутри папки 02-write-file находится 1 файл **index.js**
// - [+] При выполнении команды ```node 02-write-file``` в корневом каталоге репозитория в консоль выводится приглашение на ввод текста(На ваш выбор).
// - [+] После ввода текста в каталоге ```02-write-file``` должен быть создан текстовый файл, а введённый текст записан в него. Процесс не завершается и ждёт нового ввода.
// - [+] После следующего ввода созданный изначально текстовый файл дополняется новым текстом, процесс продолжает ждать ввод.
// - [+] При нажатии сочетания клавиш ```ctrl + c``` или вводе ```exit``` в консоль выводится прощальная фраза и процесс завершается.