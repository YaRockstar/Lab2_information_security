import { AlphabetService } from './Services/AlphabetService.js';

export class Validator {
  // Метод, проверяющий является ли символ цифрой.
  static checkDigit(digit) {
    return AlphabetService.digits.includes(digit);
  }

  // Метод, проверяющий соответствует ли буква выбранному языку.
  static checkLetter(letter, lang) {
    return AlphabetService.getAlphabet(lang).includes(letter);
  }

  // Метод, проверяющий относится ли слово или ключ к выбранному языку.
  static checkWord(word, lang, isKey) {
    if (isKey) {
      return word
        .split('')
        .every(letter => Validator.checkLetter(letter, lang));
    }

    return word
      .split('')
      .every(
        letter =>
          Validator.checkLetter(letter, lang) || Validator.checkDigit(letter)
      );
  }

  // Метод, проверяющий относится ли текст или ключ к тому языку,
  // который был передан в качестве аргумента.
  static checkText(text, lang, isKey = false) {
    return text
      .split(' ')
      .every(word => Validator.checkWord(word, lang, isKey));
  }
}
