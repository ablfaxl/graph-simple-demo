import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Authers from "./components/Authers";
import CreateAuther from "./components/CreateAuther";
import Books from "./components/Books";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import Book from "./components/Book";
import EditAuthor from "./components/EditAuthor";

function App() {
  useEffect(() => {
    document.title = "GraphQL_Demo";
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/authers" element={<Authers />} />
          <Route path="/create" element={<CreateAuther />} />
          <Route path="/books" element={<Books />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/edit-author/:id" element={<EditAuthor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
