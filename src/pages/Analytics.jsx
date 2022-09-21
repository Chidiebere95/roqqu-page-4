import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import {Bar} from 'react-chartjs-2'
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
// import writeFileSync from 'fs'
import CanvasJSReact from "../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// writeFileSync(
//   '/content-result-sync.txt',
//   'here is the result'
// )

const Home = ({ title }) => {
  let ws = new WebSocket("wss://stream.binance.com:9443/ws/bnbbtc@kline_5m");
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  // // const options = {
  // //   theme: "light2", // "light1", "light2", "dark1", "dark2"
  // //   animationEnabled: true,
  // //   exportEnabled: true,
  // //   title:{
  // //     text: "Intel Corporation Stock Price -  2017"
  // //   },
  // //   axisX: {
  // //     valueFormatString: "MMM"
  // //   },
  // //   axisY: {
  // //     prefix: "$",
  // //     title: "Price (in USD)"
  // //   },
  // //   data: [{
  // //     type: "candlestick",
  // //     showInLegend: true,
  // //     name: "Intel Corporation",
  // //     yValueFormatString: "$###0.00",
  // //     xValueFormatString: "MMMM YY",
  // //     dataPoints: [
  // //       // { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
  // //       // { x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.20] },
  // //       // { x: new Date("2017-03-01"), y: [35.85, 36.30, 34.66, 36.07] },
  // //       // { x: new Date("2017-04-01"), y: [36.19, 37.50, 35.21, 36.15] },
  // //       // { x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
  // //       // { x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
  // //       // { x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
  // //       // { x: new Date("2017-08-01"), y: [35.66, 36.70, 34.38, 35.07] },
  // //       // { x: new Date("2017-09-01"), y: [35.24, 38.15, 34.93, 38.08] },
  // //       // { x: new Date("2017-10-01"), y: [38.12, 45.80, 38.08, 45.49] },
  // //       // { x: new Date("2017-11-01"), y: [45.97, 47.30, 43.77, 44.84] },
  // //       // { x: new Date("2017-12-01"), y: [44.73, 47.64, 42.67, 46.16] }
  // //     ]
  // //   }]}
  // //   options.data[0].dataPoints.push(obj)
  // // console.log(series);
  // // console.log(series[0].data);
  // // setOptions(options)
  // }
  useEffect(async () => {
    try {
      const { data } = await axios.get(
        "https://www.binance.com/api/v3/uiKlines?limit=1000&symbol=BTCBUSD&interval=1w"
      );
      // console.log(data);
      console.log("success");
      const series = [
        {
          data: [
            {
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33],
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11],
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6648.95, 6623.34, 6635.65],
            },
            {
              x: new Date(1538784000000),
              y: [6635.65, 6651, 6629.67, 6638.24],
            },
            {
              x: new Date(1538785800000),
              y: [6638.24, 6640, 6620, 6624.47],
            },
            {
              x: new Date(1538787600000),
              y: [6624.53, 6636.03, 6621.68, 6624.31],
            },
            {
              x: new Date(1538789400000),
              y: [6624.61, 6632.2, 6617, 6626.02],
            },
            {
              x: new Date(1538791200000),
              y: [6627, 6627.62, 6584.22, 6603.02],
            },
            {
              x: new Date(1538793000000),
              y: [6605, 6608.03, 6598.95, 6604.01],
            },
            {
              x: new Date(1538794800000),
              y: [6604.5, 6614.4, 6602.26, 6608.02],
            },
            {
              x: new Date(1538796600000),
              y: [6608.02, 6610.68, 6601.99, 6608.91],
            },
            {
              x: new Date(1538798400000),
              y: [6608.91, 6618.99, 6608.01, 6612],
            },
            {
              x: new Date(1538800200000),
              y: [6612, 6615.13, 6605.09, 6612],
            },
            {
              x: new Date(1538802000000),
              y: [6612, 6624.12, 6608.43, 6622.95],
            },
            {
              x: new Date(1538803800000),
              y: [6623.91, 6623.91, 6615, 6615.67],
            },
            {
              x: new Date(1538805600000),
              y: [6618.69, 6618.74, 6610, 6610.4],
            },
            {
              x: new Date(1538807400000),
              y: [6611, 6622.78, 6610.4, 6614.9],
            },
            {
              x: new Date(1538809200000),
              y: [6614.9, 6626.2, 6613.33, 6623.45],
            },
            {
              x: new Date(1538811000000),
              y: [6623.48, 6627, 6618.38, 6620.35],
            },
            {
              x: new Date(1538812800000),
              y: [6619.43, 6620.35, 6610.05, 6615.53],
            },
            {
              x: new Date(1538814600000),
              y: [6615.53, 6617.93, 6610, 6615.19],
            },
            {
              x: new Date(1538816400000),
              y: [6615.19, 6621.6, 6608.2, 6620],
            },
            {
              x: new Date(1538818200000),
              y: [6619.54, 6625.17, 6614.15, 6620],
            },
            {
              x: new Date(1538820000000),
              y: [6620.33, 6634.15, 6617.24, 6624.61],
            },
            {
              x: new Date(1538821800000),
              y: [6625.95, 6626, 6611.66, 6617.58],
            },
            {
              x: new Date(1538823600000),
              y: [6619, 6625.97, 6595.27, 6598.86],
            },
            {
              x: new Date(1538825400000),
              y: [6598.86, 6598.88, 6570, 6587.16],
            },
            {
              x: new Date(1538827200000),
              y: [6588.86, 6600, 6580, 6593.4],
            },
            {
              x: new Date(1538829000000),
              y: [6593.99, 6598.89, 6585, 6587.81],
            },
            {
              x: new Date(1538830800000),
              y: [6587.81, 6592.73, 6567.14, 6578],
            },
            {
              x: new Date(1538832600000),
              y: [6578.35, 6581.72, 6567.39, 6579],
            },
            {
              x: new Date(1538834400000),
              y: [6579.38, 6580.92, 6566.77, 6575.96],
            },
            {
              x: new Date(1538836200000),
              y: [6575.96, 6589, 6571.77, 6588.92],
            },
            {
              x: new Date(1538838000000),
              y: [6588.92, 6594, 6577.55, 6589.22],
            },
            {
              x: new Date(1538839800000),
              y: [6589.3, 6598.89, 6589.1, 6596.08],
            },
            {
              x: new Date(1538841600000),
              y: [6597.5, 6600, 6588.39, 6596.25],
            },
            {
              x: new Date(1538843400000),
              y: [6598.03, 6600, 6588.73, 6595.97],
            },
            {
              x: new Date(1538845200000),
              y: [6595.97, 6602.01, 6588.17, 6602],
            },
            {
              x: new Date(1538847000000),
              y: [6602, 6607, 6596.51, 6599.95],
            },
            {
              x: new Date(1538848800000),
              y: [6600.63, 6601.21, 6590.39, 6591.02],
            },
            {
              x: new Date(1538850600000),
              y: [6591.02, 6603.08, 6591, 6591],
            },
            {
              x: new Date(1538852400000),
              y: [6591, 6601.32, 6585, 6592],
            },
            {
              x: new Date(1538854200000),
              y: [6593.13, 6596.01, 6590, 6593.34],
            },
            {
              x: new Date(1538856000000),
              y: [6593.34, 6604.76, 6582.63, 6593.86],
            },
            {
              x: new Date(1538857800000),
              y: [6593.86, 6604.28, 6586.57, 6600.01],
            },
            {
              x: new Date(1538859600000),
              y: [6601.81, 6603.21, 6592.78, 6596.25],
            },
            {
              x: new Date(1538861400000),
              y: [6596.25, 6604.2, 6590, 6602.99],
            },
            {
              x: new Date(1538863200000),
              y: [6602.99, 6606, 6584.99, 6587.81],
            },
            {
              x: new Date(1538865000000),
              y: [6587.81, 6595, 6583.27, 6591.96],
            },
            {
              x: new Date(1538866800000),
              y: [6591.97, 6596.07, 6585, 6588.39],
            },
            {
              x: new Date(1538868600000),
              y: [6587.6, 6598.21, 6587.6, 6594.27],
            },
            {
              x: new Date(1538870400000),
              y: [6596.44, 6601, 6590, 6596.55],
            },
            {
              x: new Date(1538872200000),
              y: [6598.91, 6605, 6596.61, 6600.02],
            },
            {
              x: new Date(1538874000000),
              y: [6600.55, 6605, 6589.14, 6593.01],
            },
            {
              x: new Date(1538875800000),
              y: [6593.15, 6605, 6592, 6603.06],
            },
            {
              x: new Date(1538877600000),
              y: [6603.07, 6604.5, 6599.09, 6603.89],
            },
            {
              x: new Date(1538879400000),
              y: [6604.44, 6604.44, 6600, 6603.5],
            },
            {
              x: new Date(1538881200000),
              y: [6603.5, 6603.99, 6597.5, 6603.86],
            },
            {
              x: new Date(1538883000000),
              y: [6603.85, 6605, 6600, 6604.07],
            },
            {
              x: new Date(1538884800000),
              y: [6604.98, 6606, 6604.07, 6606],
            },
          ],
        },
      ];
      // const series=[
      //   {
      //     data:[

      //     ]
      //   }
      // ]
      const options = {
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
      };   
      const datas = data.map((item) => {
        let o = item[1];
       const open= parseFloat(o);
        open.toFixed(2);
        parseFloat(open);
        let h = item[2];
       const high= parseFloat(h);
        high.toFixed(2);
        parseFloat(high);
        let l = item[3];
       const low= parseFloat(l);
        low.toFixed(2);
        parseFloat(low);
        let c = item[4];
       const close= parseFloat(c);
        close.toFixed(2);
        parseFloat(close);


        const objBinance = {
          x: new Date(item[0]),
          y: [
            open,high,low,close
          ],
        };
        // series[0].data.push(objBinance);
        // console.log(objBinance);
        
        return objBinance;
      });
      const total=[...series,...datas]
      console.log(total);
      series[0].data.push(...datas)
      setSeries(series)
      setOptions(options)
      // ws.onmessage = (event) => {
      //   let stockObj = JSON.parse(event.data);
      //   // console.log(stockObj);
      //   const obj = {
      //     x: new Date(stockObj.E),
      //     y: [
      //       parseFloat(stockObj.k.o),
      //       parseFloat(stockObj.k.c),
      //       parseFloat(stockObj.k.h),
      //       parseFloat(stockObj.k.l),
      //     ],
      //   };
      //   console.log(obj);
      // };
    } catch (error) {

      console.log(error);
    }
    console.log("useEffect");
  }, [ws]);
  //   const fetchHistoricalData=async()=>{
  //     try {
  //       const data=await axios.get('binance.com/api/v3/klines')
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   }
  //     fetchHistoricalData()

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
              <div className="charts-container">
                {/* <Bar style={{}} options={chartOptions} data={chartData}/> */}
                <ApexChart
                  options={options}
                  series={series}
                  type="candlestick"
                  height={370}
                />

                {/* <CanvasJSChart options = {options} */}
                {/* // onRef={ref => this.chart = ref}  */}
                {/* />  */}
              </div>
            </div>
            <div className="order-book">
              <div className="order-book-container">
                <h3 className="">order book</h3>
              </div>
              <div className="order-book-inner">
                <div className="top">
                  <table className=" ">
                    <thead className="t-head">
                      <tr className="  text-xs ">
                        <th className=" text-left w-1/12 ">PRICE(USDT)</th>
                        <th className=" text-left ">AMOUNT(BTC)</th>
                        <th className="text-left">TOTAL (USDT)</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      <tr className=" capitalize">
                        <td className=" text-xs red one">128299.304781</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>

                      <tr className=" capitalize">
                        <td className=" text-xs red two">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs red three">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs red four">128299.30478</td>
                        <td className=" text-xs">5.3047811</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs red five">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs red six">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="center text-base">128299.304781 USDT</div>
                <div className="bottom">
                  <table className=" mt-2">
                    <tbody className="t-body">
                      <tr className=" capitalize">
                        <td className=" text-xs green one-g">128299.304781</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>

                      <tr className=" capitalize">
                        <td className=" text-xs green two-g">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs green three-g">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs green four-g">128299.30478</td>
                        <td className=" text-xs">5.3047811</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs green five-g">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                      <tr className=" capitalize">
                        <td className=" text-xs green six-g">128299.30478</td>
                        <td className=" text-xs">5.304781</td>
                        <td className="text-xs">5.304781</td>
                      </tr>
                    </tbody>
                  </table>
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
      {/* <div className="h-10 bg-red-500 xl:bg-blue-500 2xl:bg-green-500"></div> */}
    </main>
  );
};

export default Home;
