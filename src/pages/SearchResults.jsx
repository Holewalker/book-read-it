import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box, Button } from '@mui/material';
import { searchBooks } from '../api/bookApi';
import BookList from '../components/BookListItems';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await searchBooks(query, page, 6);
        setBooks(result.content || []);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error('Error en la búsqueda:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() !== '') {
      fetch();
    }
  }, [query, page]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Resultados de búsqueda para: "{query}"
      </Typography>

      {loading ? (
        <Box p={4}><CircularProgress /></Box>
      ) : books.length === 0 ? (
        <Typography>No se encontraron libros.</Typography>
      ) : (
        <>
          <BookList books={books} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
              sx={{ mr: 2 }}
            >
              Anterior
            </Button>
            <Typography sx={{ mt: 1 }}>Página {page + 1} de {totalPages}</Typography>
            <Button
              variant="outlined"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((prev) => prev + 1)}
              sx={{ ml: 2 }}
            >
              Siguiente
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchResults;
