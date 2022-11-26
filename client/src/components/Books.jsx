import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from "@mui/material";

const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      _id
      title
      authorId
      author {
        name
      }
      createdAt
    }
  }
`;

function Books() {
  const { data, loading, error } = useQuery(GET_BOOKS); 
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error!</p>;
  const StyledBox = styled(Box)({
    backgroundColor: "background.paper",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "60%",
    gap: "20px",
    marginLeft: "250px",
  });
  return (
    <>
      <Typography variant="h4" align="center" p={3}>
        Books😎
      </Typography>
      <StyledBox>
        {data.getBooks.map((book, i) => {
          return (
            <div key={i} style={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {/* <p>Author:</p>
                    {book.author.name} */}
                  </Typography>
                  <Typography variant="h5" component="div" align="center">
                    <p style={{ fontSize: "15px" }}>Book:</p>
                    {book.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/book/${book._id}`}>
                    <Button sx={{padding: 4}} size="small">See More to info of author</Button>
                  </Link>
                      
                </CardActions>
              </Card>
            </div>
          );
        })}
      </StyledBox>
    </>
  );
}

export default Books;
