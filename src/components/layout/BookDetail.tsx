import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { formatName } from '../../utils/Format.helper';
import { Book } from '../../types/Book';

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

export default BookDetail;
