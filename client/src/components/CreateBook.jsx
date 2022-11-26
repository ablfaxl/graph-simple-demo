import React, { useState } from "react";
import { Box, Typography, TextField, Button, styled, Input } from "@mui/material";
import { useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      msg
      status
    }
  }
`;


const GET_ATHORS = gql`
  query Query {
    getAuthors {
      _id
      name
      createdAt
    }
  }
`;

function CreateBook() {
  const [title, setTitle] = useState("");
  const [athurId, setAthurId] = useState('choose');
  const [CreateBook] = useMutation(CREATE_BOOK);
  const { data, loading, error } = useQuery(GET_ATHORS);
  // console.log(data)
    // console.log('id==>',data.getAuthors[0]._id)


  const addBook = async () => {
    if (!title) return alert("Please complete the form");
    try {
      const {
        data: {
          createBook: { status },
        },
      } = await CreateBook({
        variables: {
          "title": title,
          "authorId": athurId,
        },
      });
      console.log(status);
      if (status === 200) {
        setTitle("");
        return alert("Success, book added"),
         window.location.assign("http://localhost:3000/books");
      }
      if (status !== 200) return alert("sorry, something went wrong!");
    } catch (error) {
      console.log(error);
      return alert("Error!");
    }
  };


  if (error) return <p>Error!</p>;
  if (loading) return <p>Loading...</p>;
  // bksh option error dare
  return (
    <>
            <Box sx={{
    backgroundColor: "background.paper",
    width: "60%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "50px",
      }} ml={"250px"} flex={1} p={2} pb={20}>
        <Typography variant="h4" align="center" mb={2}>
          Create Book📕
        </Typography>
        <select
                name="authorlist"
                value={athurId}
                onChange={(e) => {console.log(e.target.value);setAthurId(e.target.value)}}
              >
          {data?.getAuthors.map((athors, i) => {
            return (
                  <>
              <option key={i} value={athors._id}>
                  {athors.name}
                </option>
              </>
            );
          })}
        </select>
        {/* <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          // ina ro bayad ba hook form bznm
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
        <Input type="text" placeholder="write book" value={title} onChange={(e)=> setTitle(e.target.value)} />
        <Button variant="contained" onClick={addBook}>
          Create Book
        </Button>
      </Box>
    </>
  );
}

export default CreateBook;
