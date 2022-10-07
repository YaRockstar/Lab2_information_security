import { AlphabetService } from './Services/AlphabetService.js';

export class Encryptor {
  constructor(lang) {
    this.lang = lang;
    this.alphabet = [
      ...AlphabetService.getAlphabet(this.lang),
      ...AlphabetService.digits,
    ];
  }

  // Метод, шифрующий символ по буквенному ключу.
  encryptSymbol(symbol, symbolKey) {
    if (symbol === ' ') {
      return symbol;
    }

    let index = this.alphabet.indexOf(symbol);
    let symbolKeyIndex = this.alphabet.indexOf(symbolKey);

    if (index + symbolKeyIndex >= this.alphabet.length) {
      index = (index + symbolKeyIndex) % this.alphabet.length;
      return this.alphabet[index];
    }

    return this.alphabet[index + symbolKeyIndex];
  }

  // Метод, шифрующий текст по ключу.
  encryptText(text, key) {
    key = this.transformKey(key, text);
    return text
      .split('')
      .map((symbol, index) => this.encryptSymbol(symbol, key[index]))
      .join('');
  }

  // Метод, расшифровывающий символ по буквенному ключу.
  decryptSymbol(symbol, symbolKey) {
    if (symbol === ' ') {
      return symbol;
    }

    let index = this.alphabet.indexOf(symbol);
    let symbolKeyIndex = this.alphabet.indexOf(symbolKey);

    if (index - symbolKeyIndex < 0) {
      index = this.alphabet.length - (symbolKeyIndex - index);
      return this.alphabet[index];
    }
    return this.alphabet[index - symbolKeyIndex];
  }

  // Метод, расшифровывающий текст по ключу.
  decryptText(text, key) {
    key = this.transformKey(key, text);
    return text
      .split('')
      .map((symbol, index) => this.decryptSymbol(symbol, key[index]))
      .join('');
  }

  // Дополняет ключ (если он меньше длины текста без пробелов)
  // или укорачивает ключ (если его длина больше).
  transformKey(key, text) {
    key = key.replaceAll(' ', '');

    const spaceCount = text
      .split('')
      .reduce((acc, item) => (item === ' ' ? acc + 1 : acc), 0);
    const textLength = text.length - spaceCount;

    while (key.length < textLength) {
      key += key;
    }

    if (key.length > textLength) {
      key = key.substring(0, textLength);
    }

    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        key = `${key.substring(0, i)} ${key.substring(i)}`;
        console.log(key);
      }
    }
    console.log(text);
    console.log(key);
    return key;
  }
}
