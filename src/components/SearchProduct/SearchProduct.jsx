import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useProducts from "../../hooks/useProducts";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SearchProduct = ({ token }) => {
  const [input, setInput] = useState("");
  const products = useProducts(token);
  const navigate = useNavigate();

  // Фільтруємо продукти на основі вводу
  const filteredOptions = products.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  const onProductSelect = (productId) => {
    navigate(`/product/${productId}`);
    setInput("");
  };

  return (
    <Autocomplete
      freeSolo
      options={input ? filteredOptions : []}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || "")}
      
      open={input.length > 0 && filteredOptions.length > 0}
      onClose={() => {}}
      
      inputValue={input}
      onInputChange={(event, newInput) => {
        setInput(newInput);
      }}

      onChange={(event, selected) => {
        if (!selected) return;

        if (typeof selected === 'string') {
          const found = products.find(
            (p) => p.name.toLowerCase() === selected.toLowerCase()
          );
          if (found && found.id_bas) onProductSelect(found.id_bas);
        } else if (selected.id_bas) {
          onProductSelect(selected.id_bas);
        }
      }}

      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <li key={option.id_bas || key} {...otherProps} style={{ fontSize: '14px' }}>
            {option.name}
          </li>
        );
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          sx={{
            width: 345,
            '& .MuiOutlinedInput-root': {
              padding: '4px 24px', // Зменшив padding, бо Autocomplete додає свої відступи
              borderRadius: '100px',
              backgroundColor: '#fff',
              '& fieldset': { borderColor: '#45525c' },
              '&:hover fieldset': { borderColor: '#45525c' },
              '&.Mui-focused fieldset': { borderColor: '#45525c', borderWidth: '1px' },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#45525c' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      // Щоб випадаючий список не перекривався
      slotProps={{
        popper: {
          sx: { zIndex: 2000 }
        }
      }}
    />
  );
};

export default SearchProduct;