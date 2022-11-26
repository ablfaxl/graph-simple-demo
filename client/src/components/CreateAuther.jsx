import { Button, TextField, Typography, Box, styled } from "@mui/material";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_AUTHER = gql`
  mutation Mutation($name: String!) {
    createAuthor(name: $name) {
      msg
      status
    }
  }
`;

function CreateAuther() {
  const [name, setName] = useState("");
  const [mutateFunction] = useMutation(ADD_AUTHER);

  const addAuther = async () => {
    if (!name) return alert("plz fill create authers");
    const {
      data: {
        createAuthor: { status, msg },
      },
    } = await mutateFunction({
      variables: {
        name: name,
      },
    });
    console.log(status, msg);
  };
  // console.log("create authers", ADD_AUTHER);

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
        <Typography variant="h4" align="center">
          create authers😎
        </Typography>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          // ina ro bayad ba hook form bznm
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={addAuther}>
          Create Auther
        </Button>
      </Box>  
    </>
  );
}

export default CreateAuther;
