# GraphQL

### Basics

#### Types:

- Scalar types - String, Boolean, Int, Float, ID

```js
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
}
`;
```

_! - not nullable_

- Custom types

```js
const typeDefs = `
  type Query {
    me: User!
}

type User {
    id: ID!
    name: String!
    email: String!
    age : Int
}
`;
```

#### Resolver

```js
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    name: () => "Ihor Ch.",
  },
};
```

#### Query arguments

type:

```js
const typeDefs = `
  type Query {
    greeting(name: String): String!
}`;
```

resolver:

```js
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      const { name } = args;

      return `Hello ${name}`;
    },
  },
};
```

#### Arrays

Define type w/ []

```js
const typeDefs = `
  type Query {
    me: User!
    users(query: String): [User!]!
}

type User {
    id: ID!
    name: String!
    email: String!
    age : Int
    posts: [Post!]!
    comments: [Comment!]!
}
`;
```

Data relations:
Creating a resolver on Type to map needed data

Data example:

```js
const users = [
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

const posts = [
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
```

Resolver:

```js
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      return posts;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
  },
};
```

### Mutations

Action to create/update/delete data

**Create data**

1. Define type which accepts params and return typed object:

```js
type Mutation {
  createUser(name: String!, email: String!, age: Int): User!
}
```

Define resolver:

```js
 Mutation: {
    createUser(parent, args, ctx, info) {
      const { name, email, age } = args;
      const emailTaken = users.some((user) => user.email === email); // email already exists

      if (emailTaken) {
        throw new Error("Email take");
      }

      const user = {
        id: uuidv4(),
        name,
        email,
        age,
      };

      users.push(user);

      return user;
    },
  },
```

Query example:

```gql
mutation {
  createUser(name: "Ihor", email: "test@test.test", age: 20) {
    name
  }
}
```

#### Input

U can create an input type that respresetns a set of arguments to pass in mutation:

```js
const typeDefs = `
type Mutation {
  createUser(data: CreateUserInput): User!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}
`;
```

Then, u have to update resolver to take data from object that mutation accepts:

```js
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
```

Query:

```gql
mutation {
  createComment(data: { author: 1, post: 2, text: "New comment" }) {
    text
  }
}
```

**Delete data**
Provide mutation type:

```js
type Mutation {
  deleteUser(id: ID!): User!
}
```

Provide resolver to delete user:

```js
deleteUser(parent, args, ctx, info) {
  const { id } = args;
  const userIndex = users.findIndex((user) => user.id === +id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const deletedUsers = users.splice(userIndex, 1); // Delete user with provided id

  posts = posts.filter((post) => {
    const match = post.author === +id; // Delete posts of user

    if (match) {
      comments = comments.filter((comment) => comment.author !== post.id); // Delete post's comments
    }

    return !match;
  });
  comments = comments.filter((comment) => comment.author !== +id); // Delete comments created by user

  return deletedUsers[0]; // return deleted user
},
```

### Subscriptions

GraphQL uses websockets behind the scene fo subscriptions.

1. Defint type:

```js
type Subscription {
  count: Int!
}
```

2. Create a subscription resolver:

```js
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;

        pubsub.publish("count", {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator("count"); // channel name
    },
  },
};

export { Subscription as default };
```

3. Add Subscription resolver to the set of resolvers and create a pubsub instance and provide it to the context:

```js
const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});
```
