import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Review } from '../../types/Review';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  clearQueryParams,
  setReviewQueryParam,
  setReviewQueryParams,
} from '../../redux/slices/ReviewSlice';

const sortingOptions = [
  { label: 'Newest to Oldest', sortBy: 'created_at', order: 'DESC' },
  { label: 'Oldest to Newest', sortBy: 'created_at', order: 'ASC' },
  { label: 'Low to High', sortBy: 'rating', order: 'ASC' },
  { label: 'High to Low', sortBy: 'rating', order: 'DESC' },
];

const shows = [5, 10, 20, 50];

function Summary({
  total = 0,
  average = 0,
  details = [0, 0, 0, 0, 0],
}: {
  total?: number;
  average?: number;
  details?: number[];
}) {
  const dispatch = useAppDispatch();
  const choosed = useAppSelector((state: any) => state.review.rating);
  console.log(choosed);
  const handleOnClick = (rating: number) => {
    dispatch(clearQueryParams());
    dispatch(setReviewQueryParam({ name: 'rating', value: rating }));
  };

  const handleReset = () => {
    dispatch(clearQueryParams());
  };

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
        <Typography variant="h5" gutterBottom>
          Customer Reviews
        </Typography>
        <Button onClick={() => handleReset()}>
          <Link gutterBottom>Clear Filter</Link>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <Typography variant="h3" color="initial" fontWeight={700}>
          {average} Star
        </Typography>
        <Typography variant="body1" color="initial">
          {total} ratings
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {details.map((rating, index) => (
          <>
            {rating === 0 ? (
              <Button variant={'text'} disabled>
                <Typography variant="body2" color="inital">
                  {index + 1} Star ({rating})
                </Typography>
              </Button>
            ) : (
              <Button variant={'text'} onClick={() => handleOnClick(index + 1)}>
                <Typography variant="body2" color="primary">
                  {index + 1} Star ({rating})
                </Typography>
              </Button>
            )}
          </>
        ))}
      </Box>
    </Container>
  );
}

function SortFilter({ total = 0 }: { total?: number }) {
  const dispatch = useAppDispatch();
  const { offset, limit, sortBy, order } = useAppSelector(
    (state: any) => state.review,
  );
  const sortSelected = sortingOptions.find(
    (option) => option.sortBy === sortBy && option.order === order,
  );
  const [sort, setSortBy] = useState(sortSelected?.label || 'Newest to Oldest');
  const [show, setShow] = useState(limit);

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSortBy(event.target.value);

    const sortOption = sortingOptions.find((option) => option.label === value);
    dispatch(
      setReviewQueryParams({
        sortBy: sortOption?.sortBy,
        order: sortOption?.order,
      }),
    );
  };

  const handleShowChange = (event: SelectChangeEvent) => {
    const value = +event.target.value;
    setShow(value);
    dispatch(setReviewQueryParams({ offset: 0, limit: value }));
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
      <Typography variant="body1">
        Showing {offset + 1}-{Math.min(limit + offset, total)} of {total} books
      </Typography>
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
            value={sort}
            label="Sort By"
            onChange={handleSortChange}
          >
            {sortingOptions.map((option, index) => (
              <MenuItem value={option.label} key={index}>
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
    </Container>
  );
}

function ReviewCard({ review }: { review: Review }) {
  // format date
  const date = new Date(review.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
        <Typography variant="body2">{date}</Typography>
      </CardContent>
      <Divider />
    </Box>
  );
}

function Reviewers({
  total = 0,
  average,
  details,
  reviews,
}: {
  total?: number;
  average?: number;
  details: number[];
  reviews: Review[];
}) {
  const dispatch = useAppDispatch();
  const { limit, rating } = useAppSelector((state: any) => state.review);
  const pageCount = rating
    ? Math.ceil(details[rating - 1] / limit)
    : Math.ceil(total / limit);
  const count = rating ? details[rating - 1] : total;
  const onChangePage = (event: any, page: number) => {
    console.log(event.target.value, page);
    const offset = (page - 1) * limit;
    dispatch(setReviewQueryParam({ name: 'offset', value: offset }));
  };

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
      <Summary total={total} average={average} details={details} />
      {reviews && reviews.length !== 0 ? (
        <>
          <SortFilter total={count} />
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
          <Pagination
            count={pageCount}
            defaultPage={pageCount}
            color="primary"
            shape="rounded"
            onChange={onChangePage}
          />
        </>
      ) : (
        <Typography variant="body1" color="initial">
          No reviews found
        </Typography>
      )}
    </Card>
  );
}

export default Reviewers;
