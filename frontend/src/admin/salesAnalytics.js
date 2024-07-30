import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import styled from 'styled-components';
import RevenueAnalytics from './Components/revenue';
import ProductPerformance from './Components/productPerformance';
import ScaleLoader from 'react-spinners/ScaleLoader';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

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
        const reportResponse = await axios.get(`https://onepc.online/api/v1/analytics/sales-report?type=${type}`, {
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
        label: 'Last Year',
        data: reportData.map(item => parseFloat(item.last_year_sales) || 0),
        fill: true,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        pointBorderColor: '#fff',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'This Year',
        data: reportData.map(item => parseFloat(item.total_sales) || 0),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Report',
        color: '#333',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Poppins, sans-serif', // Apply Poppins font to title
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Total Sales: $${tooltipItem.raw.toFixed(2)}`;
          }
        },
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#007bff',
        borderWidth: 1,
      },
      legend: {
        labels: {
          color: '#333',
          font: {
            family: 'Poppins, sans-serif', // Apply Poppins font to legend labels
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: {
            family: 'Poppins, sans-serif', // Apply Poppins font to X axis labels
          },
        },
        grid: {
          color: '#ddd',
        },
      },
      y: {
        ticks: {
          color: '#333',
          font: {
            family: 'Poppins, sans-serif', // Apply Poppins font to Y axis labels
          },
        },
        grid: {
          color: '#ddd',
        },
      },
    },
  };

  return (
    <AnalyticsContainer>
      <Container>
      {loading ? (
          <Loading>
            <ScaleLoader color="#000099" loading={loading} size={50} />
          </Loading>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <>
            <TopContainer>
              <ChartContainer>
                <FilterContainer>
                  <select id="reportType" value={reportType} onChange={handleReportTypeChange}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </FilterContainer>
                <Line data={chartData} options={chartOptions} />
              </ChartContainer>
              <RevenueContainer>
                <RevenueAnalytics revenueData={revenueData} />
              </RevenueContainer>
            </TopContainer>
            <ProductPerformanceWrapper>
              <ProductPerformance />
            </ProductPerformanceWrapper>
          </>
        )}
      </Container>
    </AnalyticsContainer>
  );
};

const AnalyticsContainer = styled.div`
  overflow-x: hidden;
`;

const Container = styled.div`
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  select {
    padding: 5px;
    font-family: 'Poppins', sans-serif;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 10px;
    cursor: pointer;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Error = styled.div`
  color: #d9534f;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const ChartContainer = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  flex: 2;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const RevenueContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductPerformanceWrapper = styled.div`
  margin-top: 10px;
`;

export default SalesAnalytics;
