import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useProducts from "../../hooks/useProducts";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const VISIBLE_LIMIT = 5;

const SearchProduct = ({ token }) => {
  const [input, setInput] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const products = useProducts(token);
  const navigate = useNavigate();

  const filteredOptions = products.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  const hasMore = filteredOptions.length > VISIBLE_LIMIT;
  const remainingCount = filteredOptions.length - VISIBLE_LIMIT;

  // Перші 5 результатів + спеціальний елемент "Показати ще" якщо є більше
  const visibleOptions = input
    ? [
        ...filteredOptions.slice(0, VISIBLE_LIMIT),
        ...(hasMore
          ? [{ __showMore: true, count: remainingCount, query: input }]
          : []),
      ]
    : [];

  const onProductSelect = (productId) => {
    navigate(`/product/${productId}`);
    setInput("");
    setResetKey((prev) => prev + 1);
  };

  const onShowMore = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setInput("");
    setResetKey((prev) => prev + 1);
  };

  return (
    <Autocomplete
      key={resetKey}
      freeSolo
      options={visibleOptions}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        if (option.__showMore) return "";
        return option.name || "";
      }}
      open={input.length > 0 && visibleOptions.length > 0}
      onClose={() => {}}
      inputValue={input}
      onInputChange={(event, newInput) => {
        setInput(newInput);
      }}
      onChange={(event, selected) => {
        if (!selected) return;

        if (selected.__showMore) {
          onShowMore(selected.query);
          return;
        }

        if (typeof selected === "string") {
          const found = products.find(
            (p) => p.name.toLowerCase() === selected.toLowerCase()
          );
          if (found?.id_bas) onProductSelect(found.id_bas);
        } else if (selected.id_bas) {
          onProductSelect(selected.id_bas);
        }
      }}
      // Відключаємо фільтрацію — ми самі керуємо списком
      filterOptions={(options) => options}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;

        if (option.__showMore) {
          return (
            <li
              key="show-more"
              {...otherProps}
              onClick={() => onShowMore(option.query)}
              style={{
                fontSize: "14px",
                color: "#13b3ba",
                fontWeight: 400,
                cursor: "pointer",
                padding: "8px 16px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              Показати ще {option.count} товар{getWordForm(option.count)}
            </li>
          );
        }

        return (
          <li
            key={option.id_bas || key}
            {...otherProps}
            style={{ fontSize: "14px" }}
          >
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
            "& .MuiOutlinedInput-root": {
              padding: "4px 24px",
              borderRadius: "100px",
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "#45525c" },
              "&:hover fieldset": { borderColor: "#45525c" },
              "&.Mui-focused fieldset": {
                borderColor: "#45525c",
                borderWidth: "1px",
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#45525c" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      slotProps={{
        popper: {
          sx: { zIndex: 2000 },
        },
      }}
    />
  );
};

// Відмінювання слова "товар" залежно від числа
const getWordForm = (count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return "ів";
  if (mod10 === 1) return "";
  if (mod10 >= 2 && mod10 <= 4) return "и";
  return "ів";
};

export default SearchProduct;