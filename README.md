Проект "Боевые змеи".

Предварительные макеты основных экранов:
https://www.figma.com/file/EduXWeAso0ymv9iv5mOGcM/snake?node-id=0%3A1
Усовершенстоваванные макеты экранов:
https://www.figma.com/file/shSFDN4NMBizZwGSua7XHc/Snake?node-id=1%3A5887

# Общее описание игры.
Проект "Боевые змеи" является учебным проектом, создаваемым Дроновым Никитой, Ефимовым Иваном и Львовым Александром в рамках обучения на курсе "Мидл фронтенд-разработчик".

Проект создан по мотивам классической игры "Змейка". Основная разница состоит в том, что он является многопользовательским проектом, что подразумевает одновременную игру от 2 до 4 пользователей в рамках одной сессии.

Участники игры конкурируют между собой, и победитель получает награду, уровень которой зависит от типа выбранной сессии (количество участников, уровень сложности).

Одна сессия длиться ограниченное время (5 минут). За это время все участники с одной стороны пытаются заработать как можно больше очков, с другой выжить.

Очки зарабатываются путем собирания специальных предметов (монет), которые могут отличаться по ценности.

Выживание обеспечивается избеганием столкновений с препятствиями на игровом поле, со своим собственным туловищем и краями игрового поля. Изначально каждый участник имеет некоторое количество здоровья (100), которое расходуется при каждом столкновении. Если здоровье участника падает до 0, то он погибает - переходит в статус наблюдателя и дожидается окончания сессии.

Сессия завершается если завершилось время, либо если все участники погибли. В любом случае победителем сессии становится участник, набравший наибольшее количество очков. Собранные очки переводятся в личную валюту участника независимо от результатов сессии. Данную валюту можно использовать для изменения внешнего вида своего бойца.
# Механика игры
Каждый участник начинает игру в углу игрового поля. Изначально его боец - это змея длиной 4 единицы. Каждый боец состоит из трех типов элементов: голова (только одна), элементы туловища (их может быть много) и хвост (только один).

Каждый боец имеет скорость и направление движения. Скорость никогда не может быть нулевой.

В процессе игры на поле случайным образом возникают монеты - основная цель каждого участника. Монеты бывают трех уровней ценности: 1, 3 и 5. Вероятность их возникновения обратно пропорциональна ценности.

При собирании монет, туловище бойца становится длиннее на 1 элемент. Т.к. при игре необходимо избегать столкновений со своим собственным туловищем, то в процессе игры её сложность увеличивается.

Так же каждый игрок начинает игру с некоторой константной скоростью, которая линейно увеличивается в течение времени. Данный фактор также увеличивает сложность игры в процессе сессии.

Игровая механика рассчитана на детей, в связи с чем, никаких взаимодействий участников друг с другом не происходит. Конкуренция достигается только в рамках зарабатывания очков.

При столкновении с собственным туловищем, краем игрового поля или препятствием на игровом поле, боец теряет 20 единиц здоровья.

Помимо монет, на игровом поле могут возникать яблоки. Сбор данного объекта не увеличивает длину бойца и не приносит очков, однако он увеличивает здоровье, если оно не максимальное.

# Структура базы данных:
Таблица users (зарегистрированные пользователи):

|     Имя           |     Тип        |     Длина    |     Дополнительно    |     Комментарий      |
|-------------------|----------------|--------------|----------------------|----------------------|
|     user_id       |     int        |     11       |     ключ             |     Идентификатор    |
|     user_login    |     varchar    |     20       |                      |     Логин            |
|     user_pass     |     varchar    |     255      |                      |     Пароль           |
|     user_mail     |     varchar    |     255      |                      |     Почта            |
|     user_nick     |     varchar    |     20       |                      |     Позывной         |

Таблица parts (части тела, которые можно модифицировать в игре). В текущей версии их видимо только три: Голова, туловище, хвост.

|     Имя           |     Тип        |     Длина    |     Дополнительно    |     Комментарий      |
|-------------------|----------------|--------------|----------------------|----------------------|
|     part_id       |     int        |     11       |     ключ             |     Идентификатор    |
|     part _name    |     varchar    |     20       |                      |     Название         |

