import Pocketbase from 'pocketbase';
import { Context } from "hono";
import { env } from "hono/adapter";

/**
 * Creates a new Pocketbase client instance using the `POCKETBASE_URL` environment variable from the current worker environment.
 *
 * @throws {Error} If `POCKETBASE_URL` is not set.
 * @returns {Pocketbase} A new Pocketbase client instance.
 */
export default function PocketbaseClient(c: Context<any>): Pocketbase {
  try {
    const { POCKETBASE_URL } = env<{ POCKETBASE_URL: string }>(c, 'workerd')

    if (!POCKETBASE_URL) throw new Error('Missing POCKETBASE_URL env variable');

    return new Pocketbase(POCKETBASE_URL);
  } catch (err) {
    throw new Error('Error instantiating Pocketbase: ' + (err as Error).message);
  }
}
