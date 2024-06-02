import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from '../../queries/category-query';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Rating,
  Slider,
  Typography,
} from '@mui/material';
import { Category } from '../../types/Category';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CategoryTree } from '../../utils/CategoryTree.helper';
import { useDispatch } from 'react-redux';
import { setQueryParams } from '../../redux/QueryParamsSlice';
import { debounce } from 'lodash';

const CategoryItem = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={category.name} />
        {category.children?.length && (
          <IconButton onClick={handleToggle}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CategoryList categories={category.children} />
      </Collapse>
    </>
  );
};

const CategoryList = ({ categories }: { categories?: Category[] }) => {
  return (
    <List component="nav">
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </List>
  );
};

const PriceSlider = () => {
  const [value, setValue] = useState([0, 1000000]);
  const minDistance = 50000;

  const dispatch = useDispatch();

  const marks = [
    {
      value: 0,
      label: '0đ',
    },
    {
      value: 500000,
      label: '500,000đ',
    },
    {
      value: 1000000,
      label: '1,000,000đ',
    },
  ];

  const valueText = (value: number) => {
    return `$${value}`;
  };

  const debouncedDispatch = debounce((newValue) => {
    dispatch(
      setQueryParams({
        fromPrice: newValue[0],
        toPrice: newValue[1],
      }),
    );
  });

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    console.log(event.target);
    if (!Array.isArray(newValue)) {
      return;
    }

    debouncedDispatch(newValue);

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  return (
    <Slider
      getAriaLabel={() => 'Minimum distance'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valueText}
      step={10000}
      marks={marks}
      min={0}
      max={1000000}
      disableSwap
    />
  );
};

function FilterBook() {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  const categories = CategoryTree(data.categories);
  const stars = [5, 4, 3, 2, 1];

  return (
    <Card>
      <CardHeader title="Filter By" />
      <Divider />
      <Card variant="outlined">
        <CardHeader title="Category" />
        <CardContent>
          <CategoryList categories={categories} />
        </CardContent>
      </Card>
      <Box
        sx={{
          m: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}
      >
        {stars.map((star) => (
          <Link
            key={star}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}
            onClick={() => console.log(star)}
          >
            <Rating name="read-only" value={star} size="small" readOnly />
            <Typography variant="body1">{star} Star</Typography>
          </Link>
        ))}
      </Box>
      <Box sx={{ m: '2.5rem' }}>
        <Typography variant="h5">Price</Typography>
        <PriceSlider />
      </Box>
    </Card>
  );
}

export default FilterBook;
