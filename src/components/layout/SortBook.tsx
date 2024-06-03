import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQueryParam,
  setQueryParams,
} from '../../redux/slices/QueryParamsSlice';

const sortingOptions = [
  { label: 'Popular', type: 'popular', sortBy: null, order: null },
  { label: 'Recommend', type: 'recommend', sortBy: null, order: null },
  { label: 'Newest', type: null, sortBy: 'created_at', order: 'DESC' },
  { label: 'Oldest', type: null, sortBy: 'created_at', order: 'ASC' },
  { label: 'Price Low to High', type: null, sortBy: 'price', order: 'ASC' },
  { label: 'Price High to Low', type: null, sortBy: 'price', order: 'DESC' },
];

const shows = [5, 20, 50, 100];

function SortBook() {
  const { type, sortBy, order, total, offset, limit } = useSelector(
    (state: any) => state.queryParams,
  );
  const sortSelected = sortingOptions.find(
    (option) => option.sortBy === sortBy && option.order === order,
  );
  const [sort, setSort] = useState(sortSelected?.label || 'Newest');
  const [show, setShow] = useState(limit);

  const dispatch = useDispatch();

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSort(value);

    const sortOption = sortingOptions.find((option) => option.label === value);
    dispatch(
      setQueryParams({
        sortBy: sortOption?.sortBy,
        order: sortOption?.order,
      }),
    );
  };

  const handleShowChange = (event: SelectChangeEvent) => {
    const value = +event.target.value;
    setShow(value);
    dispatch(setQueryParam({ name: 'limit', value }));
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">
        Showing {offset + 1}-{Math.min(limit, total)} of {total} books
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} onChange={handleSortChange} label="Sort By">
            {sortingOptions.map((option, index) => (
              <MenuItem key={index} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="show-label">Show</InputLabel>
          <Select
            labelId="show-label"
            id="show-select"
            value={show + ''}
            label="Show"
            onChange={handleShowChange}
          >
            {shows.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default SortBook;
