import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import OrderStatusModal from './Components/updateStatusModal';
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import ScaleLoader from 'react-spinners/ScaleLoader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);


  useEffect(() => {
    const fetchOrders = async (pageNumber = 1, status = '', start_date = '', end_date = '') => {
      try {
        const token = localStorage.getItem('token');
        const response = await Axios.get(`https://onepc.online/api/v1/orders/all?page=${pageNumber}&status=${status}&start_date=${start_date}&end_date=${end_date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.data.data);
        setTotalPages(response.data.data.meta.last_page);
      } catch (err) {
        setError('Error fetching orders.');
        console.error('There was an error fetching the orders:', err);
      } finally {
        setLoading(false);
      }
    };

    const formatDate = (date) => date ? date.toISOString().split('T')[0] : '';

    fetchOrders(page, filterStatus, formatDate(startDate), formatDate(endDate));
  }, [page, filterStatus, startDate, endDate, dateFilter]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

 
  const handleStatusChange = async (orderId, status) => {
    // Optimistically update the UI
    const updatedOrders = orders.map(order =>
      order.order_id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);

    try {
      const token = localStorage.getItem('token');
      const response = await Axios.post(`https://onepc.online/api/v1/orders/status/${orderId}`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.data.status) {
        throw new Error('Error updating status');
      }
      setUpdatingOrder(null);
      setNewStatus('');
      toast.success('Order status updated successfully!');
    } catch (err) {
      setOrders(orders);
      console.error('Error updating order status:', err.response ? err.response.data : err.message);
      setError('Error updating order status.');
      toast.error('Failed to update order status.');
    }
  };
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setPage(1);
    setOrders([]); 
  };
  const deleteOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      await Axios.delete(`https://onepc.online/api/v1/orders/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { order_ids: selectedOrders },
      });
  
      setOrders(orders.filter(order => !selectedOrders.includes(order.order_id)));
      setSelectedOrders([]); 
      toast.success('Selected orders deleted successfully!');
    } catch (err) {
      console.error('Error deleting orders:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Error deleting orders.');
      }
      toast.error('Failed to delete selected orders.');
    }
  };
  
  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
    const today = new Date();
    let startDate, endDate;

    switch (filter) {
      case 'today':
        startDate = endDate = today;
        break;
      case 'this_week':
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        break;
      case 'this_month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        startDate = endDate = null;
    }
    setStartDate(startDate);
    setEndDate(endDate);
    setPage(1);
    setOrders([]);  
  };

  const openModal = (order) => {
    setUpdatingOrder(order);
    setNewStatus(order.status);
  };
  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId) // Remove from selection
        : [...prevSelected, orderId] // Add to selection
    );
  };
  

  const closeModal = () => {
    setUpdatingOrder(null);
    setNewStatus('');
  };
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'stripe':
        return (
          <PaymentMethod>
            <FaCreditCard className="payment-icon" />
            <span>stripe</span>
          </PaymentMethod>
        );
      case 'cod':
        return (
          <PaymentMethod>
            <FaMoneyBillWave className="payment-icon" />
            <span>cod</span>
          </PaymentMethod>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Loading>
        <ScaleLoader color="#000099" />
      </Loading>
    );
  }

  if (error) {
    return <Error>{error}</Error>;
  }
  return (
    <PageContainer>
      <FilterContainer>
        <div className="filter-group">
          <label htmlFor="statusFilter">Filter by status:</label>
          <select id="statusFilter" value={filterStatus} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="dateFilter">Filter by date:</label>
          <select id="dateFilter" value={dateFilter} onChange={(e) => handleDateFilterChange(e.target.value)}>
            <option value="">Select date range</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <DatePickerContainer>
          <DatePicker 
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Start Date"
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="date-picker"
          />
          <DatePicker 
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="End Date"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            className="date-picker"
          />
        </DatePickerContainer>
      </FilterContainer>
      <TableWrapper>
        <OrderTable>
          <thead>
            <tr>
              <th>
              <input 
                type="checkbox" 
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedOrders(orders.map(order => order.order_id));
                  } else {
                    setSelectedOrders([]);
                  }
                }} 
                checked={selectedOrders.length === orders.length}
              />
              </th>
              <th>Order ID</th>
              <th>Billing Name</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9"><NoOrders>No orders found.</NoOrders></td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={`${order.order_id}-${index}`}>
                  <td>
                  <input 
                    type="checkbox" 
                    checked={selectedOrders.includes(order.order_id)}
                    onChange={() => handleCheckboxChange(order.order_id)}
                  />
                  </td>
                  <td>{order.order_id}</td>
                  <td>{order.full_name}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                  <td>{getPaymentMethodIcon(order.payment_method)}</td>
                  <td>
                  <ActionButtons>
                      <button onClick={() => openModal(order)}>
                        <FaEdit className="edit-icon" />
                      </button>
                      <button onClick={() => deleteOrder(order.order_id)}>
                        <FaTrash className="trash-icon" />
                      </button>
                    </ActionButtons>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </OrderTable>
      </TableWrapper>
      <PaginationContainer>
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </PaginationContainer>
      <OrderStatusModal
        isOpen={!!updatingOrder}
        onRequestClose={closeModal}
        order={updatingOrder}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        handleStatusChange={handleStatusChange}
      />
       <ToastContainer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;


const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .filter-group {
    display: flex;
    flex-direction: column;
    margin-right: 20px;

    label {
      margin-bottom: 5px;
      font-size: 14px;
    }

    select {
      padding: 4px;
      font-size: 12px;
      font-family: 'Poppins', sans-serif;
      border: 1px solid #ccc;
      border-radius: 4px;

      
    &:focus {
    border-color: #ff6600;
    outline: none;
  }
    }

  }
`;

const DatePickerContainer = styled.div`
  display: flex;

  .date-picker {
    margin-left: 10px;
    font-family: 'Poppins', sans-serif;
     border: 1px solid #ccc;

    &:focus {
    border-color: #ff6600;
    outline: none;
  }
  }
   
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const OrderTable = styled.table`
  font-size: 12px;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }
`;

const NoOrders = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  button {
    background: none;
    border: none;
    cursor: pointer;
    .edit-icon {
      color: #007bff;
    }
    .trash-icon {
      color: #dc3545;
    }
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .payment-icon {
    font-size: 12px;
    margin-right: 8px;
  }
  span {
    font-size: 12px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination li a {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-decoration: none;
    color: #000099;
  }

  .pagination li.active a {
    background-color: #000099;
    color: white;
    border-color: #000099;
  }
`;


export default ManageOrders;
