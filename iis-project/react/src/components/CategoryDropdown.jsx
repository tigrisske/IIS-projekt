// CategoryDropdown.jsx

import React, { useState } from 'react';


export const CategoryDropdown = ({ category, selectedCategory, setCategory, lastClickedCategoryId, setLastClickedCategoryId }) => {


    const [isOpen, setIsOpen] = useState(false);
  
    
    const handleToggle = () => {
      setIsOpen(!isOpen);
      //the category is set to the last clicked category on toggle
      setCategory(category);
      setLastClickedCategoryId(category.id);
    };
  
    return (
      <div>
        <div>
          <button
            onClick={handleToggle}
            //if the current clicked category is the same as the selected category, make it bold
            style={{minWidth:195, fontWeight: lastClickedCategoryId === category.id ? 'bold' : 'normal' }}
          >
            {category.name}
          </button>
          {isOpen && (
            //each new open category should be placed a bit to the right
            <div style={{ marginLeft: '85px' }}>
              {category.children.map((child) => (
                <CategoryDropdown
                  key={child.id}
                  category={child}
                  selectedCategory={selectedCategory}
                  setCategory={setCategory}
                  lastClickedCategoryId={lastClickedCategoryId}
                  setLastClickedCategoryId={setLastClickedCategoryId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };