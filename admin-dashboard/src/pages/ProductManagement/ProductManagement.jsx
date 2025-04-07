import React, { useState } from "react";
import Header from "../../components/Header";
import "./ProductManagement.css";
import { useProducts, addProduct, updateProduct, deleteProduct, useCategories } from "../../API/globalAPI";

const ProductManagement = () => {
  const { products, loading: productsLoading, error: productsError, refetch } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    categoryID: "",
    imageURL: "",
    imageFile: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.name.trim() || !formData.price || !formData.categoryID || !formData.imageURL.trim()) {
  //     alert("Vui lòng điền đầy đủ các trường bắt buộc!");
  //     return;
  //   }

  //   console.log("Dữ liệu gửi lên:", formData);
  //   try {
  //     if (isEditing) {
  //       await updateProduct(
  //         formData.id,
  //         formData.name,
  //         formData.description,
  //         Number(formData.price),
  //         Number(formData.categoryID),
  //         formData.imageURL,
  //         formData.imageFile
  //       );
  //     } else {
  //       await addProduct(
  //         formData.name,
  //         formData.description,
  //         Number(formData.price),
  //         Number(formData.categoryID),
  //         formData.imageURL,
  //         formData.imageFile
  //       );
  //     }
  //     setFormData({ id: null, name: "", description: "", price: "", categoryID: "", imageURL: "", imageFile: null });
  //     setImagePreview(null);
  //     setIsEditing(false);
  //     setShowForm(false);
  //     refetch();
  //   } catch (err) {
  //     console.error("Lỗi khi xử lý sản phẩm:", err);
  //     alert("Lỗi: " + err.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.categoryID || !formData.imageURL.trim()) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }
  
    console.log("Dữ liệu gửi lên:", formData);
    try {
      if (isEditing) {
        await updateProduct(
          formData.id,
          formData.name,
          formData.description,
          Number(formData.price),
          Number(formData.categoryID),
          formData.imageURL,
          formData.imageFile
        );
      } else {
        await addProduct(
          formData.name,
          formData.description,
          Number(formData.price),
          Number(formData.categoryID),
          formData.imageURL,
          formData.imageFile
        );
      }
      setFormData({ id: null, name: "", description: "", price: "", categoryID: "", imageURL: "", imageFile: null });
      setImagePreview(null);
      setIsEditing(false);
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error("Lỗi khi xử lý sản phẩm:", err);
      alert("Lỗi: " + err.message);
    }
  };
  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryID: product.categoryID.toString(),
      imageURL: product.imageURL,
      imageFile: null,
    });
    setImagePreview(product.imageURL);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      refetch();
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      alert("Lỗi: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" && files[0]) {
      console.log("File selected:", files[0]);
      setFormData({ ...formData, imageFile: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      console.log(`Cập nhật ${name}: ${value}`);
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBack = () => {
    setFormData({ id: null, name: "", description: "", price: "", categoryID: "", imageURL: "", imageFile: null });
    setImagePreview(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const getCategoryName = (categoryID) => {
    const category = categories.find((cat) => cat.categoryId === categoryID);
    return category ? category.categoryName : "Không xác định";
  };

  if (productsLoading || categoriesLoading) return <div>Đang tải dữ liệu...</div>;
  if (productsError) return <div>Lỗi sản phẩm: {productsError}</div>;
  if (categoriesError) return <div>Lỗi danh mục: {categoriesError}</div>;

  return (
    <div className="product-management">
      <Header title="Quản lý sản phẩm" />
      <div className="product-content">
        {!showForm ? (
          <>
            <button className="add-btn" onClick={() => setShowForm(true)}>Thêm sản phẩm</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th>Hình ảnh</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price.toLocaleString("vi-VN")} VNĐ</td>
                      <td>{getCategoryName(product.categoryID)}</td>
                      <td><img src={product.imageURL} alt={product.name} style={{ width: "50px" }} /></td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(product)}>Sửa</button>
                        <button className="delete-btn" onClick={() => handleDelete(product.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7">Chưa có sản phẩm nào</td></tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                className="product-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả sản phẩm"
                className="product-input"
              />
            </div>
            <div className="form-group">
              <label>Giá (VNĐ)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Giá sản phẩm"
                className="product-input"
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Danh mục</label>
              <select
                name="categoryID"
                value={formData.categoryID}
                onChange={handleChange}
                className="product-input"
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>URL Hình ảnh</label>
              <input
                type="text"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleChange}
                placeholder="URL hình ảnh"
                className="product-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Hình ảnh (tùy chọn)</label>
              <input
                type="file"
                name="imageFile"
                onChange={handleChange}
                className="product-input"
                accept="image/*"
              />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
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

export default ProductManagement;