const express = require("express")
const { default: mongoose } = require("mongoose")
const session = require("express-session")
const redis = require("redis")
let RedisStore = require("connect-redis")(session)

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config")

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

const app = express()

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoute")

const mongourl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose
    .connect(mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connect to DB"))
    .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    })
}

connectWithRetry()

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie:{
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Hi Aldi Zull was here!!!</h1>")
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/post", userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))