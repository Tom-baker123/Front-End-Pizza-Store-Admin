import React, { useState } from "react";
import Header from "../../components/Header";
import "./ToppingManagement.css";
import { useToppings, addTopping, updateTopping, deleteTopping } from "../../API/globalAPI";

const ToppingManagement = () => {
  const { toppings, loading, error, refetch } = useToppings();

  const [formData, setFormData] = useState({
    toppingID: null,
    name: "",
    price: "",
    
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Xử lý khi thêm hoặc sửa topping
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    try {
      if (isEditing) {
        await updateTopping(formData.toppingID, formData.name, Number(formData.price));
      } else {
        await addTopping(formData.name, Number(formData.price));
      }
      setFormData({ toppingID: null, name: "", price: ""});
      setIsEditing(false);
      setShowForm(false);
      refetch();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // Xử lý khi nhấn nút "Sửa"
  const handleEdit = (topping) => {
    setFormData({
      toppingID: topping.toppingID,
      name: topping.name,
      price: topping.price.toString(),
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Xử lý khi nhấn nút "Xóa"
  const handleDelete = async (id) => {
    try {
      await deleteTopping(id);
      refetch();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Xử lý quay lại
  const handleBack = () => {
    setFormData({ toppingID: null, name: "", price: ""});
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="topping-management">
      <Header title="Quản lý topping" />
      <div className="topping-content">
        {!showForm ? (
          <>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              Thêm topping
            </button>
            <table>
              <thead>
                <tr>
                  <th>ToppingID</th>
                  <th>Tên Topping</th>
                  <th>Giá</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {toppings.length > 0 ? (
                  toppings.map((topping) => (
                    <tr key={topping.toppingID}>
                      <td>{topping.toppingID}</td>
                      <td>{topping.name}</td>
                      <td>{topping.price.toLocaleString()} VNĐ</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(topping)}>
                          Sửa
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(topping.toppingID)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Chưa có topping nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <form className="topping-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Tên topping"
              value={formData.name}
              onChange={handleChange}
              className="topping-input"
            />
            <input
              type="number"
              name="price"
              placeholder="Giá (VNĐ)"
              value={formData.price}
              onChange={handleChange}
              className="topping-input"
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

export default ToppingManagement;