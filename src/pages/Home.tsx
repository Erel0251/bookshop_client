import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { gql, useQuery } from '@apollo/client';

const BOOK_QUERY = gql`
  query {
    books {
      id
      title
      author
      publisher
      img_urls
      price
      status
      currency
      inventory
    }
  }
`;

interface Book {
  id: number;
  title: string;
  author?: string;
  publisher: string;
  img_urls: string[];
  price: number;
  status: string;
  currency: string;
  inventory: number;
}

function BookCard({ book }: { book: Book }) {
  const formatPrice = (book: Book) =>
    book.price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: book.currency,
    });

  return (
    <Card className="card">
      <CardMedia
        component="img"
        height={300}
        image={book.img_urls[0]}
        alt={book.title}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author ?? book.publisher}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '0.5rem',
        }}
      >
        <Typography className="card__originalPrice">
          {formatPrice(book)}
        </Typography>
        <Typography variant="h5" color={'primary.light'}>
          {formatPrice(book)}
        </Typography>
      </CardContent>
      <CardActions className="card__action">
        <Button variant="contained" size="medium" color="primary" fullWidth>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

function Home() {
  //const [bookData, setBookData] = useState([] as Book[]);
  const { data, loading, error } = useQuery(BOOK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  /*
  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get('http://localhost:3000/book'); // Replace with your API endpoint
      // setBookData(response.data as Book[]);
    };

    fetchData();
  }, []);
  */

  return (
    <Box className="body">
      <Container>
        <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
          Featured Books
        </Typography>
        <Grid container spacing={2}>
          {data.books.map((launch: Book, index: number) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <BookCard book={launch} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
