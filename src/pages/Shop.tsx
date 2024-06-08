import { useQuery } from '@apollo/client';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { Book } from '../types/Book';
import BookCard from '../components/layout/BookCard';
import { useEffect } from 'react';
import { BOOKS_QUERY } from '../queries/book-query';
import { useSelector } from 'react-redux';
import FilterBook from '../components/layout/FilterBook';
import SortBook from '../components/layout/SortBook';
import { useAppDispatch } from '../hooks/redux';
import { setQueryParams } from '../redux/slices/QueryParamsSlice';

function ListProducts({ books }: { books: Book[] }) {
  return (
    <Grid container spacing={2}>
      {books.map((book: Book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
}

function Shop() {
  const dispatch = useAppDispatch();
  const params = useSelector((state: any) => state.queryParams);

  const { data, loading, error, refetch } = useQuery(BOOKS_QUERY, {
    variables: {
      ...params,
      rating: params.rating ? parseFloat(params.rating) : null,
      fromPrice: params.fromPrice ? parseFloat(params.fromPrice) : null,
      toPrice: params.toPrice ? parseFloat(params.toPrice) : null,
    },
  });

  useEffect(() => {
    refetch({
      ...params,
      rating: params.rating ? parseFloat(params.rating) : null,
      fromPrice: params.fromPrice ? parseFloat(params.fromPrice) : null,
      toPrice: params.toPrice ? parseFloat(params.toPrice) : null,
    });
  }, [params, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  const pageCount = Math.ceil(data.books.total / params.limit);

  const onChangePage = (event: any, page: number) => {
    const offset = (page - 1) * params.limit;
    dispatch(setQueryParams({ offset }));
  };

  return (
    <Box className="body">
      <Grid container spacing={2}>
        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <FilterBook />
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
            <SortBook total={data.books.total} />
            <ListProducts books={data.books.data} />
            <Pagination
              count={pageCount}
              shape="rounded"
              onChange={onChangePage}
            />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Shop;
