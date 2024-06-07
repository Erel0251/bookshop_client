import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { Book } from '../types/Book';
import BookCard from '../components/layout/BookCard';
import CardSlider from '../components/layout/CardSlider';
import { DASHBOARD_BOOKS_QUERY } from '../queries/book-query';
import { useState } from 'react';
import { LowestPromotionPrice } from '../utils/LowestPromotionPrice.helper';

const SelectSlider = ({ data }: { data: any }) => {
  const [selectedSlider, setSelectedSlider] = useState('sale');

  const sales = LowestPromotionPrice(data.sale);
  const recommends = LowestPromotionPrice(data.recommend);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonGroup>
        <Button onClick={() => setSelectedSlider('popular')}>Popular</Button>
        <Button onClick={() => setSelectedSlider('sale')}>Sale</Button>
        <Button onClick={() => setSelectedSlider('recommend')}>
          Recommend
        </Button>
      </ButtonGroup>

      {selectedSlider === 'popular' && <CardSlider cards={data.popular} />}
      {selectedSlider === 'sale' && <CardSlider cards={sales} />}
      {selectedSlider === 'recommend' && <CardSlider cards={recommends} />}
    </Box>
  );
};

function Home() {
  const { data, loading, error } = useQuery(DASHBOARD_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <Box className="body">
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: '2rem',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Newest Books
          </Typography>
          <Link href="/shop" variant="body2" color="primary">
            View all
          </Link>
        </Box>
        <Grid container spacing={2}>
          {data.books.data.map((launch: Book, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BookCard book={launch} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container>
        <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
          Popular Books
        </Typography>
        <SelectSlider data={data} />
      </Container>
    </Box>
  );
}

export default Home;
