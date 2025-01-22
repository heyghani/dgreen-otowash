"use client";
// import modules
import React from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

// import interfaces
import { TableFilterProps } from "./table.types";
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { updateFilter } from "@/store/slices/filterSlice";
import { updatePagination } from "@/store/slices/paginationSlice";

const TableSearch: React.FC<TableFilterProps> = ({ placeholder }) => {
  const dispatch = useAppDispatch();
  const { pagination, filter } = useSelector((state: RootState) => state);
  const [search, setSearch] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = React.useCallback(() => {
    dispatch(
      updateFilter({
        ...filter,
        query: query.trim(),
      })
    );
    dispatch(
      updatePagination({
        ...pagination,
        currentPage: 1,
      })
    );
  }, [query, dispatch, filter, pagination]);

  React.useEffect(() => {
    if (search) {
      dispatch(
        updateFilter({
          ...filter,
          query: query.trim(),
        })
      );
      dispatch(
        updatePagination({
          ...pagination,
          currentPage: 1,
        })
      );

      setSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //   handleSearch();
      setSearch(true);
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    //   handleSearch();
    setSearch(true);
  };

  return (
    <Box sx={{ width: "50%" }}>
      <Grid container spacing={2} justifyContent={"end"} alignItems="center">
        <Grid item>
          <TextField
            type="text"
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            value={query}
            onChange={handleQueryChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlass size={24} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {query && (
                    <IconButton onClick={handleClearQuery} size="small">
                      <X />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
              sx: { borderRadius: "12px" },
            }}
            inputProps={{
              sx: {
                padding: "8.5px",
                fontSize: "16px",
                fontFamily: "inherit",
                fontWeight: "400",
                color: "black",
                "&::placeholder": {
                  color: "#8D8D8D",
                  fontWeight: "500",
                  opacity: "1",
                },
              },
            }}
          />
        </Grid>
        <Grid item>
          <Box>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSearch}
              sx={{
                borderRadius: "12px",
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              fullWidth
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableSearch;
