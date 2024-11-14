import {ApolloServer} from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `

    type User {
        id: ID
        name : String
        email: String
    }

    type Query {
    
        users: [User],
        user(id:ID): User
            
    }

    type Mutation{
        createUser(name: String, email: String): User
    }
`
const users = [
    {id: 1, name: "Leonel Messi", email: "messi10@gmail.com"},
    {id: 2, name: "Cristianos Ronaldo", email: "ronaldo7@gmail.com"}
]

const resolvers={
    Query:{
        
        users: () => users,
        user: (root, args) => {
            const user= users.find(user => user.id == args.id)
            return user
        }
    },
    Mutation: {
        createUser: (root, args) => {
            const user= {id:users.length + 1 , name: args.name, email: args.email}
            users.push (user)
            return user
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server).then(({url}) => {
    console.log (`Server ready at ${url}`);
})

