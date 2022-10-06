import { Encryptor } from './Encryptor.js';
import { Validator } from './Validator.js';
import { MessageService } from './Services/MessageService.js';

// Переменная, которая будет хранить экземпляр класса Encryptor.
let encryptor;

// Экземпляр класса MessageService.
const message = new MessageService();

// Верхние кнопки: русский язык, сбросить всё, английский язык.
const ruButton = document.querySelector('.russian-btn');
const enButton = document.querySelector('.english-btn');
const resetButton = document.querySelector('.reset-btn');

// Поля для ввода слова и ключа.
const textInput = document.querySelector('.input-text');
const keyInput = document.querySelector('.input-key');

// Там будет выводиться зашифрованное и расшифрованное слово.
const encryptedText = document.querySelector('.encrypted-text');
const decryptedText = document.querySelector('.decrypted-text');

// Тут будут выводиться ошибки, связанные с отсутствием выбора языка
// и с вводом неправильного слова или ключа.
const langError = document.querySelector('.lang-error');
const textError = document.querySelector('.text-error');
const keyError = document.querySelector('.key-error');

// Обработка нажатия на кнопку выбора русского языка.
ruButton.addEventListener('click', () => {
  encryptor = new Encryptor('russian');

  ruButton.style.background = 'green';
  enButton.style.background = 'white';

  encryptedText.textContent = '';
  decryptedText.textContent = '';

  langError.textContent = '';
  textError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку выбора английского языка.
enButton.addEventListener('click', () => {
  encryptor = new Encryptor('english');

  enButton.style.background = 'green';
  ruButton.style.background = 'white';

  encryptedText.textContent = '';
  decryptedText.textContent = '';

  langError.textContent = '';
  textError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку сброса.
resetButton.addEventListener('click', () => {
  encryptor = null;

  ruButton.style.background = 'white';
  enButton.style.background = 'white';

  textInput.value = '';
  keyInput.value = '';

  encryptedText.textContent = '';
  decryptedText.textContent = '';

  langError.textContent = '';
  textError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку шифрования слова по ключу.
document.querySelector('.encrypt-btn').addEventListener('click', () => {
  if (!encryptor) {
    langError.textContent = message.missingLang();
    return;
  }

  const text = textInput.value;
  if (text === '') {
    textError.textContent = message.missingText();
    return;
  }

  if (!Validator.checkText(text, encryptor.lang)) {
    textError.textContent = message.wrongAlphabet();
    return;
  }

  const key = keyInput.value;
  if (key === '') {
    keyError.textContent = message.missingKey();
    return;
  }

  if (!Validator.checkText(key, encryptor.lang, true)) {
    keyError.textContent = message.nonTextKey();
    return;
  }

  encryptedText.textContent = encryptor.encryptText(text, key);
  textError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку расшифровки слова по ключу.
document.querySelector('.decrypt-btn').addEventListener('click', () => {
  const text = encryptedText.textContent;
  if (!encryptor || text === '') {
    textError.textContent = message.unencryptedText();
    return;
  }

  const key = keyInput.value;
  if (key === '') {
    keyError.textContent = message.missingKey();
    return;
  }

  if (!Validator.checkText(key, encryptor.lang, true)) {
    keyError.textContent = message.nonTextKey();
    return;
  }

  decryptedText.textContent = encryptor.decryptText(text, key);
  textError.textContent = '';
  keyError.textContent = '';
});
