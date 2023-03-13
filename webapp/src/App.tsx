import React from 'react';
import '@fontsource/roboto';
import { IconBallpen, IconCards, IconDeviceSdCard } from '@tabler/icons-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import OrderItemToggle from './OrderItemToggle';
import InventoryBar from './InventoryBar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  return (
    <div className="mx-auto max-w-sm">
      <h2 className="font-sans w-fit ml-2 mt-2 tracking-widest text-3xl font-black text-gray-100">
        SEIFERT
      </h2>
      <h1 className="text-teal-500 w-fit ml-2 mt-2 mb-12 font-extrabold tracking-wide text-5xl">
        Smart Cart
      </h1>
      <div className="w-full bg-slate-800 rounded-lg overflow-hidden">
        <div className="left-0 top-0 right-0 bg-slate-700 shadow-lg">
          <h4 className="text-gray-100 pl-4 py-2 font-bold text-lg">
            Place Order
          </h4>
        </div>
        <div>
          <div className="flex space-x-0 w-full justify-evenly mt-8">
            <OrderItemToggle icon={<IconBallpen />}></OrderItemToggle>
            <OrderItemToggle icon={<IconCards />}></OrderItemToggle>
            <OrderItemToggle icon={<IconDeviceSdCard />}></OrderItemToggle>
          </div>
          <button className="block shadow-lg mx-auto mt-8 mb-6 text-slate-900 bg-slate-400 font-semibold rounded-md px-8 py-2 hover:bg-slate-300 transition-colors">
            SUBMIT
          </button>
        </div>
      </div>
      <div className="w-full mt-12 bg-slate-800 rounded-lg overflow-hidden">
        <div className="left-0 top-0 right-0 bg-slate-700">
          <h4 className="text-gray-100 pl-4 py-2 font-bold text-lg">
            Inventory
          </h4>
        </div>
        <div>
          <div className="w-full my-8 flex justify-evenly">
            <InventoryBar currentCapacity={10} totalCapacity={20} icon={<IconBallpen />}></InventoryBar>
            <InventoryBar currentCapacity={15} totalCapacity={20} icon={<IconCards />}></InventoryBar>
            <InventoryBar currentCapacity={12} totalCapacity={20} icon={<IconDeviceSdCard />}></InventoryBar>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 bg-slate-800 rounded-lg overflow-hidden">
        <div className="left-0 top-0 right-0 bg-slate-700">
          <h4 className="text-gray-100 pl-4 py-2 font-bold text-lg">
            Cycle Times
          </h4>
        </div>
        <div>
          <Line
            options={{
              plugins: { legend: { display: false } },
            }}
            data={{
              datasets: [{ data: [65, 72, 62, 89, 74] }],
              labels: [5, 6, 7, 8, 9],
            }}
          ></Line>
        </div>
      </div>
      <div className="w-full mt-12 bg-slate-800 rounded-lg overflow-hidden">
        <div className="left-0 top-0 right-0 bg-slate-700">
          <h4 className="text-gray-100 pl-4 py-2 font-bold text-lg">Events</h4>
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr className="text-slate-400">
                <th className="font-bold">Date</th>
                <th className="font-bold">Time</th>
                <th className="font-bold">Type</th>
                <th className="font-bold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-slate-300 border-b-2 border-slate-500">
                <td>3-14-2022</td>
                <td>3:14pm</td>
                <td>Alarm</td>
                <td>Cell guarding</td>
              </tr>
              <tr className="text-slate-300 border-b-2 border-slate-500">
                <td>3-14-2022</td>
                <td>3:14pm</td>
                <td>Alarm</td>
                <td>Cell guarding</td>
              </tr>
              <tr className="text-slate-300 border-b-2 border-slate-500">
                <td>3-14-2022</td>
                <td>3:14pm</td>
                <td>Alarm</td>
                <td>Cell guarding</td>
              </tr>
              <tr className="text-slate-300 border-b-2 border-slate-500">
                <td>3-14-2022</td>
                <td>3:14pm</td>
                <td>Alarm</td>
                <td>Cell guarding</td>
              </tr>
              <tr className="text-slate-300 border-b-2 border-slate-500">
                <td>3-14-2022</td>
                <td>3:14pm</td>
                <td>Alarm</td>
                <td>Cell guarding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
