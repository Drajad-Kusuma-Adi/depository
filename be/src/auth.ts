import { Context } from "hono";
import PocketbaseClient from "./pb";
import { UserData } from "./types";

// Helper functions
function validateRequiredString(field: string, fieldName: string): void {
  if (typeof field !== 'string' || !field) {
    throw new Error(`${fieldName} is required and must be a string`);
  }
}
function constructUserData(record: any): UserData {
  return {
    id: record.id,
    username: record.username,
    name: record.name,
    email: record.email,
    avatar: record.avatar,
    is_banned: record.is_banned,
    remember_token: record.remember_token,
    created: record.created,
    updated: record.updated,
  };
}

// Auth Methods
export async function register(c: Context) {
  const body = await c.req.json();

  try {
    validateRequiredString(body.email, "Email");
    validateRequiredString(body.first_name, "First name");
    validateRequiredString(body.password, "Password");

    // Declare all input data
    const email = body.email;
    const name = body.first_name + " " + (body.last_name || null);
    const username = (() => {
      const alphadash = name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9-]/g, '');
      const random = Math.floor(10000000 + Math.random() * 90000000);
      return `${alphadash}-${random}`;
    })();

    // Construct user data
    const user = {
      username: username,
      email: email,
      emailVisibility: true,
      password: body.password,
      passwordConfirm: body.password,
      name: name,
      is_banned: false,
      remember_token: null,
    };

    // Create user
    const pb = PocketbaseClient(c);
    const record = await pb.collection("users").create(user);

    // Construct the proper output
    const output = constructUserData(record);

    // Verify user email
    // TODO: Enable this on production
    // await pb.collection("users").requestVerification(email);

    return c.json(output);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
}

export async function login(c: Context) {
  const { email, password } = c.req.query();

  try {
    validateRequiredString(email, "Email");
    validateRequiredString(password, "Password");

    // Authenticate user
    const pb = PocketbaseClient(c);
    const authData = await pb.collection("users").authWithPassword(email, password);

    // Construct the proper output
    const output = constructUserData(authData.record);

    // De-authenticate user
    pb.authStore.clear();

    return c.json(output);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
}