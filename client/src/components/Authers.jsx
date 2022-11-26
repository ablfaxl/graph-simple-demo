import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  recomposeColor,
  styled,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
query Query {
  getAuthors {
    _id
    name
    createdAt
  }
}
`;

function Authers() {
  const StyledBox = styled(Box)({
    backgroundColor: "background.paper",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    height:'60%',
    gap:'20px',
    marginLeft: "250px",
  });

  const { data, loading, error } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
    console.log('===>',data)
  return (
    <>
      <StyledBox>
        <Typography variant="h4" align="center">
          {/* {data.getAuthors[0].name} */}
          {data.getAuthors.map((auther, i) => {
            return (
              <div key={i} style={{display:'flex', justifyContent:''}}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Author
                    </Typography>
                    <Typography variant="h4" component="div">
                      {auther.name}
                    </Typography>
                    <Typography variant="subtitle2"sx={{fontSize:'10px'}}> created at:{auther.createdAt}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </Typography>
      </StyledBox>
    </>
  );
}

export default Authers;
