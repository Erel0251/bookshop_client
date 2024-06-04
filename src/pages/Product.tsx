import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DETAIL_BOOK_QUERY } from '../queries/book-query';
import { useQuery } from '@apollo/client';
import { Book } from '../types/Book';
import { formatName, formatPrice } from '../utils/Format.helper';
import { Review } from '../types/Review';
import { useAppSelector } from '../hooks/redux';
import axios from 'axios';

function CategoryBreadcrumb() {
  return (
    <div role="presentation">
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          IT Book
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Database
        </Link>
        <Typography color="text.primary">Name Book</Typography>
      </Breadcrumbs>
    </div>
  );
}

function BookDetail({ book }: { book: Book }) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CardMedia
          component="img"
          width="300"
          image={book.img_urls[0]}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {formatName(book.author ?? book.publisher)}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CardContent>
          <Container>
            <Typography variant="h4" gutterBottom>
              {formatName(book.title)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {book.overview}
            </Typography>
          </Container>
        </CardContent>
      </Box>
    </Card>
  );
}

function AddToCart({ book }: { book: Book }) {
  const paid = book.sale_price ?? book.price;
  const original = book.sale_price ? book.price : undefined;

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '0.5rem',
          bgcolor: '#e0e0ee',
        }}
      >
        {original && (
          <Typography
            variant="h6"
            color={'gray'}
            sx={{ textDecoration: 'line-through' }}
          >
            {formatPrice(original, book.currency)}
          </Typography>
        )}
        <Typography variant="h4" fontWeight={900} color={'dark'}>
          {formatPrice(paid, book.currency)}
        </Typography>
      </CardContent>
      <Container
        sx={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Quantity
          </Typography>
          <ButtonGroup variant="contained" color="primary">
            <IconButton>
              <Remove />
            </IconButton>
            <TextField
              id="outlined-basic"
              label="quantity"
              variant="outlined"
            />
            <IconButton>
              <Add />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Button size="large" variant="contained" color="primary" fullWidth>
          Add to Cart
        </Button>
      </Container>
    </Card>
  );
}

function Summary() {
  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <Typography variant="h5" gutterBottom>
          Customer Reviews
        </Typography>
        <Typography variant="body2" gutterBottom>
          Filter by star rating
        </Typography>
      </Box>
      <Typography variant="h3" color="initial" fontWeight={700}>
        4.6 Star
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Typography variant="body2" color="initial">
          (4,201)
        </Typography>
        <Typography variant="body2" color="initial">
          5 Star (80%)
        </Typography>
        <Typography variant="body2" color="initial">
          4 Star (15%)
        </Typography>
        <Typography variant="body2" color="initial">
          3 Star (5%)
        </Typography>
        <Typography variant="body2" color="initial">
          2 Star (0%)
        </Typography>
        <Typography variant="body2" color="initial">
          1 Star (0%)
        </Typography>
      </Box>
    </Container>
  );
}

function TempReview() {
  return (
    <Box>
      <CardHeader title="Review Title" subheader="5 Star" />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          Cras quam dui, tempus et elementum sed, malesuada rhoncus ligula.
          Curabitur tristique vehicula lacus. Sed ut neque odio
        </Typography>
        <Typography variant="body2">April 22, 2024</Typography>
      </CardContent>
      <Divider />
    </Box>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Box>
      <CardHeader title={review.title} subheader={`${review.rating} Star`} />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {review.comment}
        </Typography>
        <Typography variant="body2">April 22, 2024</Typography>
      </CardContent>
      <Divider />
    </Box>
  );
}

function SortFilter() {
  const [sortBy, setSortBy] = useState('');
  const [show, setShow] = useState(20);

  const sortBys = ['date: newest to oldest', 'date: oldest to newest'];
  const shows = [20, 50, 100];

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleShowChange = (event: SelectChangeEvent) => {
    setShow(+event.target.value);
  };

  return (
    <Container
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
    </Container>
  );
}

function Reviewers({ reviews }: { reviews?: Review[] }) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Summary />
      <SortFilter />
      {reviews && reviews.map((review) => <ReviewCard review={review} />)}
      <Pagination count={10} shape="rounded" />
    </Card>
  );
}

function WriteReview({ bookId }: { bookId: string }) {
  const user = useAppSelector((state) => state.user.user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios
      .post(
        'http://localhost:3000/review',
        {
          book_id: bookId,
          user_id: user?.id,
          title: data.get('title'),
          comment: data.get('comment'),
          rating: data.get('rating'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            role: user?.roles,
          },
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card variant="outlined">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ padding: '1rem' }}
      >
        <CardHeader title="Write a Review" />
        <Divider />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <TextField
              id="title"
              name="title"
              label="Add a title"
              multiline
              rows={1}
              defaultValue=""
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              id="comment"
              name="comment"
              label="Details please! Your review helps other shoppers."
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              id="rating"
              name="rating"
              label="Select a rating"
              select
              fullWidth
              variant="outlined"
              defaultValue={5}
              required
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <MenuItem value={rating} key={rating}>
                  {rating} star
                </MenuItem>
              ))}
            </TextField>
            <Divider />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

function Product() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);

  const { data, loading, error } = useQuery(DETAIL_BOOK_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <Box className="body">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <CategoryBreadcrumb />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            <BookDetail book={data.book} />
          </Grid>
          <Grid item xs={4}>
            <AddToCart book={data.book} />
          </Grid>
          <Grid item xs={8}>
            <Reviewers reviews={data.book.reviews} />
          </Grid>
          {user && (
            <Grid item xs={4}>
              <WriteReview bookId={data.book.id} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default Product;
