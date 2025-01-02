import { commentRouter } from "./comments.route"
import { Express } from "express-serve-static-core";

export const commentApi = (app: Express) => {
    app.use("/", commentRouter())
}