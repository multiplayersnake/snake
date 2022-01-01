// Временный массив - заглушка. Эти данные должны приходить из API запроса.
export const topic_arr = [
  { id: 0, dateTime: '01.09.2021', author: 'John1', mesCount: 15, newCount: 2, content: 'Чем управлять?' },
  { id: 1, dateTime: '01.10.2021', author: 'John2', mesCount: 16, newCount: 0, content: 'Пожелания к разработчикам' },
  { id: 2, dateTime: '01.11.2021', author: 'John3', mesCount: 17, newCount: 3, content: 'Какая скучная игра!' },
  { id: 3, dateTime: '01.12.2021', author: 'John4', mesCount: 18, newCount: 4, content: 'Конкурс!' },
  { id: 4, dateTime: '01.01.2022', author: 'John5', mesCount: 19, newCount: 0, content: 'Правила игры' }
];

export const out_arr = [
  [
    { dateTime: '01.09.2021 12:13', author: 'John1', content: 'Подскажите, чем управлять?' },
    { dateTime: '01.10.2021 12:15', author: 'John2', content: 'Стрелками' },
    { dateTime: '01.11.2021 12:17', author: 'John3', content: 'А если я с телефона?' },
    { dateTime: '01.12.2021 13:01', author: 'John4', content: 'Должны быть иконки стрелок на поле' },
    { dateTime: '01.01.2022 14:14', author: 'John5', content: 'А если их нет?' }
  ],
  [
    {
      dateTime: '01.09.2021 12:13',
      author: 'John1',
      content: 'А добавьте плиз в игру оружие!!! Пистолеты там, базуки...'
    },
    { dateTime: '01.10.2021 12:15', author: 'John2', content: 'Не, это уже будет фигня' },
    { dateTime: '01.11.2021 12:17', author: 'John3', content: 'Добавьте, чтобы можно было играть за единорогов :)' }
  ],
  [
    { dateTime: '01.09.2021 12:13', author: 'John1', content: 'Очень скучная игра, просто ползаешь и всё. ' },
    { dateTime: '01.10.2021 12:15', author: 'John2', content: 'Не нравится - проходи мимо, зачем комменты писать?' }
  ],
  [
    { dateTime: '01.09.2021 12:13', author: 'John1', content: 'Конкурс на самую красивую змею. Голосуем!' },
    { dateTime: '01.10.2021 12:15', author: 'John2', content: 'John1 - очень классный' },
    { dateTime: '01.11.2021 12:17', author: 'John3', content: 'Змеи - ерудна' },
    { dateTime: '01.12.2021 13:01', author: 'John4', content: 'Я за Smith_123' },
    {
      dateTime: '01.01.2022 14:14',
      author: 'John5',
      content: 'Предлагаем террариумы для разведения змей. Гарантия. Тел: 123-45-67'
    },
    { dateTime: '01.01.2022 14:16', author: 'John5', content: 'John1' },
    { dateTime: '01.01.2022 14:17', author: 'John5', content: 'John2' },
    { dateTime: '01.01.2022 14:18', author: 'John5', content: 'John3' },
    { dateTime: '01.01.2022 14:19', author: 'John5', content: 'смит 123' },
    {
      dateTime: '01.01.2022 14:20',
      author: 'John5',
      content: 'Корм для змей. Только натуральный продукт, без ГМО и антибиотиков. Скидка!!!'
    },
    { dateTime: '01.01.2022 14:21', author: 'John5', content: 'John2' },
    { dateTime: '01.01.2022 14:22', author: 'John5', content: 'John3' },
    { dateTime: '01.01.2022 14:22', author: 'John5', content: 'John2' }
  ],
  [
    { dateTime: '01.09.2021 12:13', author: 'John1', content: 'А есть какие-то правила игры?' },
    { dateTime: '01.10.2021 12:15', author: 'John2', content: 'Эм... вроде бы они очевидны' }
  ]
];
