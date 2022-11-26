import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Button, styled, Typography, Box, TextField } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";

const EDIT_BOOK = gql`
  mutation EditBook($id: ID!, $title: String!) {
    editBook(_id: $id, title: $title) {
      msg
      status
    }
  }
`;
const GET_BOOK = gql`
query GetBook($id: ID!) {
  getBook(_id: $id) {
    _id
    title
    authorId
    author {
      name
    }
  }
}
`


function EditBook() {
  const [title, setTitle] = useState('');
  const{id} = useParams()
  const [EditBook] = useMutation(EDIT_BOOK);
  const{data, loading, error} = useQuery(GET_BOOK,{variables:{
    "id": id
  }})
  // console.log(data.getBook.title)
  
  useEffect(() => {
    if (data) {
      setTitle(data.getBook.title);
    }
  }, [data]);

  const SubmitEdit = async () => {
    if(!title) return alert('plz complete from')
    try {
      const {
        data:{
          editBook:{status},
        },
      } = await EditBook({
        variables:{
          "title": title,
          "id": id,
        }
      });
      console.log(status)
      if(status === 200){
        // setTitle("");
        return alert('success, book edited'),
        window.location.assign('http://localhost:3000/book/1669443435630427449');
      }
      if(status !== 200) return alert('Error')
    } catch (error) {
      console.log(error)
      return alert('Error!')
      
    }
  };

if(loading) return <p>loading...</p>
if(error) return <p>Error!</p>
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
        <Typography variant="h2" align="center">
          Edit Book
        </Typography>
     
        <TextField id="standard-basic" label="Edit Book" variant="standard" 
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        placeholder="edit book"
        />
        <Button variant='contained' onClick={SubmitEdit}>Submit</Button>
      </Box>
    </>
  );
}

export default EditBook;
