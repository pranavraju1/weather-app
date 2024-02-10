import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnuts = ({ chartdata }) => {
  const options = {};
  console.log(chartdata);
  return (
    <>
      <Doughnut data={chartdata} options={options} />
    </>
  );
};

export default Doughnuts;
