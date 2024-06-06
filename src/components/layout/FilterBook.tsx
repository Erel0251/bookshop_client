import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from '../../queries/category-query';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemButton,
  Rating,
  Slider,
  Typography,
} from '@mui/material';
import { Category } from '../../types/Category';
import { useCallback, useState } from 'react';
import { ExpandLess, ExpandMore, Search } from '@mui/icons-material';
import { CategoryTree } from '../../utils/CategoryTree.helper';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQueryParam,
  setQueryParams,
} from '../../redux/slices/QueryParamsSlice';
import { debounce } from 'lodash';
import { formatName } from '../../utils/Format.helper';
import { PUBLISHERS_QUERY } from '../../queries/book-query';
import { useAppDispatch } from '../../hooks/redux';

const SearchBar = () => {
  const { search } = useSelector((state: any) => state.queryParams);
  const [input, setInput] = useState(search || '');

  const dispatch = useDispatch();

  const handleInput = (event: any) => {
    setInput(event.target.value);
  };

  const handleSearch = (keyword?: string) => {
    dispatch(
      setQueryParam({
        name: 'search',
        value: keyword || '',
      }),
    );
  };

  return (
    <Box>
      <CardHeader title="Search" />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InputBase
          sx={{ ml: '1rem', flex: 1 }}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={input}
          onChange={handleInput}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => handleSearch(input)}
        >
          <Search />
        </IconButton>
      </Box>
    </Box>
  );
};

const CategoryItem = ({
  category,
  depth = 0,
}: {
  category: Category;
  depth?: number;
}) => {
  const [open, setOpen] = useState(false);
  const { categories } = useSelector((state: any) => state.queryParams);
  const [checked, setChecked] = useState(categories.includes(category.name!));
  const dispatch = useDispatch();

  const handleCheckbox = (name: string) => {
    setChecked(!checked);
    dispatch(setQueryParam({ name: 'categories', value: name }));
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem sx={{ paddingLeft: `${depth}em` }}>
        <ListItemButton sx={{ px: 0 }}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ paddingY: 0 }}
                checked={checked}
                onChange={() => handleCheckbox(category.name!)}
              />
            }
            label={formatName(category.name!)}
          />
        </ListItemButton>
        {category.children?.length != 0 && (
          <IconButton onClick={handleToggle}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CategoryList categories={category.children} depth={depth + 1} />
      </Collapse>
    </>
  );
};

const CategoryList = ({
  categories,
  depth = 0,
}: {
  categories?: Category[];
  depth?: number;
}) => {
  return (
    <List component="nav">
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} depth={depth} />
      ))}
    </List>
  );
};

const PublisherList = () => {
  const dispatch = useAppDispatch();
  const { publishers } = useSelector((state: any) => state.queryParams);
  const { data, loading, error } = useQuery(PUBLISHERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  const handleCheckbox = (name: string) => {
    dispatch(setQueryParam({ name: 'publishers', value: name }));
  };

  // return list checkbox of publishers
  return (
    <FormGroup>
      {data.publishers.map((publisher: string) => (
        <FormControlLabel
          key={publisher}
          control={<Checkbox />}
          label={formatName(publisher)}
          onClick={() => handleCheckbox(publisher)}
          {...(publishers.includes(publisher) && { checked: true })}
        />
      ))}
    </FormGroup>
  );
};

const PriceSlider = () => {
  const { fromPrice, toPrice } = useSelector((state: any) => state.queryParams);
  const [value, setValue] = useState([fromPrice, toPrice]);
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

  const updateValue = useCallback(
    debounce((value: any) => {
      dispatch(
        setQueryParams({
          fromPrice: value[0],
          toPrice: value[1],
        }),
      );
    }, 300), // Adjust the debounce delay as needed
    [],
  );

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    console.log(event.target);
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    updateValue(newValue);
  };
  return (
    <>
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
    </>
  );
};

const RatingList = () => {
  //const rating = useSelector((state: any) => state.queryParams.rating);
  const dispatch = useDispatch();

  const handleRating = (rating: number) => {
    dispatch(setQueryParam({ name: 'rating', value: rating }));
  };

  const stars = [5, 4, 3, 2, 1];

  return (
    <Box
      sx={{
        marginX: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      }}
    >
      {stars.map((star) => (
        <Box
          key={star}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
          }}
          onClick={() => handleRating(star)}
        >
          <Rating name="read-only" value={star} size="small" readOnly />
          <Typography variant="body1">{star} Star</Typography>
        </Box>
      ))}
    </Box>
  );
};

function FilterBook({ categoriesSelected }: { categoriesSelected?: string[] }) {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  const addChecked = data.categories.map((category: Category) => {
    const newCategory = new Category(category);
    if (categoriesSelected?.includes(category.name!)) {
      newCategory.isChecked = true;
    }
    return newCategory;
  });
  const categories = CategoryTree(addChecked);

  const handleResetFilter = () => {
    // set categories, rating, price to default
    dispatch(
      setQueryParams({
        categories: [],
        rating: 0,
        fromPrice: 0,
        toPrice: 1000000,
      }),
    );
  };

  return (
    <Card>
      <SearchBar />
      <Divider />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <Typography variant="h5">Filter</Typography>
        <Box onClick={handleResetFilter}>
          <Link>Clear All</Link>
        </Box>
      </CardContent>
      <Divider />
      <Box>
        <CardHeader title="Category" />
        <CardContent>
          <FormGroup>
            <CategoryList categories={categories} />
          </FormGroup>
        </CardContent>
      </Box>
      <Divider />
      <Box>
        <CardHeader title="Publisher" />
        <CardContent>
          <PublisherList />
        </CardContent>
      </Box>
      <Divider />
      <CardHeader title="Rating" />
      <RatingList />
      <Box sx={{ m: '2.5rem' }}>
        <Typography variant="h5">Price</Typography>
        <PriceSlider />
      </Box>
    </Card>
  );
}

export default FilterBook;
