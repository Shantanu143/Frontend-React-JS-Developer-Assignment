import  { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import SearchBox from "./SearchBox";
import Cards from "./Cards";
import useFetchCountries from "../hooks/useFetchCountries";

const Charts = () => {
  const countries = useFetchCountries();
  const [country, setCountry] = useState("usa");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([["x", "Total Cases", "Recovered", "Deaths"]]);
  const [cardData, setCardData] = useState({});
  const [pieData, setPieData] = useState([["Label", "Value"]]);

  const fetchData = async (country) => {
    try {
      const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=1500`);
      const formattedData = Object.entries(response.data.timeline.cases).map(([date, cases]) => {
        const [month, day, year] = date.split("/");
        return [
          new Date(parseInt("20" + year), parseInt(month) - 1, parseInt(day)),
          cases / 1000000,
          response.data.timeline.recovered[date] / 1000000,
          response.data.timeline.deaths[date] / 1000000,
        ];
      });
      setData([["x", "Total Cases", "Recovered", "Deaths"], ...formattedData]);
      const totalCases = formattedData.reduce((acc, cur) => acc + cur[1], 0);
      const totalRecovered = formattedData.reduce((acc, cur) => acc + cur[2], 0);
      const totalDeaths = formattedData.reduce((acc, cur) => acc + cur[3], 0);
      setPieData([
        ["Label", "Value"],
        ["Total Cases", totalCases],
        ["Recovered", totalRecovered],
        ["Deaths", totalDeaths],
      ]);
      setCardData({ totalCases, totalRecovered, totalDeaths });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(country);
  }, [country, startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredData = data.filter(entry => {
    const date = new Date(entry[0]);
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    if (startDateObj && endDateObj) {
      return date >= startDateObj && date <= endDateObj;
    } else if (startDateObj) {
      return date >= startDateObj;
    } else if (endDateObj) {
      return date <= endDateObj;
    }

    return true; // If no dates are selected, include all data
  });

  const options = {
    legend: "none",
    backgroundColor: "transparent",
    hAxis: {
      format: "yyyy",
    },
    vAxis: {},
    series: {
      0: { color: "purple" },
      1: { color: "green" },
      2: { color: "red" },
    },
  };

  const pieOptions = {
    legend: "none",
    backgroundColor: "transparent",
    pieHole: 0.4,
    colors: ["purple", "green", "red"],
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4 pl-20">
          COVID-19 And Population dashboard
        </h1>

        <div className="relative flex items-center  rounded pl-20 overflow-hidden">
          <div className="w-2/3 pr-16">
            <SearchBox countries={countries} onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div className="w-1/3">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <p className="text-gray-700">Filter By Date Range </p>
              <div className="flex items-right">
                <div className="relative">
                  <input
                    type="date"
                    className="w-48 h-12 pl-3 pr-10 rounded-l text-gray-700  focus:outline-none"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    -
                  </span>
                </div>
                <div className="relative ml-0 -mr-0">
                  <input
                    type="date"
                    className="w-48 h-12 pl-3 pr-10 rounded-r text-gray-700  focus:outline-none"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <Cards cardData={cardData} />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="container mx-auto p-4">
          <h1 className="text-xl">Line Chart</h1>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mr-4">
              <LineChart data={filteredData} options={options} />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-xl">Pie Chart</h1>
              <PieChart data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
