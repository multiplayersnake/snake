// Все значения, определяющие базовые параметры игры

const config = {
  // Игровые параметры
  level: [
    {
      defaultSnakeLength: 3,
      wholeSessionTime: 60,
      baseVelocity: 0.1,
      maxVelocityGrowTimes: 1,
      boomHpLoose: 0,
      awardsCount: 0,
      coinsPower: 0,
      appleHealValue: 10,
      appleCreateTime: 20
    },
    {
      defaultSnakeLength: 4,
      wholeSessionTime: 120,
      baseVelocity: 0.1,
      maxVelocityGrowTimes: 2,
      boomHpLoose: 10,
      awardsCount: 1,
      coinsPower: 1,
      appleHealValue: 20,
      appleCreateTime: 10
    },
    {
      defaultSnakeLength: 6,
      wholeSessionTime: 240,
      baseVelocity: 0.1,
      maxVelocityGrowTimes: 3,
      boomHpLoose: 20,
      awardsCount: 5,
      coinsPower: 2,
      appleHealValue: 10,
      appleCreateTime: 20
    },
    {
      defaultSnakeLength: 12,
      wholeSessionTime: 300,
      baseVelocity: 0.1,
      maxVelocityGrowTimes: 4,
      boomHpLoose: 50,
      awardsCount: 20,
      coinsPower: 5,
      appleHealValue: 5,
      appleCreateTime: 30
    }
  ],

  // Общие параметры
  wholeWidth: 1000,
  wholeHeight: 600,
  panelIdent: 10,

  // Параметры игрового поля
  fieldStep: 20,
  fieldWidth: 600,
  fieldHeight: 490,
  fieldLeft: 200,
  fieldTop: 100,
  lBorder: 0,
  rBorder: 0,
  tBorder: 0,
  bBorder: 0,

  // Параметры правой панели
  rightPanelLeft: 0,
  rightPanelTop: 0,
  rightPanelWidth: 0,
  rightPanelHeight: 0,

  // Параметры левой панели
  leftPanelLeft: 0,
  leftPanelTop: 0,
  leftPanelWidth: 0,
  leftPanelHeight: 0,

  // Параметры верхней панели
  topPanelLeft: 0,
  topPanelTop: 0,
  topPanelWidth: 0,
  topPanelHeight: 0
};

// Эти значения удобно использовать в расчетах, однако они сами являются зависимыми от еще более базовых.
// Их инициализируем как нулевые, а вот теперь рассчитываем
config.lBorder = config.fieldLeft + config.fieldStep / 2;
config.rBorder = config.fieldLeft + config.fieldWidth - config.fieldStep / 2;
config.tBorder = config.fieldTop + config.fieldStep / 2;
config.bBorder = config.fieldTop + config.fieldHeight - config.fieldStep / 2;

config.rightPanelLeft = config.fieldLeft + config.fieldWidth + config.panelIdent;
config.rightPanelWidth = 200;
config.rightPanelTop = config.panelIdent;
config.rightPanelHeight = 140;

config.leftPanelLeft = config.panelIdent;
config.leftPanelWidth = 200;
config.leftPanelTop = config.panelIdent;
config.leftPanelHeight = 140;

config.topPanelLeft = config.fieldLeft;
config.topPanelWidth = config.fieldWidth;
config.topPanelTop = 0;
config.topPanelHeight = 140;

export default config;
