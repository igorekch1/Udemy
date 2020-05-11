import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

let users = [
  {
    id: 1,
    name: "Ihor",
    email: "email@email.com",
    age: 20,
  },
  {
    id: 2,
    name: "Tom",
    email: "tom@email.com",
    age: 123,
  },
];

let posts = [
  {
    id: 1,
    title: "Title 1",
    body: "Body 1",
    published: false,
    author: 1,
  },
  {
    id: 2,
    title: "Title 2",
    body: "Body 2",
    published: true,
    author: 2,
  },
  {
    id: 3,
    title: "Title 3",
    body: "Body 3",
    published: true,
    author: 1,
  },
];

let comments = [
  {
    id: 1,
    author: 1,
    post: 1,
    text: "Coment text 1",
  },
  {
    id: 2,
    author: 2,
    post: 1,
    text: "Coment text 2",
  },
  {
    id: 3,
    author: 2,
    post: 2,
    text: "Coment text 3",
  },
  {
    id: 4,
    author: 2,
    post: 3,
    text: "Coment text 4",
  },
];

// Type deifinitions (Schema)
const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: User!
    users(query: String): [User!]!
    post: Post!
    posts: [Post!]!
    comments: [Comment!]!
}

type Mutation {
  createUser(data: CreateUserInput): User!
  deleteUser(id: ID!): User!
  createPost(data: CreatePostInput): Post!
  deletePost(id: ID!): Post!
  createComment(data: CreateCommentInput): Comment!
  deleteComment(id: ID!): Comment!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input CreatePostInput {
  title: String! 
  body: String!
  published: Boolean! 
  author: ID!
}

input CreateCommentInput {
  author: ID! 
  post: ID! 
  text: String!
}

type User {
    id: ID!
    name: String!
    email: String!
    age : Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
}

type Comment {
    id: ID!
    author: User!
    post: Post!
    text: String!
}
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args) {
      const { name } = args;

      return `Hello ${name}`;
    },
    me() {
      return {
        id: 1,
        name: "Ihor",
        email: "email@email.com",
        age: 20,
      };
    },
    users(parent, args, ctx, info) {
      const { query } = args;

      if (!query) return users;

      return users.filter((user) => user.name.includes(query));
    },
    post() {
      return {
        id: 123,
        title: "Title",
        body: "Body",
        published: true,
      };
    },
    posts(parent, args, ctx, info) {
      return posts;
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const { data } = args;
      const emailTaken = users.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new Error("Email taken");
      }

      const user = {
        id: uuidv4(),
        ...data,
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const { id } = args;
      const userIndex = users.findIndex((user) => user.id === +id);

      if (userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter((post) => {
        const match = post.author === +id;

        if (match) {
          comments = comments.filter((comment) => comment.author !== post.id);
        }

        return !match;
      });
      comments = comments.filter((comment) => comment.author !== +id);

      return deletedUsers[0];
    },
    deletePost(parent, args, ctx, info) {
      const { id } = args;
      const postIndex = posts.findIndex((post) => post.id === +id);

      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      const deletedPosts = posts.splice(postIndex, 1);

      comments = comments.filter((comment) => comment.post !== +id);

      return deletedPosts[0];
    },
    deleteComment(parent, args, ctx, info) {
      const { id } = args;
      const commentIndex = comments.findIndex((comment) => comment.id === +id);

      if (commentIndex === -1) {
        throw new Error("Comment not found");
      }

      const deletedComments = comments.splice(commentIndex, 1);

      comments = comments.filter((comment) => comment.id !== +id);

      return deletedComments[0];
    },
    createPost(parent, args, ctx, info) {
      const { data } = args;
      const userExists = users.some((user) => user.id === +data.author);

      if (!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        ...data,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const { data } = args;
      const userExists = users.some((user) => user.id === +data.author);
      const postExists = posts.some(
        (post) => post.id === +data.post && post.published
      );

      if (!userExists) {
        throw new Error("User not found");
      }
      if (!postExists) {
        throw new Error("Post not found");
      }

      const comment = {
        id: uuidv4(),
        ...data,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
