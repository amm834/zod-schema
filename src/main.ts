import express, { Request, Response } from "express";
import { number, object, Schema, string } from "zod";

const app = express();

const makeGetEndpoint =
  <TQuery>(
    schema: Schema<TQuery>,
    cb: (req: Request<any, any, any, TQuery>, res: Response) => void
  ) =>
  (req: Request, res: Response) => {
    const queryParamsResult = schema.safeParse(req.query);

    if (!queryParamsResult.success) {
      return res.status(400).send(queryParamsResult.error);
    }

    return cb(req as Request<any, any, any, TQuery>, res);
  };

const someHandler = makeGetEndpoint(object({ id: string() }), (req, res) => {
  const { id } = req.query;
});

app.get("/", someHandler);
app.get(
  "/test",
  makeGetEndpoint(
    object({
      name: string(),
      age: number(),
    }),
    (req, res) => {
      const { name, age } = req.query;
    }
  )
);
