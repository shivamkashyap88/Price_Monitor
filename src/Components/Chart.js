import { IgrFinancialChart } from "igniteui-react-charts";
import React from "react";

export default function Chart(props) {
  return (
    <IgrFinancialChart
      width="100%"
      height="100%"
      chartType="Line"
      thickness={2}
      yAxisMode="PercentChange"
      yAxisTitle="Percent Changed"
      dataSource={props.data}
    />
  );
}
