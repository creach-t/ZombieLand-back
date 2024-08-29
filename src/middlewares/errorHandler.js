import { NotFoundError } from "../utils/errors.js";
// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.error(error);
  // Toutes les erreurs qui provienne de la validation de Zod retourneront une 400 avec le détail.
  // if (error instanceof ZodError) {
  //   return res.status(400).json({ error: error.errors });
  // }
  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }
  res.status(500).json({ error: "Unknown error" });
}
export default errorHandler;