Таблица items (предметы, которые можно использовать в игре):

|     Имя               |     Тип        |     Длина    |     Дополнительно    |     Комментарий                                             |
|-----------------------|----------------|--------------|----------------------|-------------------------------------------------------------|
|     item_id           |     int        |     11       |     ключ             |     Идентификатор                                           |
|     item_name         |     varchar    |     20       |                      |     Название                                                |
|     item_img          |     varchar    |     255      |                      |     Картинка                                                |
|     part_id           |     int        |     11       |     внешний ключ     |     Ключ типа части тела                                    |
|     item_price        |     int        |     11       |                      |     Цена предмета                                           |
|     item_condition    |     int        |     11       |                      |     Кол-во наград,   необходимых для возможности покупки    |
|     item_desc         |     text       |            |                      |     Структура,   описывающая как его применять              |

Таблица users_link_items. Таблица, содержащая перечень предметов, которые приобрел пользователь (включая элементы по умолчанию).

|     Имя           |     Тип        |     Длина    |     Дополнительно    |     Комментарий                                                      |
|-------------------|----------------|--------------|----------------------|----------------------------------------------------------------------|
|     user_id       |     int        |     11       |     внешний ключ     |     Идентификатор   пользователя                                     |
|     item_id       |     int        |     11       |     внешний ключ     |     Идентификатор   предмета                                         |
|     item_state    |     boolean    |              |                      |     Указание о том,   является ли данный предмет сейчас активным.    |

Таблица currency. Таблица валют, используемых в игре (в настоящий момент их две: монеты и награды).

|     Имя          |     Тип        |     Длина    |     Дополнительно    |     Комментарий        |
|------------------|----------------|--------------|----------------------|------------------------|
|     curr_id      |     int        |     11       |     ключ             |     Идентификатор      |
|     curr_name    |     varchar    |     20       |                      |     Название           |
|     curr_img     |     varchar    |     255      |                      |     Картинка валюты    |

Таблица users_link_currency. Таблица, содержащая валюту в распоряжении пользователя.

|     Имя          |     Тип        |     Длина    |     Дополнительно    |     Комментарий        |
|------------------|----------------|--------------|----------------------|------------------------|
|     curr_id      |     int        |     11       |     ключ             |     Идентификатор      |
|     curr_name    |     varchar    |     20       |                      |     Название           |
|     curr_img     |     varchar    |     255      |                      |     Картинка валюты    |

Таблица users_game_history. Кажется логичным хранить все игры, которые сыграл пользователь и их результаты. Это может быть интересно самому игроку, а также может быть использовано, например, для контроля соответствия его текущего состояния (валюты) его истории действий.

|     Имя              |     Тип          |     Длина    |     Дополнительно    |     Комментарий                                                        |
|----------------------|------------------|--------------|----------------------|------------------------------------------------------------------------|
|     user_id          |     int          |     11       |     внешний ключ     |     Идентификатор   пользователя                                       |
|     game_time        |     timestamp    |              |                      |     Время игры                                                         |
|     game_type        |     int          |     11       |                      |     Кол-во пользователей   в игре: 1,2,3 или 4.                        |
|     game_result      |     int          |     11       |                      |     Место: 1,2,3 или 4                                                 |
|     game_currency    |     text         |              |                      |     JSON структура, содержащая пары   полученных валют:  id: count.    |

Таблица users_item_history. История покупок предметов.

|     Имя             |     Тип          |     Длина    |     Дополнительно    |     Комментарий                     |
|---------------------|------------------|--------------|----------------------|-------------------------------------|
|     user_id         |     int          |     11       |     внешний ключ     |     Идентификатор   пользователя    |
|     item_id         |     int          |     11       |     внешний ключ     |     Идентификатор предмета          |
|     pay_time        |     timestamp    |              |                      |     Время покупки                   |
|     pay_currency    |     int          |     11       |                      |     Валюта покупки                  |
|     pay_count       |     int          |     11       |                      |     Стоимость покупки               |
