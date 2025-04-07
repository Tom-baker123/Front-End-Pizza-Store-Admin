import React, { useState } from 'react';
import Header from '../../components/Header';
import './AccountManagement.css';

const AccountManagement = () => {
  // State để quản lý danh sách tài khoản
  const [accounts, setAccounts] = useState([
    {
      userId: 1,
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      passwordHash: 'hashedpassword1',
      phone: '0123456789',
      address: '123 Đường A, Quận 1',
      role: 'Admin',
      isActive: true,
      createdAt: '2023-10-01',
    },
    {
      userId: 2,
      fullName: 'Trần Thị B',
      email: 'tranthib@example.com',
      passwordHash: 'hashedpassword2',
      phone: '0987654321',
      address: '456 Đường B, Quận 2',
      role: 'User',
      isActive: false,
      createdAt: '2023-10-02',
    },
  ]);

  // State để quản lý form thêm/sửa tài khoản
  const [formData, setFormData] = useState({
    userId: null,
    fullName: '',
    email: '',
    passwordHash: '',
    phone: '',
    address: '',
    role: 'User', // Mặc định là User
    isActive: true, // Mặc định là true
    createdAt: new Date().toISOString().split('T')[0], // Ngày hiện tại
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false); // Điều khiển hiển thị form

  // Xử lý khi thêm hoặc sửa tài khoản
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return; // Kiểm tra dữ liệu bắt buộc

    const newAccount = {
      ...formData,
      createdAt: new Date().toISOString().split('T')[0], // Ngày hiện tại
      userId: isEditing
        ? formData.userId
        : accounts.length
        ? accounts[accounts.length - 1].userId + 1
        : 1,
    };

    if (isEditing) {
      // Sửa tài khoản
      setAccounts(
        accounts.map((acc) =>
          acc.userId === formData.userId ? newAccount : acc
        )
      );
      setIsEditing(false);
    } else {
      // Thêm tài khoản
      setAccounts([...accounts, newAccount]);
    }
    setFormData({
      userId: null,
      fullName: '',
      email: '',
      passwordHash: '',
      phone: '',
      address: '',
      role: 'User',
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    }); // Reset form
    setShowForm(false); // Ẩn form sau khi thêm/sửa
  };

  // Xử lý khi nhấn nút "Sửa"
  const handleEdit = (account) => {
    setFormData(account);
    setIsEditing(true);
    setShowForm(true); // Hiển thị form khi sửa
  };

  // Xử lý khi nhấn nút "Xóa"
  const handleDelete = (userId) => {
    setAccounts(accounts.filter((acc) => acc.userId !== userId));
  };

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Xử lý quay lại
  const handleBack = () => {
    setFormData({
      userId: null,
      fullName: '',
      email: '',
      passwordHash: '',
      phone: '',
      address: '',
      role: 'User',
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="account-management">
      <Header title="Quản lý tài khoản" />
      <div className="account-content">
        {!showForm ? (
          <>
            {/* Nút Thêm và bảng danh sách */}
            <button className="add-btn" onClick={() => setShowForm(true)}>
              Thêm tài khoản
            </button>
            <table>
              <thead>
                <tr>
                  <th>UserID</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>PasswordHash</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>IsActive</th>
                  <th>CreatedAt</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {accounts.length > 0 ? (
                  accounts.map((account) => (
                    <tr key={account.userId}>
                      <td>{account.userId}</td>
                      <td>{account.fullName}</td>
                      <td>{account.email}</td>
                      <td>{account.passwordHash}</td>
                      <td>{account.phone}</td>
                      <td>{account.address}</td>
                      <td>{account.role}</td>
                      <td>{account.isActive ? 'Có' : 'Không'}</td>
                      <td>{account.createdAt}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(account)}
                        >
                          Sửa
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(account.userId)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">Chưa có tài khoản nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          /* Form thêm/sửa tài khoản */
          <form className="account-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="account-input"
                required
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
                className="account-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu (Hash)</label>
              <input
                type="text"
                name="passwordHash"
                value={formData.passwordHash}
                onChange={handleChange}
                placeholder="Mật khẩu (Hash)"
                className="account-input"
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
                className="account-input"
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
                className="account-input"
              />
            </div>
            <div className="form-group">
              <label>Vai trò</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="account-input"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Kích hoạt
              </label>
            </div>
            {/* CreatedAt không hiển thị trong form */}
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

export default AccountManagement;