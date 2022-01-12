// Временный массив - заглушка. Эти данные должны приходить из API запроса.
export const user_selected = [1, 1, 1, 0];

export const part_arr = [
  { id: 0, key: 'head', name: 'Голова' },
  { id: 1, key: 'body', name: 'Туловище' },
  { id: 2, key: 'tail', name: 'Хвост' },
  { id: 3, key: 'effect', name: 'Эликсир' }
];

export const item_arr = [
  [
    {
      id: '0',
      name: 'Зеленая',
      itemPrice: 10,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 255, 0)"}'
    },
    {
      id: '1',
      name: 'Красная',
      itemPrice: 20,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(255, 0, 0)"}'
    },
    {
      id: '2',
      name: 'Синяя',
      itemPrice: 30,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 255)"}'
    }
  ],
  [
    {
      id: '0',
      name: 'Зеленое',
      itemPrice: 10,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 255, 0)"}'
    },
    {
      id: '1',
      name: 'Красное',
      itemPrice: 20,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(255, 0, 0)"}'
    },
    {
      id: '2',
      name: 'Синее',
      itemPrice: 30,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 255)"}'
    },
    {
      id: '3',
      name: 'Белое',
      itemPrice: 100,
      itemCondition: 10,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(255, 255, 255)"}'
    }
  ],
  [
    {
      id: '0',
      name: 'Зеленый',
      itemPrice: 10,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 255, 0)"}'
    },
    {
      id: '1',
      name: 'Красный',
      itemPrice: 20,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(255, 0, 0)"}'
    },
    {
      id: '2',
      name: 'Синий',
      itemPrice: 30,
      itemCondition: 1,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 255)"}'
    },
    {
      id: '3',
      name: 'Белый',
      itemPrice: 100,
      itemCondition: 10,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(255, 255, 255)"}'
    },
    {
      id: '4',
      name: 'Черный',
      itemPrice: 150,
      itemCondition: 20,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 0)"}'
    },
    {
      id: '5',
      name: 'Серый',
      itemPrice: 150,
      itemCondition: 20,
      itemDesc: '{"type": "part", "form": "circle", "color": "rgb(128, 128, 128)"}'
    }
  ],
  [
    {
      id: '0',
      name: 'Замедление',
      itemPrice: 1500,
      itemCondition: 50,
      itemDesc: '{"type": "velocity", "k": "0.5"}'
    },
    { id: '1', name: 'Ускорение', itemPrice: 1500, itemCondition: 50, itemDesc: '{"type": "velocity", "k": "2"}' }
  ]
];
