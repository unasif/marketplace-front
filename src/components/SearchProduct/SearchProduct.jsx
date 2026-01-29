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
    <Autocomplete
      freeSolo
      options={renderProducts}
      getOptionLabel={(option) => option.name}
      inputValue={input}
      onInputChange={(event, newInput) => {
        setInput(newInput);
        const newProduct = products.filter((product) =>
          product.name.toLowerCase().includes(newInput.toLowerCase())
        );
        console.log('Всього продуктів:', products.length);
        console.log('Знайдено результатів:', newProduct.length);
        console.log('Результати:', newProduct);
        setRenderProduct(newProduct);
      }}
      onChange={(event, selected) => {
        if (selected) {
          // Перевірка: selected може бути строка (freeSolo) або об'єкт (вибір зі списку)
          if (typeof selected === 'string') {
            // freeSolo ввід - користувач написав текст і натиснув Enter
            console.warn('Пошук за довільним текстом не підтримується');
            return;
          }
          if (selected.id_bas) {
            onProductSelect(selected.id_bas);
          } else {
            console.warn('Продукт без id_bas:', selected);
          }
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
  );
};

export default SearchProduct;
