/**
 * Compile-time regression: MODULE LIST entries carry path and args since
 * Redis 7.0 (addReplyLoadedModules emits name, ver, path, args), and the
 * runtime transformer already passes them through. The declared reply type
 * used to list only name and ver, so consumers had no type-safe access to
 * the newer fields.
 *
 * Lives outside `lib/` so it is not picked up by the production build /
 * typedoc. Checked with `npm run test:types -w @redis/client`.
 */
import { createClient } from '../index';

type Client = ReturnType<typeof createClient>;
type ModuleEntry = Awaited<ReturnType<Client['moduleList']>>[number];

declare const moduleEntry: ModuleEntry;

// Fields sent by the server must be accessible with their own types.
const name: string = moduleEntry.name;
const ver: number = moduleEntry.ver;
const path: string = moduleEntry.path;
const args: string[] = moduleEntry.args;

export const MODULE_LIST_ENTRIES_ARE_FULLY_TYPED = [name, ver, path, args] as const;
