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
      item_price: 10,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 255, 0)"}'
    },
    {
      id: '1',
      name: 'Красная',
      item_price: 20,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(255, 0, 0)"}'
    },
    {
      id: '2',
      name: 'Синяя',
      item_price: 30,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 255)"}'
    }
  ],
  [
    {
      id: '0',
      name: 'Зеленое',
      item_price: 10,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 255, 0)"}'
    },
    {
      id: '1',
      name: 'Красное',
      item_price: 20,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(255, 0, 0)"}'
    },
    {
      id: '2',
      name: 'Синее',
      item_price: 30,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 255)"}'
    },
    {
      id: '3',
      name: 'Белое',
      item_price: 100,
      item_condition: 10,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(255, 255, 255)"}'
    }
  ],
  [
    {
      id: '0',
      name: 'Зеленый',
      item_price: 10,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 255, 0)"}'
    },
    {
      id: '1',
      name: 'Красный',
      item_price: 20,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(255, 0, 0)"}'
    },
    {
      id: '2',
      name: 'Синий',
      item_price: 30,
      item_condition: 1,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 255)"}'
    },
    {
      id: '3',
      name: 'Белый',
      item_price: 100,
      item_condition: 10,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(255, 255, 255)"}'
    },
    {
      id: '4',
      name: 'Черный',
      item_price: 150,
      item_condition: 20,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(0, 0, 0)"}'
    },
    {
      id: '5',
      name: 'Серый',
      item_price: 150,
      item_condition: 20,
      item_desc: '{"type": "part", "form": "circle", "color": "rgb(128, 128, 128)"}'
    }
  ],
  [
    {
      id: '0',
      name: 'Замедление',
      item_price: 1500,
      item_condition: 50,
      item_desc: '{"type": "velocity", "k": "0.5"}'
    },
    { id: '1', name: 'Ускорение', item_price: 1500, item_condition: 50, item_desc: '{"type": "velocity", "k": "2"}' }
  ]
];
