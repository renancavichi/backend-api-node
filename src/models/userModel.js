import con from '../db/dbConnection.js'
import { z } from 'zod'
import sha256 from '../helper/sha256.js'

//TODO Testar regex com zod e ChatGPT

const userSchema = z.object({
  id:
    z.number({
      required_error: "ID é obrigatório.",
      invalid_type_error: "ID deve ser um número.",
    }),
  name:
    z.string({
      required_error: "Nome é obrigatória.",
      invalid_type_error: "Nome deve ser uma string.",
    })
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres." })
      .max(100, { message: "Nome deve ter no máximo 100 caracteres." }),
  email:
    z.string({
      required_error: "Email é obrigatória.",
      invalid_type_error: "Email deve ser uma string.",
    })
      .email({ message: "Email Inválido." })
      .min(5, { message: "O email deve ter ao menos 5 caracteres." })
      .max(200, { message: "Email deve ter no máximo 200 caracteres." }),
  pass:
    z.string({
      required_error: "Senha é obrigatória.",
      invalid_type_error: "Senha deve ser uma string.",
    })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres." })
      .max(256, { message: "Senha deve ter no máximo 256 caracteres." }),
  avatar:
    z.string({
      message: "Avatar deve ser uma string.",
    })
      .url({ message: "Avatar deve ser uma URL válida." })
      .optional()
})

export const validateUserToCreate = (user) => {
  const partialUserSchema = userSchema.partial({ id: true });
  return partialUserSchema.safeParse(user)
}

export const validateUserToUpdate = (user) => {
  return userSchema.safeParse(user)
}

export const listAllUsers = (callback) => {
  const sql = "SELECT * FROM users;"
  con.query(sql, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export const showUser = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?;"
  const value = [id]
  con.query(sql, value, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export const createUser = (user, callback) => {
  const { name, email, pass, avatar } = user

  const sql = 'INSERT INTO users (name, email, pass, avatar) VALUES (?, ?, ?, ?);'
  const values = [name, email, sha256(pass), avatar]

  con.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export const deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?;'
  const value = [id]
  con.query(sql, value, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export const updateUser = (user, callback) => {
  const { id, name, email, pass, avatar } = user
  const sql = 'UPDATE users SET name = ?, email = ?, pass = ?, avatar = ?  WHERE id = ? ;'
  const values = [name, email, pass, avatar, id]

  con.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export const loginUser = (email, pass, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ? AND pass = ?;'
  const value = [email, sha256(pass)]
  con.query(sql, value, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export default { listAllUsers, showUser, createUser, deleteUser, updateUser, validateUserToCreate, validateUserToUpdate, loginUser }