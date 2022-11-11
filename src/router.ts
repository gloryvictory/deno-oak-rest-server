import { Router } from "https://deno.land/x/oak/mod.ts";
import {getUsers, getUser, createUser, updateUser, removeUser} from './api/v1/users/controller.ts'

const router_user = new Router()

router_user
  .get("/", (context) => {
    context.response.body = "Hello. It is my REST server for test DENO !";
  })

router_user
  .get('/api/v1/users', getUsers)
  .get('/api/v1/users/:id', getUser)
  .post('/api/v1/users', createUser)
  .put('/api/v1/users/:id', updateUser)
  .delete('/api/v1/users/:id', removeUser)

export { router_user }
