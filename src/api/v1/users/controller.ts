import { Status } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts"

import { User } from "./interfaces.ts";

let users: User[] = [
  {id: '1', name: 'Vyacheslav'},
  {id: '2', name: 'Elena'},
  {id: '3', name: 'Sergey'},
  {id: '4', name: 'Egor'},
  {id: '5', name: 'Alex'},
]

export const getUsers = ({ response }: {response: any}) => {
  
  response.status = Status.OK // response.status = 200
  response.body = {
    success: true,
    data: users
  }
}

export const getUser = ({ response, params }: {response: any, params: {id: string}}) => {
  const user: User | undefined = users.find(u => u.id === params.id)

  if (user) {
    response.status = 200
    response.body = {
      success: true, 
      data: user
      }
  } else {
    response.status = 404
    response.body = {
      success: false,
      message: "404 - Not found. User not found",
    };
  }
}

export const createUser = async ({ response, request }: {response: any, request: any}) => {
  const body = await request.body()

  if (!request.hasBody) {
    response.status = 400
    response.body = 
    {
      success: false,
      message: "400 - Invalid data",
    }
  } else {
    const user: User = body.value
    user.id = v4.generate()
    users.push(user)
    response.status = 201
    response.body = { user }
  }
}

export const updateUser = async ({ params, response, request }: {response: any, request: any, params: {id: string}}) => {
  const user: User | undefined = users.find(u => u.id === params.id)

  if (user) {
    const body = await request.body()

    users = users.map(u => u.id === user.id ? {...u, ...body.value} : u)

    response.status = 200
    response.body = {
      success: true, 
      data: users
    }

  } else {
    response.status = 404
    response.body = {
      success: false,
      message: "404 - Not found. User not found",
    };
  }
}

export const removeUser = ({params, response}: {params: {id: string}, response: any}) => {
  users = users.filter(u => u.id !== params.id)

  response.status = 200
    response.body = {
      success: true, 
      data: users
    }

}
