import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchProduct.module.scss";
import useProducts from "../../hooks/useProducts";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SearchProduct = ({ token }) => {
  const [input, setInput] = useState("");
  const [renderProducts, setRenderProduct] = useState([]);
  const products = useProducts(token);
  const navigate = useNavigate(); // Hook for navigation

  const onChangeHandler = (event) => {
    const searchValue = event.target.value;
    setInput(searchValue);

    const newProduct = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setRenderProduct(newProduct);
  };

  const onProductSelect = (productId) => {
    setInput("");
    setRenderProduct([]);
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
  }, [renderProducts]);

  return (
    <div className={styles.searchContainer}>
      <Autocomplete
      freeSolo
      options={renderProducts}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
      PopperProps={{ style: { zIndex: 2000 } }}
      inputValue={input}
      open={Boolean(renderProducts.length && input)}
      onClose={() => setRenderProduct([])}
      onInputChange={(event, newInput) => {
        setInput(newInput);
        const newProduct = products.filter((product) =>
          product.name.toLowerCase().includes(newInput.toLowerCase())
        );
        console.log('Всього продуктів:', products.length);
        console.log('Перший продукт структура:', products[0]);
        console.log('Знайдено результатів:', newProduct.length);
        if (newProduct.length > 0) {
          console.log('Перший результат:', newProduct[0]);
        }
        setRenderProduct(newProduct);
      }}
      onChange={(event, selected) => {
        if (!selected) return;
        // selected може бути string (freeSolo) або об'єкт
        if (typeof selected === 'string') {
          // Спробуємо знайти точне співпадіння по назві
          const found = products.find(
            (p) => p.name.toLowerCase() === selected.toLowerCase()
          );
          if (found && found.id_bas) {
            onProductSelect(found.id_bas);
          } else {
            console.warn('Введений текст не відповідає жодному продукту:', selected);
          }
          return;
        }
        if (selected.id_bas) {
          onProductSelect(selected.id_bas);
        } else {
          console.warn('Продукт без id_bas:', selected);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"  
          size="medium"
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '12px 24px',
              gap: '12px',
              borderRadius: '100px',
              '& fieldset': {
                borderColor: '#45525c',
              },
              '&:hover fieldset': {
                borderColor: '#45525c',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#45525c',
                borderWidth: '1px',
      }, 
            },
            '& .MuiOutlinedInput-input': {
              padding: 0,
            },
            '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
              padding: '0px 0px 0px 5px',
            }
          }}  
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id_bas}>
          {option.name}
        </li>
      )}
      sx={{ width: 345 }} 
      />

      {/* Temporary fallback dropdown for debugging styles/visibility */}
      {renderProducts.length > 0 && input && (
        <div className={styles.resultsContainer}>
          {renderProducts.map((opt) => (
            <div
              key={opt.id_bas}
              className={styles.nomenclaturaLink}
              onMouseDown={() => onProductSelect(opt.id_bas)}
            >
              <a>{opt.name}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
