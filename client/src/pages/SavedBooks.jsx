/* eslint-disable no-unused-vars */
import { useState } from 'react';

// Important for useQuery: We import the useQuery hook from @apollo/client
import { useMutation, useQuery } from '@apollo/client';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
// import LoginForm from '../components/LoginForm';
// import SignupForm from '../components/SignupForm';

import { QUERY_ME,  QUERY_BOOK  } from '../utils/queries';

import { REMOVE_BOOK } from '../utils/mutations';


const SavedBooks = () => {
  //const [thought, setThought] = useState({});

  const [removeBook, {error}] = useMutation(REMOVE_BOOK);

  // use this to determine if `useEffect()` hook needs to run again
  const { loading, data } = useQuery(QUERY_ME);  // QUERY_ME
  
  // Important for useQuery: We use the optional chaining operator to get the resulting profile from our query, or fallback to an empty array if the query isn't resolved yet
  const userData = data?.me || {};
  console.log("User: ", userData);
 const userDataLength = Object.keys(userData).length;
  // useQuery(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = async (bookId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await deleteBook(bookId, token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const updatedUser = await response.json();
  //     setUserData(updatedUser);
  //     // upon success, remove book's id from localStorage
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleDeleteBook = (bookId) => {
    console.log("ID: ", bookId);

    removeBook({
      variables: { bookId: bookId }
    })
  }

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (error) {
    return <h2>Error... {error}</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5 fluid">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks?.length} saved ${userData.savedBooks?.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
             (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
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
