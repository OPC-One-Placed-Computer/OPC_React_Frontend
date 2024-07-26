import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueAnalytics = ({ revenueData }) => {
 
  const pieData = {
    labels: ['Total Revenue', 'Average Order Value', 'Revenue Per Customer'],
    datasets: [
      {
        data: [
          revenueData.total_revenue || 0,
          revenueData.average_order_value || 0,
          revenueData.revenue_per_customer || 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <RevenueContainer>
      <h2>Revenue Statistics</h2>
      <RevenueItem>Total Revenue: ${revenueData.total_revenue}</RevenueItem>
      <RevenueItem>Average Order Value: ${revenueData.average_order_value}</RevenueItem>
      <RevenueItem>Revenue Per Customer: ${revenueData.revenue_per_customer}</RevenueItem>
      <PieContainer>
        <Pie data={pieData} />
      </PieContainer>
    </RevenueContainer>
  );
};

const RevenueContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const RevenueItem = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-weight: 500;
`;

const PieContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: 30px;
`;

export default RevenueAnalytics;
