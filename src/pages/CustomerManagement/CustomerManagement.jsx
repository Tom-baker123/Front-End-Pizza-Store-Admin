import React, { useState } from 'react';
import Header from '../../components/Header';
import './CustomerManagement.css';

const CustomerManagement = () => {
  // State để quản lý danh sách khách hàng
  const [customers, setCustomers] = useState([
    {
      id: 1,
      fullName: 'Nguyễn Thị C',
      password: 'hashedpassword1',
      email: 'nguyenthic@example.com',
      phone: '0123456789',
      address: '789 Đường C, Quận 3',
    },
    {
      id: 2,
      fullName: 'Lê Văn D',
      password: 'hashedpassword2',
      email: 'levand@example.com',
      phone: '0987654321',
      address: '101 Đường D, Quận 4',
    },
  ]);

  // State để quản lý form thêm/sửa khách hàng
  const [formData, setFormData] = useState({
    id: null,
    fullName: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false); // Điều khiển hiển thị form

  // Xử lý khi thêm hoặc sửa khách hàng
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return; // Kiểm tra dữ liệu bắt buộc

    const newCustomer = {
      ...formData,
      id: isEditing
        ? formData.id
        : customers.length
        ? customers[customers.length - 1].id + 1
        : 1,
    };

    if (isEditing) {
      // Sửa khách hàng
      setCustomers(
        customers.map((cust) =>
          cust.id === formData.id ? newCustomer : cust
        )
      );
      setIsEditing(false);
    } else {
      // Thêm khách hàng
      setCustomers([...customers, newCustomer]);
    }
    setFormData({
      id: null,
      fullName: '',
      password: '',
      email: '',
      phone: '',
      address: '',
    }); // Reset form
    setShowForm(false); // Ẩn form sau khi thêm/sửa
  };

  // Xử lý khi nhấn nút "Sửa"
  const handleEdit = (customer) => {
    setFormData(customer);
    setIsEditing(true);
    setShowForm(true); // Hiển thị form khi sửa
  };

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý quay lại
  const handleBack = () => {
    setFormData({
      id: null,
      fullName: '',
      password: '',
      email: '',
      phone: '',
      address: '',
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="customer-management">
      <Header title="Quản lý khách hàng" />
      <div className="customer-content">
        {!showForm ? (
          <>
            {/* Nút Thêm và bảng danh sách */}
            
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FullName</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.fullName}</td>
                      <td>{customer.password}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(customer)}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Chưa có khách hàng nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          /* Form thêm/sửa khách hàng */
          <form className="customer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="customer-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu (Hash)"
                className="customer-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="customer-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="customer-input"
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Địa chỉ"
                className="customer-input"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {isEditing ? 'Cập nhật' : 'Lưu'}
              </button>
              <button type="button" className="back-btn" onClick={handleBack}>
                Quay lại
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;