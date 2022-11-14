import path, { dirname } from 'path';

import { Server as IOServer } from 'socket.io';
import MongoStore from 'connect-mongo';
import { chatController } from './controllers/index.controller.js'
import cluster from 'cluster';
import compression from "compression";
import config from './config.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {engine} from 'express-handlebars';
import express from "express";
import { fileURLToPath } from 'url';
import initializePassportConfig from './passportConfig.js';
import mongoose from "mongoose";
import os from 'os';
import passport from "passport";
import router from './routes/index.routes.js';
import session from "express-session";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = config.port || 8080;
const app = express();

if (config.mode === "cluster" && cluster.isPrimary) {
    os.cpus().map(() => {
        cluster.fork();
    })

    cluster.on("exit", worker => {
        logger.info(`Worker ${worker.process.pid} died. A new one is being created.`)
        cluster.fork();
    })
} else {
    /* cors */
    app.use(cors({
        origin: "*",
        credentials: true,
    }))

    /* serve static files */
    // app.use("/public", express.static(path.join(__dirname, "../public")))

    /*view engine */

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, './views'));

    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
        layoutsDir: path.join(__dirname,'views/layout'),
        partialDir: path.join(__dirname, './views/partials')
    }));

    /* post url encode */
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    /* compression */
    app.use(compression())

    /* cookies / session */
    const mongoStoreOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    app.use(cookieParser())
    app.use(session({
        store: MongoStore.create({
            mongoUrl:
                config.mongoconnect,
            mongoStoreOptions,
        }),
        secret: config.sessionsecret,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        },
        rolling: true
    }))

    /* passport init */
    app.use(passport.initialize())
    app.use(passport.session())
    initializePassportConfig(passport)

    /* all routes - log method */
    app.use((req, res, next) => {
        console.log(`New request: ${req.method} - ${req.path}`)
        next()
    })

    /* routes main */
    app.use("/", router)

    /* not found */
    app.use((req, res) => {
        res.status(404).json({ error: -2, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Implementada` });
    })

    // error handler
    app.use(function (err, req, res, next) {
        // res.status(500).json({
        //     error: err.message,
        // });
        res.render('error', err);
    });

    /* db connection */
    mongoose.connect(config.mongoconnect).then(() => {
        console.log("Conexión establecida con Mongo");

        /* start server */
        const expressServer = app.listen(port, (err) => {
            if (!err) {
                config.mode === "cluster" ? console.log(`[MODE: CLUSTER] El servidor se inicio en el puerto ${port}`) : console.log(`[MODE: FORK] El servidor se inicio en el puerto ${port}`)

                /* close db on exit */
                process.on("exit", () => {
                    mongoose.disconnect().then(() => {
                        console.log("Conexión cerrada con Mongo")
                    });
                })

            } else {
                console.log(`Hubo un error al iniciar el servidor: `, err)
            }
        })

        /* start socket io - chat server */
        const io = new IOServer(expressServer,  {
            cors: {
                origin: '*',
                methods: ["GET", "POST"],
                transports: ['websocket', 'polling'],
                credentials: true
            }
        });
        io.on("connection", async socket => {
            console.log("Nuevo usuario conectado")

            const messagesArray = await chatController.getAllChats().data;

            socket.emit('server:messages', messagesArray);

            socket.on('client:message', async messageInfo => {
                await chatController.saveChat(messageInfo);
                const messagesArray = await chatController.getAllChats().data;
                io.emit('server:messages', messagesArray);
            })
        })
    }).catch(error => console.log("error conectando a db: ", error));
}