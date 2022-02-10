// Все значения, определяющие базовые параметры игры

const config = {
  // Игровые параметры
  defaultSnakeLength: 4,
  wholeSessionTime: 300,
  baseVelocity: 0.1,
  maxVelocityGrowTimes: 3,
  boomHpLoose: 20,
  appleCreateTime: 20,

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
