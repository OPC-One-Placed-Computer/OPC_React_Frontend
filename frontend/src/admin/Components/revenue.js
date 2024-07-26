import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Poppins', 
          },
          color: '#333', 
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Poppins', 
        },
        titleFont: {
          family: 'Poppins', 
        },
      },
    },
  };

  return (
    <RevenueContainer>
      <Title>Revenue</Title>
      <PieContainer>
        <Pie data={pieData} options={pieOptions} />
      </PieContainer>
    </RevenueContainer>
  );
};

const RevenueContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 600;
`;

const PieContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

export default RevenueAnalytics;
