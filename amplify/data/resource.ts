import { a, type ClientSchema, defineData, defineAuth } from '@aws-amplify/backend';

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
    .authorization((allow) => [
      allow.authenticated('oidc'),
    ]),
  ChallengeDto: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      start_date: a.datetime().required(),
      end_date: a.datetime(),
      scoring_a: a.float().required(),
      scoring_b: a.float().required(),
      scoring_c: a.float().required(),
      scoring_d: a.float().required(),
      max_count: a.integer(),
      image_uri: a.string().required(),
      levels: a.hasMany('LevelDto', 'challenge_id'),
      events: a.hasMany('ChallengeEventDto', 'challenge_id'),
      userStickers: a.hasMany('UserStickerDto', 'challenge_id'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  LevelDto: a
    .model({
      challenge_id: a.id(),
      challenge: a.belongsTo('ChallengeDto', 'challenge_id'),
      sticker: a.hasOne('StickerDto', 'level_id'),
      threshold: a.integer().required(),
      bonus_score: a.integer().required(),
      events: a.hasMany('ChallengeEventDto', 'level_id'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  StickerDto: a
    .model({
      level_id: a.id(),
      level: a.belongsTo('LevelDto', 'level_id'),
      name: a.string().required(),
      description: a.string().required(),
      img_uri: a.string().required(),
      users: a.hasMany('UserStickerDto', 'sticker_id'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  UserDto: a
    .model({
      oid: a.string().required(),
      display_name: a.string().required(),
      total_score: a.integer().default(0),
      stickers: a.hasMany('UserStickerDto', 'user_id'),
      events: a.hasMany('ChallengeEventDto', 'user_id'),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  ChallengeEventDto: a
    .model({
      user_id: a.id().required(),
      user: a.belongsTo('UserDto', 'user_id'),
      challenge_id: a.id().required(),
      challenge: a.belongsTo('ChallengeDto', 'challenge_id'),
      level_id: a.id(),
      level: a.belongsTo('LevelDto', 'level_id'),
      description: a.string(),
      count: a.integer().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  UserStickerDto: a
    .model({
      user_id: a.id().required(),
      user: a.belongsTo('UserDto', 'user_id'),
      sticker_id: a.id().required(),
      sticker: a.belongsTo('StickerDto', 'sticker_id'),
      challenge_id: a.id(),
      challenge: a.belongsTo('ChallengeDto', 'challenge_id'),
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
    oidcAuthorizationMode: {
      oidcProviderName: 'azure',
      oidcIssuerUrl: 'https://login.microsoftonline.com/2cda5d11-f0ac-46b3-967d-af1b2e1bd01a/v2.0',
      clientId: '3cad168f-c0d7-41b0-be1c-6f91498cfce9',
      tokenExpiryFromAuthInSeconds: 300,
      tokenExpireFromIssueInSeconds: 600,
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
