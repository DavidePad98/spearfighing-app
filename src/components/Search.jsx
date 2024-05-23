import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import {
  searchComment,
  searchPost,
  searchTicket,
  searchUser,
} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/sass/Search.scss";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.userData);
  const users = useSelector((state) => state.search.users);
  const posts = useSelector((state) => state.search.posts);
  const tickets = useSelector((state) => state.search.tickets);
  const comments = useSelector((state) => state.search.comments);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query && login && login.authorization) {
        dispatch(searchUser(login.authorization, query));
        dispatch(searchComment(login.authorization, query));
        dispatch(searchPost(login.authorization, query));
        dispatch(searchTicket(login.authorization, query));
      }
    }, 500),
    [dispatch, login]
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    debouncedSearch(value);
  };

  const hasResults =
    users.length > 0 ||
    posts.length > 0 ||
    tickets.length > 0 ||
    comments.length > 0;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1150 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1150, min: 790 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 790, min: 570 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 570, min: 0 },
      items: 2,
    },
  };

  if (!login) {
    return (
      <div className="bk vh-100 d-flex justify-content-center align-items-center flex-column">
        <div className="text-center bk-glass p-5 text-dark g">
          <p>Ci dispiace!</p>
          <p>
            Per accedere alla sezione discussioni hai bisogno di effettuare il
            Login
          </p>
          <Button as={Link} to="/login">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Container fluid className="search-container">
      <Form onSubmit={(e) => e.preventDefault()} className="text-center">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="cosa stai cercando?"
        />
      </Form>
      {loading && <p>Loading...</p>}
      {query && !loading && (
        <>
          {hasResults ? (
            <>
              {users.length > 0 && (
                <div>
                  <h2 className=" mb-5 text-center pt-5">Users</h2>
                  <Carousel responsive={responsive} arrows className="carousel">
                    {users.map((user) => (
                      <Card
                        key={user.id}
                        className="profile-card-s text-center bk-glass mx-2"
                      >
                        <Card.Img
                          variant="top"
                          src={user.profileImage}
                          className="profile-card-s-img"
                        />
                        <Card.Body>
                          <Card.Title className="title-profile">
                            {user.nickname}
                          </Card.Title>
                          <Button variant="primary" className="py-1 px-2">
                            Visita il profilo
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </Carousel>
                </div>
              )}
              {posts.length > 0 && (
                <div>
                  <h2 className=" mb-5 text-center pt-5">Posts</h2>
                  <Carousel responsive={responsive} arrows className="carousel">
                    {posts.map((post) => (
                      <Card
                        key={post.id}
                        className="profile-card-s text-center bk-glass mx-2"
                      >
                        <Card.Img variant="top" src={post.urlContent} />
                        <Card.Body>
                          <Card.Title className="title-profile">
                            {post.text}
                          </Card.Title>
                          <Button variant="primary" className="py-1 px-2">
                            Vedi Post
                          </Button>
                        </Card.Body>
                      </Card>
                    ))}
                  </Carousel>
                </div>

                // <Row >
                //   <h2>Posts</h2>
                //   <ul>
                //     {posts.map((post) => (
                //       <li key={post.id}>{post.text}</li>
                //     ))}
                //   </ul>
                // </Row>
              )}
              {tickets.length > 0 && (
                <Row>
                  <h2>Tickets</h2>
                  <ul>
                    {tickets.map((ticket) => (
                      <li key={ticket.id}>{ticket.title}</li>
                    ))}
                  </ul>
                </Row>
              )}
              {comments.length > 0 && (
                <Row>
                  <h2>Comments</h2>
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.id}>{comment.text}</li>
                    ))}
                  </ul>
                </Row>
              )}
            </>
          ) : (
            <h1>Nessun risultato</h1>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
