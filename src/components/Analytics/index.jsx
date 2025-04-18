// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
//
// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
//
// const Analytics = () => {
//   // Line Chart Data
//   const lineChartData = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         label: "Active Users",
//         data: [50, 70, 100, 80, 120, 150],
//         borderColor: "#28a745",
//         backgroundColor: "rgba(40, 167, 69, 0.2)",
//         borderWidth: 1,
//         lineTension: 0.3,
//         tension: 0.3,
//       },
//     ],
//   };
//
//  
//
//
//   return (
//     <div className="analytics-container">
//       <h3 className="analytics-header">Analytics Dashboard</h3>
//       <p className="analytics-description">
//         Track the growth and activity of your platform with detailed analytics.
//       </p>
//
//       <div className="analytics-grid">
//         <div className="card">
//           <h4 className="card-header">Active Users Over Time</h4>
//           <Line data={lineChartData} />
//         </div>
//         
//       </div>
//     </div>
//   );
// };
//
// export default Analytics;
