import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import ApexChart from "react-apexcharts";
import {
  FaChevronDown,
  FaArrowRight,
  FaArrowLeft,
  FaBars,
  FaBox,
  FaWeight,
  FaChartBar,
  FaCamera,
  FaTags,
} from "react-icons/fa";
import logo from "../images/page3/roqqu_logo.png";
import user from "../images/page3/user.png";
import notification from "../images/page3/notification.png";
import chart from "../images/page3/noun_bar chart.svg";
import wallet from "../images/page3/Wallet.svg";
import prices from "../images/page3/Book.svg";
import activities from "../images/page3/Pulse.svg";
import settings from "../images/page3/Settings-alt.svg";
import promotions from "../images/page3/Fire.svg";
import dots from "../images/page3/dots.PNG";
import btc from "../images/page3/btc.svg";
import loader from "../images/page3/loading.gif";

const Analytics = ({ title }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [series, setSeries] = useState([{ data: [] }]);
  const [price,setPrice]=useState(null)
  
  const [options, setOptions] = useState({
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
    },
  });
  const [orderBook, setOrderBook] = useState({
    lastUpdateId: "",
    bids: [],
    asks: [],
  });
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [candlesticksArray, setCandleSticksArray]=useState([])
  let ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_5m");
  let wo=new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

  const priceContainer = useRef(null);
  useEffect(() => { 
    const seriesData = [
      {
        data: [],
      },
    ];
    const fetchHistoricalDatas = async () => {
      try {
        const { data } = await axios.get(
          "https://www.binance.com/api/v3/uiKlines?limit=1000&symbol=BTCBUSD&interval=1w"
        );
        // console.log(data);
        // console.log("success");
        const datas = data.map((item) => {
          let o = item[1];
          const open = parseFloat(o);
          open.toFixed(2);
          parseFloat(open);
          let h = item[2];
          const high = parseFloat(h);
          high.toFixed(2);
          parseFloat(high);
          let l = item[3];
          const low = parseFloat(l);
          low.toFixed(2);
          parseFloat(low);
          let c = item[4];
          const close = parseFloat(c);
          close.toFixed(2);
          parseFloat(close);

          const objBinance = {
            x: new Date(item[0]),
            y: [open, high, low, close],
          };

          return objBinance;
        });
        // console.log(datas);
        const array = [...datas];
        setCandleSticksArray( [...datas]) 
        
        ws.onmessage = function (event) {
          // console.log("two");
          const data = JSON.parse(event.data);
          const { E, k } = data;
          const { o, h, l, c } = k;
          let open = parseFloat(o);
          let high = parseFloat(h);
          let low = parseFloat(l);
          let close = parseFloat(c);
          const web = {
            x: new Date(E),
            y: [open, high, low, close],
          };

          // const dataState=seriesData[0].data
          // console.log(dataState);
          array.push(web);
          setCandleSticksArray([...candlesticksArray,web])
          const stateData = series[0].data;
          setSeries([
            {
              data: [...stateData, ...array],
            },
          ]);
          // console.log(web);
        };

        setLoading(false);
        const all = [...datas, ...candlesticksArray];
        seriesData[0].data.push(...all);
        setSeries(seriesData);
      } catch (error) {
        setSeries([]);
        setLoading(true);
        console.log("axios error");
      }
      // console.log("one");
    };
    fetchHistoricalDatas();

    const fetchOrderbookData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.binance.com/api/v3/depth?limit=10&symbol=BTCUSDT"
        );
        const bids = data.bids.slice(0, 7);
        const asks = data.asks.slice(0, 7);
        setOrderBook(data);
        setBids(bids);
        setAsks(asks);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(true);
      }
    };
    fetchOrderbookData();

    const fetchLiveOrderBookData=()=>{
      let stcPrice=null
      wo.onmessage=(event)=>{
        const data=JSON.parse( event.data)
        const priceBTC=parseFloat(data.p).toFixed(2)
        priceContainer.current.style.color= !stcPrice || stcPrice === priceBTC? 'white': priceBTC > stcPrice ? 'green': 'red'
        stcPrice=priceBTC
        setPrice(priceBTC)
        // console.log(data);
      }
      // console.log('order book');
    }
    fetchLiveOrderBookData()
    // console.log("useEffect");
  }, []);
  // console.log(series[0].data);
  return (
    <main className="main overflow-hidden  bg-gray-2">
      <nav className="nav flex h-20 px-12 pt-8 justify-between">
        <div className="flex justify-between">
          <img src={logo} alt="logo" className="h-5 w-24" />
        </div>

        <div className="flex ">
          <div className="h-8 flex gap-x-4 items-center">
            <div className="relative ">
              <img src={notification} alt="notification bell" className="" />
              <div className="absolute -top-1 right-0 h-2 w-2 bg-red rounded-full"></div>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-rounded flex items-center justify-center">
              <img src={user} alt="" className="" />
            </div>
            <div
              onClick={() => setShowSideMenu(!showSideMenu)}
              className="bars cursor-pointer toggle-menu "
            >
              <FaBars className="text-gray-500  text-xl bg-transparent" />
            </div>
          </div>
        </div>
      </nav>
      <section className="flex relative">
        <div
          className={`${
            showSideMenu
              ? "side-menu  z-20 absolute side-menu-show"
              : "side-menu  z-20 absolute side-menu-hide"
          }`}
        >
          <div className="menu-2 one-side-menu">
            <div className="menu-1-icon-container">
              <img src={dots} alt="dots" className="" />
            </div>
            <div className="menu-1-text-container">home</div>
          </div>
          <div className="menu-1">
            <div className="menu-2-icon-container">
              <img src={chart} alt="chart" className="" />
            </div>
            <div className="menu-2-text-container">exchange</div>
          </div>
          <div className="menu-2">
            <div className="menu-2-icon-container">
              <img src={wallet} alt="wallet" className="" />
            </div>
            <div className="menu-2-text-container">wallet</div>
          </div>
          <div className="menu-2">
            <div className="menu-2-icon-container">
              <img src={prices} alt="prices" className="" />
            </div>
            <div className="menu-2-text-container">prices</div>
          </div>
          <div className="menu-2">
            <div className="menu-2-icon-container">
              <img src={activities} alt="activities" className="" />
            </div>
            <div className="menu-2-text-container">activities</div>
          </div>
          <div className="menu-2">
            <div className="menu-2-icon-container">
              <img src={promotions} alt="promotions" className="" />
            </div>
            <div className="menu-2-text-container">promotions</div>
          </div>
          <div className="menu-2">
            <div className="menu-2-icon-container">
              <img src={settings} alt="settings" className="" />
            </div>
            <div className="menu-2-text-container">settings</div>
          </div>
          <div className="menu-2">
            <div className="menu-2-icon-container">
              <img src={notification} alt="notification" className="" />
            </div>
            <div className="menu-2-text-container">notifications</div>
          </div>
        </div>{" "}

        {/* analytics page */}
        <div className="bg-gray-5">
          <div className="info">
            <div className="item">
              <div className="flex item-start">
                <div className="h-8 w-8 rounded-full bg-yellow-1 mr-2">
                  <img src={btc} alt="" className="" />
                </div>
                <div className="">
                  <div className="flex items-center text-gray-3 gap-x-4">
                    <h1 className="text-gray-3 mb-1 font-bold">BTC /USDT</h1>
                    <FaChevronDown className="text-xs" />
                  </div>
                  <p className="text-gray-6 text-xs  capitalize font-medium">
                    bitcoin
                  </p>
                </div>
              </div>
            </div>
            <div className="item flex items-center justify-center">
              <div className="flex justify-end flex-col text-right">
                <p className="text-xs capitalize  leading-3 text-gray-6 mb-1 font-medium">
                  last price
                </p>
                <h3 className="text-base text-green-1 font-bold">
                  18372.99 USDT
                </h3>
              </div>
            </div>
            <div className="item flex items-center justify-center">
              <div className="flex justify-end flex-col text-right">
                <p className="text-xs capitalize  leading-3 text-gray-6 mb-1 font-medium">
                  high
                </p>
                <h3 className="text-base text-gray-7 font-bold">
                  18372.99 USDT
                </h3>
              </div>
            </div>
            <div className="item flex items-center justify-center">
              <div className="flex justify-end flex-col text-right">
                <p className="text-xs capitalize  leading-3 text-gray-6 mb-1 font-medium">
                  low
                </p>
                <h3 className="text-base text-gray-7 font-bold">
                  18372.99 USDT
                </h3>
              </div>
            </div>
            <div className="item flex items-center justify-center">
              <div className="flex justify-end flex-col text-right">
                <p className="text-xs capitalize  leading-3 text-gray-6 mb-1 font-medium">
                  volume
                </p>
                <h3 className="text-base text-gray-7 font-bold">
                  18372.99 USDT
                </h3>
              </div>
            </div>
            <div className="item item-last flex items-center justify-center">
              <div className="flex justify-end flex-col text-right">
                <p className="text-xs capitalize  leading-3 text-gray-6 mb-1 font-medium">
                  24h Change
                </p>
                <h3 className="text-base text-green-1 font-bold">+3.04%</h3>
              </div>
            </div>
          </div>
          <div className="flex charts-book">
            <div className="charts">
              <div className="charts-info">
                <div className="flex justify-between mb-4">
                  <h5 className="">charts</h5>
                  <div className="price flex">
                    <h3 className="capitalize bg-gray-8 w-16 text-gray-3">
                      price
                    </h3>
                    <h3 className="capitalize w-16 text-gray-9">depth</h3>
                  </div>
                </div>
                <div className="icons-container">
                  <div className="">
                    <div className="flex items-center">
                      <div className="icon-box  flex items-center justify-center">
                        <div className="text-xs">4h</div>
                      </div>
                      <div className="icon-box  flex items-center justify-center">
                        <div className="">
                          <FaBox />
                        </div>
                      </div>
                      <div className="icon-box  flex items-center justify-center">
                        <div className="">
                          <FaWeight />
                        </div>
                      </div>
                      <div className="icon-box flex items-center justify-center mr-5">
                        <div className="">
                          <FaChartBar />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 undo mb-1">
                          <FaArrowLeft />
                        </div>
                        <div className=" redo mb-1">
                          <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="icon-box  flex items-center justify-center">
                      <div className="text-xs capitalize">save</div>
                    </div>
                    <div className="icon-box  flex items-center justify-center">
                      <div className="">
                        <FaCamera />
                      </div>
                    </div>
                    <div className="icon-box  flex items-center justify-center">
                      <div className="">
                        <FaTags />
                      </div>
                    </div>
                    <div className="icon-box flex items-center justify-center">
                      <div className="">
                        <FaChartBar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="charts-container  ">
                <ApexChart
                  options={options}
                  series={series}
                  type="candlestick"
                  height={370}
                  className={` ${loading ? "hidden" : "block"}`}
                />
                <div
                  className={`bg-transparent w-full h-full flex items-center justify-center ${
                    loading ? "block" : "hidden"
                  }`}
                >
                  <img
                    src={loader}
                    alt="pre-load gif"
                    className={` w-12 h-12`}
                  />
                </div>
              </div>
            </div>
            <div className="order-book">
              <div className="order-book-container">
                <h3 className="">order book</h3>
              </div>
              <div className="order-book-inner">
                <div className="top">
                  <table className={`${loadingTable ? "hidden" : "block"}`}>
                    <thead className="t-head">
                      <tr className="  text-xs ">
                        <th className=" text-left w-1/12 ">PRICE(USDT)</th>
                        <th className=" text-left ">AMOUNT(BTC)</th>
                        <th className="text-left">TOTAL (USDT)</th>
                      </tr>
                    </thead>
                    <tbody className="t-body ">
                      {asks.map((item, index) => {
                        // console.log(item);
                        parseFloat(item[0]);
                        parseFloat(item[1]);
                        return (
                          <tr className=" capitalize" key={index}>
                            <td className=" text-xs red one">{item[0]}</td>
                            <td className=" text-xs">{item[1]}</td>
                            <td className="text-xs">{item[0] * item[1]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div
                    className={` w-full h-full flex items-center justify-center bg-transparent ${
                      loadingTable ? "block" : "hidden"
                    }`}
                  >
                    <img
                      src={loader}
                      alt="pre-load gif"
                      className={` w-6 h-6`}
                    />
                  </div>
                </div>
                <div  ref={priceContainer} className="center text-base">{price} USDT</div>
                <div className="bottom">
                  <table
                    className={`${loadingTable ? "hidden" : "block"} mt-2`}
                  >
                    <tbody className="t-body">
                      {bids.map((item, index) => {
                        // const bids=[orderBook.bids[0],...,[orderBook.bids[5]]]
                        // console.log(item);
                        parseFloat(item[0]);
                        parseFloat(item[1]);

                        return (
                          <tr className=" capitalize" key={index}>
                            <td className=" text-xs green one">{item[0]}</td>
                            <td className=" text-xs">{item[1]}</td>
                            <td className="text-xs">{item[0] * item[1]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div
                    className={` w-full h-full flex items-center justify-center bg-transparent ${
                      loadingTable ? "block" : "hidden"
                    }`}
                  >
                    <img
                      src={loader}
                      alt="pre-load gif"
                      className={` w-6 h-6`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex charts-book">
            <div className=" market-trades">
              <div className="market-trades-info">
                <div className="flex justify-between mb-4">
                  <h5 className="">market trades</h5>
                </div>
              </div>
              <div className="charts-container">
                <div className="time">
                  <div className="">time</div>
                  <div className="">price</div>
                  <div className="">AMOUNT (BTC)</div>
                  <div className="">TOTAL USDT</div>
                </div>
              </div>
            </div>

            <div className="place-order">
              <div className="place-order-container">
                <h3 className="">place order</h3>
              </div>
              <div className=" place-order-inner"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Analytics;
