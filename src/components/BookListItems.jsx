import { List, ListItem, ListItemText, Typography, Box, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const BookListItems = ({ books, title }) => (
  <>
    <Typography variant="h5" gutterBottom>{title}</Typography>
    <List>
      {books.map((book) => (
        <ListItem key={book.id} divider>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/book/${book.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                    flexGrow: 1,
                  }}
                >
                  {book.title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ ml: 2, flexWrap: 'wrap' }}>
                  {book.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      component={Link}
                      to={`/tags/${tag}`}
                      clickable
                      variant="outlined"
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        height: '22px',
                        textTransform: 'lowercase'
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            }
            secondary={
              book.isbn ? (
                <Typography variant="body2" color="text.secondary">
                  ISBN: {book.isbn}
                </Typography>
              ) : null
            }
          />
        </ListItem>
      ))}
    </List>
  </>
);

export default BookListItems;
