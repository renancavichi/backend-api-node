import con from '../db/dbConnection.js'

export const listAllUsers = (callback) => {
  const sql = "SELECT * FROM usuarios;"
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
  const sql = "SELECT * FROM usuarios WHERE id = ?;"
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
  const { nome, email, senha, avatar } = user

  const sql = 'INSERT INTO usuarios (nome, email, senha, avatar) VALUES (?, ?, ?, ?);'
  const values = [nome, email, senha, avatar]

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
  const sql = 'DELETE FROM usuarios WHERE id = ?;'
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
  const { id, nome, email, senha, avatar } = user
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, avatar = ?  WHERE id = ? ;'
  const values = [nome, email, senha, avatar, id]

  con.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null)
      console.log(`DB Error: ${err.sqlMessage}`)
    } else {
      callback(null, result)
    }
  })
}

export default { listAllUsers, showUser, createUser, deleteUser, updateUser }