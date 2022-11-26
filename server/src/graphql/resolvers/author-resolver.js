import generateNumericString from "@lib/utils/generateNumericString"
import { writeFileSync, readdirSync, existsSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'

const dbDirectory = path.join(process.cwd(), '/src/db/author')

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

const generateID = () => `${new Date().getTime()}${generateNumericString(6)}`

const getAuthors = () => 
  readdirSync(dbDirectory).map(item => 
    JSON.parse(readFileSync(path.join(dbDirectory, item), {
      encoding: "utf8",
    }))
  );


export const getAuthorById = _id => {
  try {
    return JSON.parse(readFileSync(path.join(dbDirectory, `${_id}.txt`), {
      encoding: "utf8",
    }));
  } catch (error) {
    return null
  }
}

const createAuthor = data => {

  const author = {
    _id: generateID(),
    ...data,
    createdAt: new Date().toISOString()
  }

  writeFileSync(path.join(dbDirectory, `${author._id}.txt`), JSON.stringify(author), "utf8")

}

const editAuthor = (_id, data) => {

  const thisAuthor = getAuthorById(_id)

  thisAuthor.name = data.name
  
  writeFileSync(path.join(dbDirectory, `${_id}.txt`), JSON.stringify(thisAuthor), "utf8")

}

export default {
  Query: {
    getAuthors,
    getAuthor: (_, { _id }) => getAuthorById(_id)
  },
  Mutation: {
    createAuthor: (_, data) => {

      createAuthor(data)
      return {
        msg: 'ok',
        status: 200
      }
    },

    editAuthor: (_, { _id, name }) => {

      try {
        
        editAuthor(_id, { name })

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