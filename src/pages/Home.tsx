import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Container, Grid, Typography } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import { Book } from '../types/Book';
import BookCard from '../components/layout/BookCard';
import CardSlider from '../components/layout/CardSlider';

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

function Home() {
  /*
  const [bookData, setBookData] = useState([] as Book[]);
  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get('http://localhost:3000/book'); // Replace with your API endpoint
      // setBookData(response.data as Book[]);
    };

    fetchData();
  }, []);
  */
  const { data, loading, error } = useQuery(BOOK_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

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
      <Container>
        <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
          Featured Books
        </Typography>
        <CardSlider cards={data.books} />
      </Container>
    </Box>
  );
}

export default Home;
