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

function CategoryBreadcrumb() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
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

function BookDetail() {
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
          image="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
          alt="Image"
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            By (author) Someone
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CardContent>
          <Container>
            <Typography variant="h4" gutterBottom>
              Book Title
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse nulla ante, vulputate eget erat id, imperdiet ultrices
              felis. Donec lobortis ullamcorper diam. Quisque lacinia fringilla
              pellentesque. Aenean pretium id est nec dapibus. Cras ullamcorper
              gravida urna sit amet facilisis. Phasellus ultrices urna a gravida
              hendrerit. Donec augue purus, sagittis eget dolor vel, vulputate
              tempus lacus. Morbi hendrerit sagittis diam, maximus lobortis
              felis. Sed sed dolor vitae nisi ornare commodo in sed nunc.
            </Typography>
          </Container>
        </CardContent>
      </Box>
    </Card>
  );
}

function AddToCart() {
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
        <Typography
          variant="h6"
          color={'gray'}
          sx={{ textDecoration: 'line-through' }}
        >
          $49.99
        </Typography>
        <Typography variant="h4" fontWeight={900} color={'dark'}>
          $29.99
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

function Review() {
  return (
    <Box>
      <CardHeader title="Review" subheader="5 Star" />
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

function Reviewers() {
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
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />

      <Pagination count={10} shape="rounded" />
    </Card>
  );
}

function WriteReview() {
  return (
    <Card variant="outlined">
      <CardHeader title="Write a Review" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <TextField
            id="outlined-static"
            label="Add a title"
            multiline
            rows={1}
            defaultValue=""
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            label="Details please! Your review helps other shoppers."
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Select a rating"
            select
            fullWidth
            variant="outlined"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <MenuItem value={rating} key={rating}>
                {rating} star
              </MenuItem>
            ))}
          </TextField>
          <Divider />
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function Product() {
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
            <BookDetail />
          </Grid>
          <Grid item xs={4}>
            <AddToCart />
          </Grid>
          <Grid item xs={8}>
            <Reviewers />
          </Grid>
          <Grid item xs={4}>
            <WriteReview />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Product;
