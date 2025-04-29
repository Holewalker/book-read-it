import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import BookListItems from '../components/BookListItems';
import TopicListItems from '../components/TopicListItems';
import { getBooksByTag } from '../api/tagApi';

const TagPage = () => {
    const { tagName } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchByTag = async () => {
            try {
                const [bookResults, topicResults] = await Promise.all([
                    getBooksByTag(tagName),
                ]);
                setBooks(bookResults);
            } catch (err) {
                console.error('Error al cargar contenido por tag:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchByTag();
    }, [tagName]);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Contenido etiquetado como "{tagName}"
            </Typography>

            {loading ? (
                <Typography>Cargando...</Typography>
            ) : (
                <>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom>Libros</Typography>
                        <BookListItems books={books} />
                    </Box>

                </>
            )}
        </Container>
    );
};

export default TagPage;
