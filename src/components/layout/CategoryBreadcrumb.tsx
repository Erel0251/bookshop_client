import { Breadcrumbs, Link, Typography } from '@mui/material';

function CategoryBreadcrumb() {
  return (
    <div role="presentation">
      <Breadcrumbs>
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

export default CategoryBreadcrumb;
