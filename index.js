//importing env variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors"; //cross origin request
import helmet from "helmet";

//microservices routes
import Auth from "./API/Auth";

//Database connection
import ConnectDB from "./database/connection";

const zomato = express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet()); //security library
zomato.use(cors());

// Application route
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "set up success" }));

zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("server is running"))
    .catch(() =>
      console.log("server is running,but database connection failed ")
    )
);
