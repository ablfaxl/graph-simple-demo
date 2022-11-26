import React from "react";
import AnimatedText from "react-animated-text-content";
import { Box, Typography } from "@mui/material";
function Feed() {
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
        <br />
      
        <Box sx={{position:'relative',left:'180px'}}>
        
        <AnimatedText
          type="My first Apollo app 🚀" // animate words or chars
          animation={{
            x: "200px",
            y: "-20px",
            scale: 1.1,
            ease: "ease-in-out",
          }}
          animationType="float"
          interval={0.06}
          duration={0.8}
          tag="h1"
          // className="animated-paragraph"
          includeWhiteSpaces
          threshold={0.1}
          rootMargin="20%"
        >
          My first Apollo app 🚀
        </AnimatedText>
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
          alt=""
        />
        </Box>
     
      </Box>
    </>
  );
}

export default Feed;
