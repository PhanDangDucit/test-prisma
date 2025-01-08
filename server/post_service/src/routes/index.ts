import { postRouter } from "./comments.route"
import { Express } from "express-serve-static-core";

export const postApi = (app: Express) => {
    app.use("/", postRouter())
}