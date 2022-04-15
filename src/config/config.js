'use strict'
const db = require('./db')
const server = require('./server')

const jwt = require('./jwt')

module.exports = Object.assign({},db, server, jwt)
