import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../graphql/queries'; 
import { DELETE_BOOK } from '../graphql/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // Fetch user data with Apollo Client
  const { loading, error, data } = useQuery(GET_ME);

  useEffect(() => {
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  // Define the deleteBook mutation
  const [deleteBook] = useMutation(DELETE_BOOK);

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await deleteBook({
        variables: { bookId },
      });

      if (data.deleteBook) {
        const updatedUser = { ...userData };
        updatedUser.savedBooks = updatedUser.savedBooks.filter((book) => book.bookId !== bookId);
        setUserData(updatedUser);
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Render loading state
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Render error state
  if (error) {
    console.error(error);
    return <h2>Error occurred while fetching data</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
