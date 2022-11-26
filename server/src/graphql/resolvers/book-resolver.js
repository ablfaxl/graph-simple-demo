import generateNumericString from "@lib/utils/generateNumericString"
import { writeFileSync, readdirSync, existsSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'
import { getAuthorById } from "./author-resolver"

const dbDirectory = path.join(process.cwd(), '/src/db/book')

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

const generateID = () => `${new Date().getTime()}${generateNumericString(6)}`

const getBooks = () =>
  readdirSync(dbDirectory).map(item => 
    JSON.parse(readFileSync(path.join(dbDirectory, item), {
      encoding: "utf8",
    }))
  );

const getBookById = _id => 
  JSON.parse(readFileSync(path.join(dbDirectory, `${_id}.txt`), {
    encoding: "utf8",
  }));

const createBook = data => {
  const book = {
    _id: generateID(),
    ...data,
    createdAt: new Date().toISOString()
  }

  writeFileSync(path.join(dbDirectory, `${book._id}.txt`), JSON.stringify(book), "utf8")

}
const editBook = (_id, data) => {
  const thisBook = getBookById(_id)

  thisBook.title = data.title
  writeFileSync(path.join(dbDirectory, `${_id}.txt`), JSON.stringify(thisBook), "utf8")

}

export const filterBooksByAuthorID = authorId => getBooks().filter(item => item.authorId === authorId)

export default {
  Query: {
    getBooks,
    getBook: (_, { _id }) => getBookById(_id)
  },
  Mutation: {
    createBook: (_, data) => {

      const thisAuthor = getAuthorById(data.authorId)

      if (!thisAuthor) throw new Error("bad request: no such author exists")

      createBook(data)
      return {
        msg: 'ok',
        status: 200
      }
    },
    editBook: (_, { _id, title }) => {
      try {
        
        editBook(_id, { title })

        return {
          msg: 'ok',
          status: 200
        }

      } catch (error) {
        throw error
      }
      
    }
  }
}