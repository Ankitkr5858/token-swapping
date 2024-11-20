import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppSelector,useAppDispatch } from "@/app/hooks";
import { useEffect } from "react";
import {fetchCoinData} from "@app/features/coin/coinSlice"

export default function Header() {
  const dispatch = useAppDispatch();


  const currencyHandler = (e: any) => {
    const selectedCurrency = e.target.value;
    dispatch(fetchCoinData(selectedCurrency));
  };

  useEffect(() => {
    dispatch(fetchCoinData("usd"));
  }, [dispatch]);



  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 " style={{ backgroundColor: "#202020" }}>
        <div className="flex gap-4">
          <img className="w-[120px]" src={logo} alt="image" />
        </div>
        <div className="flex items-center gap-4 py-6 px-4 justify-center font-bold text-[18px] text-white ">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive && "text-red-600"}`}
          >
            Home
          </NavLink>
          <NavLink
            to="wallet"
            className={({ isActive }) => `${isActive && "text-red-600"}`}
          >
             Wallet
          </NavLink>

          <NavLink
            to="about"
            className={({ isActive }) => `${isActive && "text-red-600"}`}
          >
            About
          </NavLink>
          
        </div>
        <div className="nav-right ">
          <select onChange={currencyHandler} className="py-[5px] px-[8px] rounded-[6px]  border-[1px] border-white  text-[#09005c]">
            <option className="bg-[#09005c] text-white" value="usd">
              USD
            </option>
            <option className="bg-[#09005c] text-white" value="eur">
              EUR
            </option>
            <option className="bg-[#09005c] text-white" value="inr">
              INR
            </option>
          </select>
        </div>
      </div>
    </>
  );
}
