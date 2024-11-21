import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import LineChart from "@/components/LineChart/LineChart";
import Loader from "@/components/Loader/Loader";
import {
  fetchHistoricalData,
  fetchSelectedCoinData,
} from "@/app/features/coin/coinAPI";

const Coin = () => {
  const { id: coinId } = useParams(); // Extract coin ID from route params
  const coinData = useAppSelector((state) => state.allCoin);

  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [selectedCoinRes, historicalDataRes] = await Promise.all([
        fetchSelectedCoinData(coinId),
        fetchHistoricalData(coinId, coinData.currency),
      ]);
      setSelectedCoin(selectedCoinRes);
      setHistoricalData(historicalDataRes);
    } catch (err) {
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coinId, coinData.currency]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="coin py-0 px-[20px]">
      <div className="coin-name flex flex-col items-center gap-[20px] mx-auto pt-[3rem]">
        <img
          className="max-w-[100px]"
          src={selectedCoin?.image?.large}
          alt={selectedCoin?.name}
        />
        <p>
          <b className="text-[20px] sm:text-[44px] font-semibold text-[#3296bd]">
            {selectedCoin?.name} ({selectedCoin?.symbol?.toUpperCase()})
          </b>
        </p>
        <div className="coin-chart sm:max-w-[600px]    h-[150px] sm:h-[250px] my-[30px] mx-auto">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info sm:max-w-[600px] text-[15px] sm:text-[25px]   my-[30px] mx-auto flex flex-col">
          {[
            {
              label: "Crypto Market Rank",
              value: selectedCoin?.market_cap_rank,
            },
            {
              label: "Current Price",
              value: `${
                coinData.symbol
              } ${selectedCoin?.market_data?.current_price[
                coinData?.currency
              ]?.toLocaleString()}`,
            },
            {
              label: "Market Cap",
              value: `${
                coinData.symbol
              } ${selectedCoin?.market_data?.market_cap[
                coinData?.currency
              ]?.toLocaleString()}`,
            },
            {
              label: "24 Hour High",
              value: `${coinData.symbol} ${selectedCoin?.market_data?.high_24h[
                coinData?.currency
              ]?.toLocaleString()}`,
            },
            {
              label: "24 Hour Low",
              value: `${coinData.symbol} ${selectedCoin?.market_data?.low_24h[
                coinData?.currency
              ]?.toLocaleString()}`,
            },
          ].map((item, idx) => (
            <ul
              key={idx}
              className="flex justify-between py-[10px] px-0 border-b-[2px] border-b-[red] gap-[4rem]"
            >
              <li className="text-[#3296bd]">{item.label}</li>
              <li className="text-[#2cc1e2]">{item.value}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coin;
