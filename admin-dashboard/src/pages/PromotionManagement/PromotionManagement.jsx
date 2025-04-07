import React, { useState } from "react";
import Header from "../../components/Header";
import "./PromotionManagement.css";
import { usePromotions, addPromotion, updatePromotion, deletePromotion } from "../../API/globalAPI";

const PromotionManagement = () => {
  const { promotions, loading, error, refetch } = usePromotions();

  const [formData, setFormData] = useState({
    promotionID: null,
    name: "",
    description: "",
    discount: "",
    startDate: "",
    endDate: "",
    status: "true", // Mặc định là chuỗi "true" để khớp API
    model: "default",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.discount || !formData.startDate || !formData.endDate || !formData.model.trim()) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    console.log("Dữ liệu gửi lên:", formData);
    try {
      if (isEditing) {
        await updatePromotion(
          formData.promotionID,
          formData.name,
          formData.description,
          Number(formData.discount),
          formData.startDate,
          formData.endDate,
          formData.status, // Gửi chuỗi "true" hoặc "false"
          formData.model
        );
        alert("Cập nhật promotion thành công!");
      } else {
        await addPromotion(
          formData.name,
          formData.description,
          Number(formData.discount),
          formData.startDate,
          formData.endDate,
          formData.status, // Gửi chuỗi "true" hoặc "false"
          formData.model
        );
        alert("Thêm promotion thành công!");
      }
      setFormData({
        promotionID: null,
        name: "",
        description: "",
        discount: "",
        startDate: "",
        endDate: "",
        status: "true", // Reset về "true" (chuỗi)
        model: "default",
      });
      setIsEditing(false);
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error("Lỗi khi xử lý promotion:", err);
      alert("Lỗi: " + err.message);
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      promotionID: promotion.promotionID,
      name: promotion.name,
      description: promotion.description || "",
      discount: promotion.discount.toString(),
      startDate: promotion.startDate.slice(0, 16),
      endDate: promotion.endDate.slice(0, 16),
      status: promotion.status.toString(), // Lấy giá trị từ API và đảm bảo là chuỗi
      model: promotion.model || "default",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (promotionID) => {
    if (!window.confirm("Bạn có chắc muốn xóa promotion này?")) return;
    try {
      await deletePromotion(promotionID);
      alert("Xóa promotion thành công!");
      refetch();
    } catch (err) {
      console.error("Lỗi khi xóa promotion:", err);
      alert("Lỗi: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value, // Chuyển checkbox thành chuỗi
    });
  };

  const handleBack = () => {
    setFormData({
      promotionID: null,
      name: "",
      description: "",
      discount: "",
      startDate: "",
      endDate: "",
      status: "true", // Reset về "true" (chuỗi)
      model: "default",
    });
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="promotion-management">
      <Header title="Quản lý khuyến mãi" />
      <div className="promotion-content">
        {!showForm ? (
          <>
            <button className="add-btn" onClick={() => setShowForm(true)}>Thêm khuyến mãi</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Giảm giá</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Trạng thái</th>
                  <th>Model</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {promotions.length > 0 ? (
                  promotions.map((promotion) => (
                    <tr key={promotion.promotionID}>
                      <td>{promotion.promotionID}</td>
                      <td>{promotion.name}</td>
                      <td>{promotion.description}</td>
                      <td>{promotion.discount.toLocaleString("vi-VN")} VNĐ</td>
                      <td>{new Date(promotion.startDate).toLocaleString("vi-VN")}</td>
                      <td>{new Date(promotion.endDate).toLocaleString("vi-VN")}</td>
                      <td>{promotion.status === "true" ? "Hoạt động" : "Không hoạt động"}</td>
                      <td>{promotion.model || "N/A"}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(promotion)}>Sửa</button>
                        <button className="delete-btn" onClick={() => handleDelete(promotion.promotionID)}>Xóa</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="9">Chưa có khuyến mãi nào</td></tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <form className="promotion-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên khuyến mãi</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên khuyến mãi"
                className="promotion-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả khuyến mãi"
                className="promotion-input"
              />
            </div>
            <div className="form-group">
              <label>Giảm giá (VNĐ)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Số tiền giảm"
                className="promotion-input"
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Ngày bắt đầu</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="promotion-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Ngày kết thúc</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="promotion-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status === "true"} // Hiển thị checkbox dựa trên chuỗi "true"
                onChange={handleChange}
                className="promotion-input"
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Model khuyến mãi"
                className="promotion-input"
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="submit-btn">{isEditing ? "Cập nhật" : "Lưu"}</button>
              <button type="button" className="back-btn" onClick={handleBack}>Quay lại</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PromotionManagement;