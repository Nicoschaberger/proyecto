import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js";
import viewsRouter from "./routers/views.routes.js"
import sessionRouter from "./routers/session.routes.js";
import initializePassport from "./config/passport.config.js";
import { getVariables } from "./config/config.js";
import { ErrorHandler } from "./middlewares/error.js";
import { addLogger } from "./utils/logger.js";
import testRouter from "./routers/test.routes.js";
import usersRouter from "./routers/users.routes.js";
import { swaggerConfig } from "./config/swagger-config.js";

const { port, mongoUrl, secret, nodeEnv, mongoUrlTest } = getVariables();
const app = express();

const specs = swaggerJSDoc(swaggerConfig);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(addLogger);

app.use(session({
    secret: secret,
    store: MongoStore.create({
        mongoUrl: mongoUrl
    }),
    resave: true,
    saveUninitialized: true
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine("handlebars", hbs.engine);
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/test", testRouter);
app.use("/api/users", usersRouter);


const httpServer = app.listen(port, async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log(`Server on`);
    } catch (err) {
        console.log(err);
    }
});


/* const io = new Server(httpServer);

io.on("connect", socket => {
    console.log("Cliente conectado");
    sendProducts(socket);
});

const sendProducts = async (io) => {
    try {
        const products = await productManager.getProducts();
        io.emit("products", products);
    } catch (error) {
        console.log(error.message);
    }
} */