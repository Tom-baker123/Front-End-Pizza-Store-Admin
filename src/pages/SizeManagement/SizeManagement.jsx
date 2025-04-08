import React, { useState } from "react";
import Header from "../../components/Header";
import "./SizeManagement.css";
import { useSizes, addSize, updateSize, deleteSize } from "../../API/globalAPI";

const SizeManagement = () => {
  const { sizes, loading, error, refetch } = useSizes();

  const [formData, setFormData] = useState({
    sizeID: null,
    name: "",
    additionalPrice: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Xử lý khi thêm hoặc sửa size
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.additionalPrice) return;

    try {
      if (isEditing) {
        await updateSize(formData.sizeID, formData.name, Number(formData.additionalPrice));
      } else {
        await addSize(formData.name, Number(formData.additionalPrice));
      }
      setFormData({ sizeID: null, name: "", additionalPrice: "" });
      setIsEditing(false);
      setShowForm(false);
      refetch();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // Xử lý khi nhấn nút "Sửa"
  const handleEdit = (size) => {
    setFormData({
      sizeID: size.sizeID,
      name: size.name,
      additionalPrice: size.additionalPrice.toString(),
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Xử lý khi nhấn nút "Xóa"
  const handleDelete = async (id) => {
    try {
      await deleteSize(id);
      refetch();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý quay lại
  const handleBack = () => {
    setFormData({ sizeID: null, name: "", additionalPrice: "" });
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="size-management">
      <Header title="Quản lý kích thước" />
      <div className="size-content">
        {!showForm ? (
          <>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              Thêm kích thước
            </button>
            <table>
              <thead>
                <tr>
                  <th>SizeID</th>
                  <th>Tên Kích Thước</th>
                  <th>Giá Thêm</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {sizes.length > 0 ? (
                  sizes.map((size) => (
                    <tr key={size.sizeID}>
                      <td>{size.sizeID}</td>
                      <td>{size.name}</td>
                      <td>{size.additionalPrice.toLocaleString()} VNĐ</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(size)}>
                          Sửa
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(size.sizeID)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Chưa có kích thước nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <form className="size-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Tên kích thước"
              value={formData.name}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="additionalPrice"
              placeholder="Giá thêm (VNĐ)"
              value={formData.additionalPrice}
              onChange={handleChange}
              className="size-input"
              min="0"
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {isEditing ? "Cập nhật" : "Lưu"}
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

export default SizeManagement;