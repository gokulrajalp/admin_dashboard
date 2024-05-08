import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  useEffect(() => {
    axios.get('https://f891-103-175-108-236.ngrok-free.app/feed/item/', {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        const data = response.data.data;
        const categoriesData = data.map(item => {
          return {"id":item.id,  "text": item.id + " - " + item.category}
        });
        setCategories(categoriesData);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleActualPriceChange = (e) => {
    setActualPrice(e.target.value);
  };

  const handleOriginalPriceChange = (e) => {
    setOriginalPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddCategory = () => {
    axios.post('https://f891-103-175-108-236.ngrok-free.app/feed/categories/', { category: category, original_price: 0, selling_price : 0 }, {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        console.log('Category added successfully:', response.data);
        // Optionally, you can reset the category field after successful submission
        setCategory('');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    if(!categoryName || !title || !actualPrice || !description || !originalPrice){
      alert("Please fill all required fields")
    }
    if(!image){
      alert("Please select product image")
    }
    formData.append('product', categoryName);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('original_price', actualPrice);
    formData.append('selling_price', originalPrice);
    formData.append('total_price', 0);
    formData.append('product_image', image);

    axios.post('https://f891-103-175-108-236.ngrok-free.app/feed/products/create/', formData, {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "98547",
      },
    })
      .then(response => {
        console.log('Product added successfully:', response.data);
        setCategory('');
        setTitle('');
        setDescription('');
        setActualPrice('');
        setOriginalPrice('');
        setImage(null);
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <h2>Add Category</h2>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
                placeholder="Enter category"
              />
              <button className="btn btn-primary" onClick={handleAddCategory}>Add Category</button>
            </div>
          </div>
          <div>
            <h2>Add Product</h2>
            <select className="form-select mb-3" value={categoryName} onChange={handleCategoryNameChange}>
              <option value="">Select category *</option>
              {/* Assuming categories are fetched and stored in an array named categories */}
              {/* Replace with your actual category data */}
              {categories.map((element, index) => (
                <option key={index} value={element.id}>{element.text}</option>
              ))}
            </select>
            <input
              type="text"
              className="form-control mb-3"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter product title *"
            />
            <textarea
              className="form-control mb-3"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter product description *"
            />
            <input
              type="number"
              className="form-control mb-3"
              value={actualPrice}
              onChange={handleActualPriceChange}
              placeholder="Enter actual price/ MRP *"
            />
            <input
              type="number"
              className="form-control mb-3"
              value={originalPrice}
              onChange={handleOriginalPriceChange}
              placeholder="Enter original price *"
            />
            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImageChange}
            />
            <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
