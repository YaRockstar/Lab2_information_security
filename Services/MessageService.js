export class MessageService {
  missingLang() {
    return 'Вы не выбрали язык';
  }

  missingText() {
    return 'Вы не ввели текст';
  }

  missingKey() {
    return 'Вы не ввели ключ';
  }

  nonTextKey() {
    return 'Ключ не является текстом';
  }

  unencryptedText() {
    return 'Вы ещё не зашифровали текст';
  }

  wrongAlphabet() {
    return 'Набранные символы не соответствуют символам выбранного алфавита';
  }
}
