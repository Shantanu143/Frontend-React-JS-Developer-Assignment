
import { Chart } from "react-google-charts";

const PieChart = ({ data, options }) => {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default PieChart;
