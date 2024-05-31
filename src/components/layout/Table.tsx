import { Add, Remove } from '@mui/icons-material';
import { Box, ButtonGroup, IconButton, Input, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// url cover example: https://edit.org/images/cat/book-covers-big-2019101610.jpg

export default function DataTable() {
  const formatPrice = (price: number, currency: string) =>
    price.toLocaleString('vi-VN', {
      style: 'currency',
      currency,
    });

  const onClickMinus = (row) => {
    const quantity = document.getElementById(
      `quantity${row.id}`,
    ) as HTMLInputElement;
    row.quantity = parseInt(row.quantity) - 1;
    quantity.value = row.quantity.toString();
  };

  const onClickPlus = (row) => {
    const quantity = document.getElementById(
      `quantity${row.id}`,
    ) as HTMLInputElement;
    row.quantity = parseInt(row.quantity) + 1;
    quantity.value = row.quantity.toString();
  };

  const cartColumns: GridColDef[] = [
    {
      field: 'img',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        <Box>
          <img
            src={params.row.img}
            alt={params.row.title}
            style={{ width: 'auto', height: '200px' }}
          />
        </Box>
      ),
    },
    {
      field: 'book',
      headerName: 'Book',
      renderCell: (params) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6">{params.row.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row.author}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 150,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {params.row.sale_price ? (
            <>
              <Typography className="card__originalPrice">
                {formatPrice(params.row.price, params.row.currency)}
              </Typography>
              <Typography variant="h5" color={'primary.light'}>
                {formatPrice(params.row.sale_price, params.row.currency)}
              </Typography>
            </>
          ) : (
            <Typography variant="h5" color={'primary.light'}>
              {formatPrice(params.row.price, params.row.currency)}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
      align: 'center',
      renderCell: (params) => (
        <ButtonGroup
          variant="contained"
          color="primary"
          sx={{ height: '2.5rem' }}
        >
          <IconButton onClick={() => onClickMinus(params.row)}>
            <Remove />
          </IconButton>
          <Input
            id={`quantity${params.row.id}`}
            type="text"
            placeholder={params.row.quantity + ''}
            sx={{ width: '2rem' }}
          />
          <IconButton onClick={() => onClickPlus(params.row)}>
            <Add />
          </IconButton>
        </ButtonGroup>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      align: 'right',
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
          <Typography fontWeight={700} variant="h5">
            {formatPrice(
              (params.row.sale_price ?? params.row.price) * params.row.quantity,
              params.row.currency,
            )}
          </Typography>
        </Box>
      ),
    },
  ];

  const cartRows = [
    {
      id: 1,
      img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
      title: 'Book 1',
      author: 'Author 1',
      price: 100,
      sale_price: 90,
      currency: 'USD',
      quantity: 1,
      total: 100,
    },
    {
      id: 2,
      img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
      title: 'Book 2',
      author: 'Author 2',
      price: 200,
      sale_price: null,
      currency: 'USD',
      quantity: 2,
      total: 360,
    },
    {
      id: 3,
      img: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
      title: 'Book 3',
      author: 'Author 3',
      price: 300,
      sale_price: 270,
      currency: 'USD',
      quantity: 3,
      total: 810,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={cartRows}
        rowHeight={200}
        columns={cartColumns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}