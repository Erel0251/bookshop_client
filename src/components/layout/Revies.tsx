import { Box, Card, CardContent, CardHeader, Container, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { Review } from '../../types/Review';

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


function ReviewCard({ review }: { review: Review }) {
  return (
    <Box>
      <CardHeader
        key={review.id}
        title={review.title}
        subheader={`${review.rating} Star`}
      />
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

function Reviewers({ reviews }: { reviews?: Review[] }) {
  /*
      <Pagination count={10} shape="rounded" />
  */
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
    </Card>
  );
}

export default Reviewers;