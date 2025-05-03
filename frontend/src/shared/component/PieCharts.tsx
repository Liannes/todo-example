import { ResponsivePie } from '@nivo/pie';
import { useMediaQuery } from 'react-responsive';

import { PieSetting } from '@shared/component/helpers/PieSetting';
import { IChartsTodo } from 'types/IChartsTodo';

interface PieChartProps {
  data: IChartsTodo[];
}

const PieCharts = ({ data }: PieChartProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <ResponsivePie
      data={data}
      margin={PieSetting.CHART_MARGIN}
      innerRadius={PieSetting.INNER_RADIUS}
      padAngle={1}
      cornerRadius={PieSetting.CORNER_RADIUS}
      activeOuterRadiusOffset={isMobile ? 2 : PieSetting.ACTIVE_OFFSET}
      // Подсказки
      enableArcLinkLabels={false}
      arcLabelsTextColor={PieSetting.LABEL_TEXT}
      defs={PieSetting.CHART_GRADIENTS}
      fill={PieSetting.FILL}
    />
  );
};

export default PieCharts;
