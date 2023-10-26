import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  age: z.number(),
  roles: z.array(z.string()),
});

const UserInputSchema = z.object({
  email: z.string(),
  name: z.string(),
  age: z.number(),
  roles: z.array(z.string()),
});

type UserInputSchema = z.infer<typeof UserInputSchema>;

export const contract = c.router(
  {
    createUser: {
      method: 'POST',
      path: '/users',
      responses: {
        201: UserSchema,
      },
      body: UserInputSchema,
      summary: 'Create a user',
      metadata: { role: 'user' } as const,
    },
    getUsers: {
      method: 'GET',
      path: '/users',
      responses: {
        200: z.object({
          users: z.array(UserSchema),
          meta: z.object({
            total: z.number(),
          }),
        }),
      },
      headers: z.object({
        pagination: z.string().optional(),
      }),
      query: z.object({
        limit: z.string().transform(Number).optional(),
        page: z.string().transform(Number).optional(),
        filter: z.string().optional(),
      }),
      summary: 'Get all users',
      metadata: { role: 'guest' } as const,
    },
  },
  {
    pathPrefix: '/admin',
  },
);
