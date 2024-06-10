import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const sampleData = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h3" textAlign={'center'} gutterBottom>
          Welcome to our bookstore!
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          elementum quis nulla a tincidunt. Morbi ullamcorper vulputate mauris.
          Maecenas augue tellus, consequat egestas varius vel, fermentum finibus
          lorem. Nulla facilisi. Ut accumsan ornare purus eu aliquet. Fusce in
          tortor metus. Etiam rhoncus sit amet nulla at scelerisque.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1">
          Cras in nisl ac ipsum ultricies euismod eu at nunc. Maecenas venenatis
          volutpat tincidunt. Aenean vitae nunc vel metus gravida venenatis.
          Nulla facilisi. Nunc lobortis, odio ornare cursus malesuada, purus
          ipsum vulputate leo, in pellentesque justo ipsum ac est. Maecenas
          vitae facilisis magna, nec volutpat sapien. Nunc molestie diam ipsum,
          ut mollis arcu gravida ac. Fusce sit amet posuere tellus. Morbi
          condimentum dolor ac ullamcorper dignissim. Pellentesque ornare nulla
          nisl.{' '}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          Our Vision
        </Typography>
        <Typography variant="body1">
          Maecenas nec cursus lorem. Aliquam quis mauris molestie augue egestas
          feugiat. Nulla fringilla diam in pellentesque venenatis. In varius
          nisl eget nibh varius, et posuere leo finibus. Nam sed suscipit massa.
          Morbi pellentesque dolor in ex consequat sagittis. Integer posuere
          mauris a dolor pretium, vitae faucibus quam tempor. Fusce tempus eros
          at fringilla faucibus. Proin quis ullamcorper mauris, sit amet
          ultricies est.{' '}
        </Typography>
      </Grid>
    </Grid>
  );
};

function About() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    axios
      .get('http://localhost:3000/about/view')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setData(undefined);
      });
  }, []);

  return (
    <Box className="body">
      <Container>
        <Card sx={{ p: '3rem' }}>
          <CardHeader title="About Us" />
          <Divider />
          {data ? (
            <CardContent dangerouslySetInnerHTML={{ __html: data }} />
          ) : (
            <CardContent>{sampleData()}</CardContent>
          )}
        </Card>
      </Container>
    </Box>
  );
}

export default About;
