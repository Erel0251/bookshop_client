import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Book } from '../types/Book';
import BookCard from '../components/layout/BookCard';
import { Category } from '../types/Category';
import { useState } from 'react';

const BOOK_QUERY = gql`
  query {
    books {
      id
      title
      author
      publisher
      img_urls
      price
      sale_price
      status
      currency
      inventory
    }
  }
`;

const CATEGORY_QUERY = gql`
  query {
    categories {
      name
      children {
        name
      }
    }
  }
`;

function ListProducts() {
  const { data, loading, error } = useQuery(BOOK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <Grid container spacing={2}>
      {data.books.map((book: Book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
}

function CategoryFilter() {
  const { data, loading, error } = useQuery(CATEGORY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <Container>
      <Typography variant="h5" color="initial">
        Filter By
      </Typography>
      <Card variant="outlined">
        <CardHeader title="Category" />
        <CardContent>
          {data.categories.map((category: Category) => (
            <Button variant="text" size="small" key={category.name}>
              {category.name}
            </Button>
          ))}
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader title="Author" />
        <CardContent>
          <Typography variant="body1">Author 1</Typography>
          <Typography variant="body1">Author 2</Typography>
          <Typography variant="body1">Author 3</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader title="Rating Review" />
        <CardContent>
          <Typography variant="body1">1 Star</Typography>
          <Typography variant="body1">2 Star</Typography>
          <Typography variant="body1">3 Star</Typography>
          <Typography variant="body1">4 Star</Typography>
          <Typography variant="body1">5 Star</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

function SortFilter() {
  const [sortBy, setSortBy] = useState('');
  const [show, setShow] = useState(20);

  const sortBys = [
    'on sale',
    'popular',
    'newest',
    'price: low to high',
    'price: high to low',
  ];
  const shows = [20, 50, 100];

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleShowChange = (event: SelectChangeEvent) => {
    setShow(+event.target.value);
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
      <Typography variant="body1">Showing 1-12 of 126 books</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={sortBy}
            label="Sort By"
            onChange={handleSortChange}
          >
            {sortBys.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
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

function Shop() {
  /*
    <Container sx={{ display: 'flex', flexDirection: 'column',}}>
      <ListProducts />
      <Pagination count={10} shape="rounded"/>
      
    </Container>

  */

  return (
    <Box className="body">
      <Grid container spacing={2}>
        <Grid item xs={0} md={2}>
          <CategoryFilter />
        </Grid>
        <Grid item xs>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <SortFilter />
            <ListProducts />
            <Pagination count={10} shape="rounded" />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Shop;
