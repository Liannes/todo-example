import { linearGradientDef } from '@nivo/core';
const PieColors = {
  activeGradient: [
    { offset: 0, color: '#43ffd2cc' },
    { offset: 100, color: '#646cffcc' },
  ],
  completedSolid: '#646cffcc',
};

export const PieSetting = {
  CHART_MARGIN: { top: 0, right: 40, bottom: 0, left: 40 },
  INNER_RADIUS: 0.5,
  // Округление сегментов
  CORNER_RADIUS: 10,
  // Увеличение радиуса активного сегмента
  ACTIVE_OFFSET: 10,
  // Цвет текста на сегменте
  LABEL_TEXT: '#fff',
  // Присеты
  CHART_GRADIENTS: [
    linearGradientDef('active', PieColors.activeGradient, {
      gradientTransform: 'rotate(135 0.5 0.5)',
    }),
    linearGradientDef('completed', [{ offset: 0, color: PieColors.completedSolid }]),
  ],
  // Заливка
  FILL: [
    { match: { id: 'Не выполнено' }, id: 'active' },
    { match: { id: 'Выполнено' }, id: 'completed' },
  ],
};
