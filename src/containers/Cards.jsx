import React from "react";

const Card = ({ title, number, color , rawNumber }) => {
  return (
    <div className={`flex items-center ${color} rounded-lg pl-4 mb-4`}>
      <div className="flex-1">
        <h1 className="text-b text-3xl font-bold ">{title}</h1>
        <p>{rawNumber}</p>
      </div>
      <div className="bg-white rounded-lg p-8  shadow-md">
        <h1 className="text-b text-3xl font-bold ">{number}M</h1>
      </div>
    </div>
  );
};

const Cards = ({ cardData }) => {
  const totalCases = Math.floor(cardData.totalCases);
  const totalRecovered = Math.floor(cardData.totalRecovered);
  const totalDeaths = Math.floor(cardData.totalDeaths);

  return (
    <div className="container mx-auto mt-16  p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 md:mr-4">
          <Card title="Total Cases" number={totalCases} rawNumber={cardData.totalCases} color="bg-violet-500" />
        </div>
        <div className="w-full md:w-1/3 md:mr-4">
          <Card title="Recovered" number={totalRecovered} rawNumber={cardData.totalRecovered} color="bg-green-600" />
        </div>
        <div className="w-full md:w-1/3">
          <Card title="Death" number={totalDeaths} rawNumber={cardData.totalDeaths} color="bg-red-700" />
        </div>
      </div>
    </div>
  );
};

export default Cards;
