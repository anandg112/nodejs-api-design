import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || "development"
const stage = process.env.STAGE || "local"

let envConfig

if (stage === "production"){
    envConfig = require("./prod").default
} else if (stage === "staging") {
    envConfig = require("./staging").default
} else {
    envConfig = require("./local").defaul
}

const defaultConfig = {
    stage,
    env: process.env.NODE_ENV,
    port: 3000,
    secrets: {
        jwt: process.env.JWT_SECRET
    }
}

export default merge(defaultConfig, envConfig)
