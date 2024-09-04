import { Hono } from 'hono'
import { login, register } from './auth';
import { cors } from 'hono/cors';

// Bootstrap Hono app
const app = new Hono();

// Setup CORS config
app.use('*', cors())

// * Auth Routes
const auth = new Hono();
// Register & Login routes
auth.post("/", register); // POST /auth - Creates a new user
auth.get("/", login); // PUT /auth - Logs in a user

app.route("/auth", auth);

export default app;
