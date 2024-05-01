import  { useState } from "react";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
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
  );
};

export default DateRangePicker;
