import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';
import RevenueAnalytics from './Components/revenue';
import ProductPerformance from './Components/productPerformance';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesAnalytics = () => {
  const [reportData, setReportData] = useState([]);
  const [revenueData, setRevenueData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('monthly'); 

  useEffect(() => {
    const fetchReportData = async (type) => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const reportResponse = await axios.get(`https://onepc.online/api/v1/sales/report?type=${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReportData(reportResponse.data.data);

       
        const revenueResponse = await axios.get('https://onepc.online/api/v1/analytics/revenue-statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRevenueData(revenueResponse.data.data);
      } catch (err) {
        setError('Error fetching data.');
        console.error('There was an error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData(reportType);
  }, [reportType]);

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };


  const chartData = {
    labels: reportData.map(item => {
      if (reportType === 'daily') {
        return item.date; 
      } else if (reportType === 'weekly') {
        return `Week ${item.week}`; 
      } else if (reportType === 'monthly') {
        return `${item.year}-${item.month}`;
      } else if (reportType === 'yearly') {
        return item.year; 
      }
      return 'Unknown';
    }),
    datasets: [
      {
        label: 'Total Sales',
        data: reportData.map(item => parseFloat(item.total_sales) || 0), 
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <Container>
      <FilterContainer>
        <label htmlFor="reportType">Report Type:</label>
        <select id="reportType" value={reportType} onChange={handleReportTypeChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </FilterContainer>
      {loading ? (
        <Loading>Loading report...</Loading>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <>
          <ChartContainer>
            <Line data={chartData} />
          </ChartContainer>
          <RevenueAnalytics revenueData={revenueData} />
          <ProductPerformance />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  label {
    margin-right: 15px;
    font-weight: 600;
    font-size: 16px;
  }

  select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #333;
`;

const Error = styled.div`
  color: #d9534f;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export default SalesAnalytics;
