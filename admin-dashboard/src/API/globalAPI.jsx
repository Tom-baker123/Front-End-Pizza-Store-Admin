import { useEffect, useState } from "react";

const CATEGORY_URL = "https://nhom6thu4sangca1.onrender.com/api/Category";
const TOPPING_URL = "https://nhom6thu4sangca1.onrender.com/api/Topping";
const SIZE_URL = "https://nhom6thu4sangca1.onrender.com/api/Size";
const PRODUCT_URL = "https://nhom6thu4sangca1.onrender.com/api/Product";
const PROMOTION_URL = "https://nhom6thu4sangca1.onrender.com/api/Promotion"; // Thêm URL cho Promotion

// Lấy danh sách danh mục với phân trang
export const getCategoriesList = async (pageSize = 10, pageNumber = 1) => {
  try {
    const response = await fetch(`${CATEGORY_URL}?PageSize=${pageSize}&PageNumber=${pageNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không lấy được danh sách danh mục");
    const data = await response.json();
    console.log("Danh sách danh mục:", data);
    return data.value.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Thêm danh mục mới
export const addCategory = async (categoryName) => {
  try {
    const response = await fetch(CATEGORY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ categoryName }),
    });
    if (!response.ok) throw new Error("Không thêm được danh mục");
    const data = await response.json();
    console.log("Danh mục mới:", data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Sửa danh mục
export const updateCategory = async (id, categoryName) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ categoryId: id, categoryName }),
    });
    if (!response.ok) throw new Error("Không sửa được danh mục");
    const data = await response.json();
    console.log("Danh mục đã sửa:", data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Xóa danh mục
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${CATEGORY_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không xóa được danh mục");
    console.log(`Đã xóa danh mục ID: ${id}`);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Hook để lấy tất cả danh mục
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategoriesList(10, 1);
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);
  return { categories, loading, error, refetch: fetchCategories };
};

// Lấy danh sách topping với phân trang
export const getToppingsList = async (pageSize = 10, pageNumber = 1) => {
  try {
    const response = await fetch(`${TOPPING_URL}?PageSize=${pageSize}&PageNumber=${pageNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không lấy được danh sách topping");
    const data = await response.json();
    console.log("Danh sách topping:", data);
    return data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Thêm topping mới
export const addTopping = async (name, price, isActive = true) => {
  try {
    const response = await fetch(TOPPING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, price, isActive }),
    });
    if (!response.ok) throw new Error("Không thêm được topping");
    const data = await response.json();
    console.log("Topping mới:", data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Sửa topping
export const updateTopping = async (toppingID, name, price, isActive) => {
  try {
    const response = await fetch(`${TOPPING_URL}/${toppingID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ toppingID, name, price, isActive }),
    });
    if (!response.ok) throw new Error("Không sửa được topping");
    const data = await response.json();
    console.log("Topping đã sửa:", data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Xóa topping
export const deleteTopping = async (toppingID) => {
  try {
    const response = await fetch(`${TOPPING_URL}/${toppingID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không xóa được topping");
    console.log(`Đã xóa topping ID: ${toppingID}`);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Hook để lấy tất cả topping
export const useToppings = () => {
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToppings = async () => {
    try {
      const data = await getToppingsList(10, 1);
      setToppings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchToppings(); }, []);
  return { toppings, loading, error, refetch: fetchToppings };
};

// Lấy danh sách size với phân trang
export const getSizesList = async (pageSize = 10, pageNumber = 1) => {
  try {
    const response = await fetch(`${SIZE_URL}?PageSize=${pageSize}&PageNumber=${pageNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không lấy được danh sách size");
    const data = await response.json();
    console.log("Danh sách size:", data);
    return data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Thêm size mới
export const addSize = async (name, additionalPrice) => {
  try {
    const response = await fetch(SIZE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, additionalPrice }),
    });
    if (!response.ok) throw new Error("Không thêm được size");
    const data = await response.json();
    console.log("Size mới:", data);
    return data.data || data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Sửa size
export const updateSize = async (sizeID, name, additionalPrice) => {
  try {
    const response = await fetch(`${SIZE_URL}/${sizeID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ sizeID, name, additionalPrice }),
    });
    if (!response.ok) throw new Error("Không sửa được size");
    const data = await response.json();
    console.log("Size đã sửa:", data);
    return data.data || data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Xóa size
export const deleteSize = async (sizeID) => {
  try {
    const response = await fetch(`${SIZE_URL}/${sizeID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không xóa được size");
    console.log(`Đã xóa size ID: ${sizeID}`);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Hook để lấy tất cả size
export const useSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSizes = async () => {
    try {
      const data = await getSizesList(10, 1);
      setSizes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSizes(); }, []);
  return { sizes, loading, error, refetch: fetchSizes };
};

// Lấy danh sách sản phẩm với phân trang
export const getProductsList = async (pageSize = 10, pageNumber = 1) => {
  try {
    const response = await fetch(`${PRODUCT_URL}?PageSize=${pageSize}&PageNumber=${pageNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không lấy được danh sách sản phẩm");
    const data = await response.json();
    console.log("Danh sách sản phẩm:", data);
    return data.records;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Thêm sản phẩm mới với ImageURL và ImageFile
export const addProduct = async (name, description, price, categoryID, imageURL, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Price", price.toString());
    formData.append("CategoryID", categoryID.toString());
    formData.append("ImageURL", imageURL);
    if (imageFile) {
      formData.append("ImageFile", imageFile);
      console.log("File gửi lên:", imageFile);
    }

    const response = await fetch(PRODUCT_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lỗi từ server:", response.status, errorText);
      throw new Error(`Không thêm được sản phẩm: ${errorText}`);
    }
    const data = await response.json();
    console.log("Sản phẩm mới:", data);
    return data.data || data;
  } catch (error) {
    console.error("Lỗi trong addProduct:", error);
    throw error;
  }
};

// Sửa sản phẩm với ImageURL và ImageFile
export const updateProduct = async (id, name, description, price, categoryID, imageURL, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("Id", id.toString());
    formData.append("Name", name);
    formData.append("Description", description || ""); // Giá trị mặc định nếu description rỗng
    formData.append("Price", price.toString());
    formData.append("CategoryID", categoryID.toString());
    formData.append("ImageURL", imageURL || ""); // Đảm bảo ImageURL luôn có giá trị, dù là chuỗi rỗng
    if (imageFile) {
      formData.append("ImageFile", imageFile);
      console.log("File gửi lên:", imageFile);
    } else {
      console.log("Không có ImageFile mới được gửi lên");
    }

    // Debug dữ liệu gửi lên
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await fetch(`${PRODUCT_URL}/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lỗi từ server:", response.status, errorText);
      throw new Error(`Không sửa được sản phẩm: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    console.log("Sản phẩm đã sửa:", data);
    return data.data || data;
  } catch (error) {
    console.error("Lỗi trong updateProduct:", error);
    throw error;
  }
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${PRODUCT_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lỗi từ server:", response.status, errorText);
      throw new Error(`Không xóa được sản phẩm: ${errorText}`);
    }
    console.log(`Đã xóa sản phẩm ID: ${id}`);
    return true;
  } catch (error) {
    console.error("Lỗi trong deleteProduct:", error);
    throw error;
  }
};

// Hook để lấy tất cả sản phẩm
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProductsList(10, 1);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);
  return { products, loading, error, refetch: fetchProducts };
};
// Lấy danh sách promotion với phân trang
export const getPromotionsList = async (pageSize = 10, pageNumber = 1) => {
  try {
    const response = await fetch(`${PROMOTION_URL}?PageSize=${pageSize}&PageNumber=${pageNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) throw new Error("Không lấy được danh sách promotion");
    const data = await response.json();
    console.log("Danh sách promotion:", data);
    return data.records || data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Thêm promotion mới
export const addPromotion = async (name, description, discount, startDate, endDate, status = "true", model = "default") => {
  try {
    const requestData = {
      name,
      description,
      discount,
      startDate,
      endDate,
      status: status.toString(), // Đảm bảo gửi chuỗi "true" hoặc "false"
      model,
    };
    console.log("Dữ liệu gửi xuống backend (addPromotion):", requestData);

    const response = await fetch(PROMOTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Không thêm được promotion: ${errorText}`);
    }
    const data = await response.json();
    console.log("Promotion mới:", data);
    return data.data || data;
  } catch (error) {
    console.error("Lỗi trong addPromotion:", error);
    throw error;
  }
};

// Sửa promotion
export const updatePromotion = async (promotionID, name, description, discount, startDate, endDate, status, model = "default") => {
  try {
    const requestData = {
      promotionID,
      name,
      description,
      discount,
      startDate,
      endDate,
      status: status.toString(), // Đảm bảo gửi chuỗi "true" hoặc "false"
      model,
    };
    console.log("Dữ liệu gửi xuống backend (updatePromotion):", requestData);

    const response = await fetch(`${PROMOTION_URL}/${promotionID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Không sửa được promotion: ${errorText}`);
    }
    const data = await response.json();
    console.log("Promotion đã sửa:", data);
    return data.data || data;
  } catch (error) {
    console.error("Lỗi trong updatePromotion:", error);
    throw error;
  }
};

// Xóa promotion
export const deletePromotion = async (promotionID) => {
  try {
    console.log("Dữ liệu gửi xuống backend (deletePromotion):", { promotionID });

    const response = await fetch(`${PROMOTION_URL}/${promotionID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Không xóa được promotion: ${errorText}`);
    }
    console.log(`Đã xóa promotion ID: ${promotionID}`);
    return true;
  } catch (error) {
    console.error("Lỗi trong deletePromotion:", error);
    throw error;
  }
};

// Hook để lấy tất cả promotion
export const usePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromotions = async () => {
    try {
      const data = await getPromotionsList(10, 1);
      setPromotions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPromotions(); }, []);
  return { promotions, loading, error, refetch: fetchPromotions };
};