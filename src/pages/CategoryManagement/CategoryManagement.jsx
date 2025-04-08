import React, { useState } from "react";
import Header from "../../components/Header";
import "./CategoryManagement.css";
import { useCategories, addCategory, updateCategory, deleteCategory } from "../../API/globalAPI";

const CategoryManagement = () => {
  const { categories, loading, error, refetch } = useCategories();

  const [formData, setFormData] = useState({ categoryId: null, categoryName: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Xử lý khi thêm hoặc sửa danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryName.trim()) return;

    try {
      if (isEditing) {
        await updateCategory(formData.categoryId, formData.categoryName);
      } else {
        await addCategory(formData.categoryName);
      }
      setFormData({ categoryId: null, categoryName: "" });
      setIsEditing(false);
      setShowForm(false);
      refetch(); // Cập nhật lại danh sách sau khi thêm/sửa
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // Xử lý khi nhấn nút "Sửa"
  const handleEdit = (category) => {
    setFormData({ categoryId: category.categoryId, categoryName: category.categoryName });
    setIsEditing(true);
    setShowForm(true);
  };

  // Xử lý khi nhấn nút "Xóa"
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      refetch(); // Cập nhật lại danh sách sau khi xóa
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    setFormData({ ...formData, categoryName: e.target.value });
  };

  // Xử lý quay lại
  const handleBack = () => {
    setFormData({ categoryId: null, categoryName: "" });
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="category-management">
      <Header title="Quản lý danh mục" />
      <div className="category-content">
        {!showForm ? (
          <>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              Thêm danh mục
            </button>
            <table>
              <thead>
                <tr>
                  <th>CategoryID</th>
                  <th>CategoryName</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.categoryId}>
                      <td>{category.categoryId}</td>
                      <td>{category.categoryName}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(category)}>
                          Sửa
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(category.categoryId)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Chưa có danh mục nào</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <form className="category-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tên danh mục"
              value={formData.categoryName}
              onChange={handleChange}
              className="category-input"
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

export default CategoryManagement;