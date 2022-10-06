export class AlphabetService {
  static digits = '0123456789'.split('');

  static languages = {
    russian: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split(''),
    english: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  };

  static getAlphabet(lang) {
    return AlphabetService.languages[lang];
  }
}
