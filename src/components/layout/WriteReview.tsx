import axios from 'axios';
import { useAppSelector } from '../../hooks/redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';

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

export default WriteReview;
