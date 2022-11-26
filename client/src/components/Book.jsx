import { styled, Typography, Box } from '@mui/material'
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import React,{useEffect} from 'react'

const Get_BOOK = gql`
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

function Book() {
  const { id } = useParams()
  const { data, loading, error , refetch } = useQuery(Get_BOOK, {
    variables: {
    "id": id
    }
  });
  // console.log('single book',data.getBook.authorId)

 

  const StyledBox = styled(Box)({
    backgroundColor: "background.paper",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems:'center',
    height:'60%',
    gap:'20px',
    marginLeft: "250px",
  });
  if(loading) return <p>loading...</p>
  if(error) return <p>Error!</p>
  return (
  <>
<StyledBox>
  <Typography variant='h5' align='center'>
    Book Information
  </Typography>
  <br/>
  <img style={{width:"450px"}} src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80" alt="/" />
  <Typography>
Book Name: 
{data.getBook.title}
  </Typography>
  <Typography>
    Author :
    {data.getBook.author.name}
  </Typography>
  <Typography>
    Do you want edit book?
    <Link to={`/edit-book/${data.getBook._id}`}>
     click 
    </Link>
  </Typography>
  <Typography>
    Do you want edit author?
    <Link to={`/edit-author/${data.getBook.authorId}`}>
     click 
    </Link>
  </Typography>
</StyledBox>
  </>
  )
}

export default Book