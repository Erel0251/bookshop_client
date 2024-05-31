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
import { useDispatch } from 'react-redux';
import { setQueryParam } from '../../queries/queryParamsSlice';

/*
const sortBys = [
  {
    label: 'on sale',
    value: {
      onSale: true,
    },
  },
  {
    label: 'newest',
    value: {
      sortBy: 'createdAt',
      order: 'DESC',
    },
  },
  {
    label: 'oldest',
    value: {
      sortBy: 'created_at',
      order: 'ASC',
    },
  },
  {
    label: 'price: low to high',
    value: {
      sortBy: 'price',
      order: 'ASC',
    },
  },
  {
    label: 'price: high to low',
    value: {
      sortBy: 'price',
      order: 'DESC',
    },
  },
  {
    label: 'rating: high to low',
    value: {
      sortBy: 'rating',
      order: 'DESC',
    },
  },
  {
    label: 'rating: low to high',
    value: {
      sortBy: 'rating',
      order: 'ASC',
    },
  },
];
*/
const shows = [5, 20, 50, 100];

function SortBook({
  total,
  offset,
  limit,
}: {
  total: number;
  offset: number;
  limit: number;
}) {
  //const [sortBy, setSortBy] = useState('');
  const [show, setShow] = useState(20);

  const dispatch = useDispatch();

  /*
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    dispatch(setQueryParam({ name, value }));
  };
  */

  /*
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  */

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
