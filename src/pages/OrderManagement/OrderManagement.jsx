import React from 'react';
import Header from '../../components/Header';
import './OrderManagement.css';

const OrderManagement = () => {
  return (
    <div className="order-management">
      <Header title="Quản lý đơn hàng" />
      <div className="order-content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nguyễn Văn A</td>
              <td>500,000</td>
              <td>Đã giao</td>
              <td>
                <button className="edit-btn">Sửa</button>
                <button className="delete-btn">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;