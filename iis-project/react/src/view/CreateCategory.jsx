import React, { useState, useRef, useEffect } from 'react';
import axiosClient from '../axios-client';
import { CategoryDropdown } from '../components/CategoryDropdown';

export const CreateCategory = () => {
  const nameRef = useRef();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [lastClickedCategoryId, setLastClickedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/getallcategories'); 
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [category]); //category in the dependency array so that the useEffect is called when the category is changed we make it null after creating a new category

  const showCategories = async (event) => {
    event.preventDefault();

    axiosClient.get('/getallcategories')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const request = {
        name: nameRef.current.value,
        parent_id: category ? category.id : null
      };
      const response = axiosClient.post('/createcategory', request);
      //unsets the selected category after successful creation
      //this weird part of code takes care of category being changed so it triggers the useEffect
      if(category == null) setCategory(-1);
      else setCategory(null);


      setLastClickedCategoryId(null);
      localStorage.setItem('is_logged', true);
      console.log(response);

      nameRef.current.value = '';

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Create a new category</h1>
      <input
        type="text"
        ref={nameRef}
        placeholder="Name"
      />
      <button onClick={handleCreate} className = 'primary-btn'>Create</button>
      {/* <button onClick={showCategories}>Show categories</button> */}
      <h2 style={{ fontWeight: 'bold' }}>Select a parent category:</h2>
      <div>
        {categories.map((category) => (
          <CategoryDropdown
            key={category.id} //toto 
            category={category}
            selectedCategory={category}
            setCategory={setCategory}
            lastClickedCategoryId={lastClickedCategoryId}
            setLastClickedCategoryId={setLastClickedCategoryId}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateCategory;
