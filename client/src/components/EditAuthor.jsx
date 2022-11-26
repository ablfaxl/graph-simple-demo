import { Button, TextField, Typography } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";

const EDIT_AUTHOR = gql`
  mutation EditAuthor($id: ID!, $name: String!) {
    editAuthor(_id: $id, name: $name) {
      msg
      status
    }
  }
`;
const GET_AUTHOR = gql`
  query getBooks($id: ID!) {
    getAuthor(_id: $id) {
      _id
      name
    }
  }
`;

function EditAuthor() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const [EditAuther] = useMutation(EDIT_AUTHOR);
  const { data, loading, error, refetch } = useQuery(GET_AUTHOR, {
    variables: {
      "id": id,
    },
  });
  useEffect(() => {
    if (data) {
      setName(data.getAuthor.name);
    }
  }, [data]);

  const SubmitEdit = async () => {
    if (!name) return alert("plz complete from");
    try {
      const {
        data: {
          editAuthor: { status },
        },
      } = await EditAuther({
        variables: {
          "name": name,
          "id": id,
        },
      });
      console.log(status);
      if (status === 200) {
        return alert("success, auther edited"),
        window.location.assign('http://localhost:3000/book/1669443435630427449');
      }
      if (status !== 200) return alert("Error");
    } catch (error) {
      console.log(error);
      return alert("Error!");
    }
  };
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          width: "60%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "50px",
        }}
        ml={"250px"}
        flex={1}
        p={2}
        pb={20}
      >
        <Typography variant="h2" align="center">
          Edit Author
        </Typography>

        <TextField
          id="standard-basic"
          label="Edit Book"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={SubmitEdit}>
          Submit
        </Button>
      </Box>
    </>
  );
}

export default EditAuthor;
