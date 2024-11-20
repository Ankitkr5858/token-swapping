import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import { Link } from "react-router-dom";

export default function Home() {
  const [input, setInput] = useState("");
  const [displayCoins, setDisplayCoins] = useState<any>([]);

  const coinData = useAppSelector((state) => state.allCoin);

  const inputHandler = (e: any) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(coinData.data);
    }
  };

  const searchHandler = async (e: any) => {
    e.preventDefault();
    const coinsVal = await coinData.data.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoins(coinsVal);
  };

  useEffect(() => {
    setDisplayCoins(coinData.data);
  }, [coinData.data]);

  return (
    <div className="container mx-auto p-4 ">
    
      <img src="/logo.svg" className="App-logo block mx-auto mb-4" alt="logo" />
      <div className=" max-w-[600px] my-[80px] mx-auto flex flex-col items-center text-center gap-[30px]">
        <h1 className="text-[36px] text-[#3296bd]">
          Welcome <br /> to Crypto Tracker
        </h1>

        <form
          className="p-[8px] w-[80%]  bg-white rounded-[5px] text-[20px] flex justify-between items-center gap-[10px]"
          onSubmit={searchHandler}
        >
          <input
            className="flex-[1] text-[16px] outline-none border-none pl-[10px]"
            onChange={inputHandler}
            type="text"
            placeholder="Search crpto..."
            required
            value={input}
            list="coinlist"
          />

          <datalist id="coinlist">
            {coinData.data?.map((coin: any) => (
              <option key={coin?.id} value={coin?.name} />
            ))}
          </datalist>

          <button
            type="submit"
            className="py-[10px] px-[30px] text-[26px] text-white border-none cursor-pointer rounded-[5px] bg-[#7927ff]"
          >
            Search
          </button>
        </form>
      </div>

      <div className="max-w-[800px] mx-auto rounded-[15px] bg-gradient-to-b from-[rgba(84,3,255,0.15)] to-[rgba(105,2,153,0.15)]">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b border-[#3c3c3c] text-[#2a7687]">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="market-cap text-right">Market Cap</p>
        </div>

        {displayCoins?.slice(0, 10)?.map((coin: any, index: number) => (
          <Link
            to={`/coin/${coin.id}`}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b last:border-b-0 border-[#3c3c3c] text-[#2cc1e2]"
            key={index}
          >
            <p>{coin?.market_cap_rank}</p>
            <div className="flex items-center gap-2.5">
              <img className="w-7" src={coin?.image} alt={coin?.name} />
              <p>{`${coin?.name} - ${coin?.symbol}`}</p>
            </div>
            <p> {coinData.symbol}  {coin.current_price.toLocaleString()}</p>
            <p
              className={`text-center ${
                coin.price_change_percentage_24h > 0
                  ? "text-[#00d515]"
                  : "text-[#ff4646]"
              }`}
            >
              {Math.floor(coin.market_cap_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap text-right">
            {coinData.symbol}  {coin?.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
