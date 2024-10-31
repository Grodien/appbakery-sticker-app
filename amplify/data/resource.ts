import { a, type ClientSchema, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Challenge: a
    .model({
      name: a.string(),
      description: a.string(),
      start_date: a.datetime(),
      end_date: a.datetime(),
      scoring_a: a.float(),
      scoring_b: a.float(),
      scoring_c: a.float(),
      scoring_d: a.float(),
      max_count: a.integer(),
      image_uri: a.string(),
      levels: a.hasMany('Level', 'challenge_id'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Level: a
    .model({
      challenge_id: a.id(),
      challenge: a.belongsTo('Challenge', 'challenge_id'),
      sticker_id: a.id(),
      sticker: a.hasOne('Sticker', 'level_id'),
      threshold: a.integer(),
      bonus_score: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Sticker: a
    .model({
      level_id: a.id(),
      level: a.belongsTo('Level', 'level_id'),
      name: a.string(),
      description: a.string(),
      img_uri: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
