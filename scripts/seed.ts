/**
 * Populates a freshly-migrated Supabase project with the same starter
 * content this prototype ships with (src/data/*.ts), so the live site
 * looks identical to the mock version the moment Supabase is wired up —
 * from there, edit and add content through /admin instead of this script.
 *
 * Usage:
 *   1. Run supabase/migrations/0001_init.sql in the Supabase SQL editor.
 *   2. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (Project
 *      Settings → API → service_role — NOT the anon key, and never expose
 *      this key to the browser) in a local .env file.
 *   3. npm run seed
 *
 * Safe to re-run: every row is upserted by its `id`/singleton key.
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

import { activities } from "../src/data/activities";
import { stories } from "../src/data/stories";
import { newsletters } from "../src/data/newsletters";
import { galleryItems, galleryVideos } from "../src/data/gallery";
import { partners } from "../src/data/partners";
import { team } from "../src/data/team";
import { siteSettings, sobreConteudo } from "../src/data/site";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set them in a local .env file (see the comment at the top of this script) before running `npm run seed`.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

async function upsert(table: string, rows: unknown[], conflictKey = "id") {
  if (rows.length === 0) return;
  const { error } = await supabase.from(table).upsert(rows, { onConflict: conflictKey });
  if (error) throw new Error(`Failed to seed "${table}": ${error.message}`);
  console.log(`✓ ${table}: ${rows.length} rows`);
}

/**
 * PostgREST turns an array upsert into a single multi-row INSERT, so the
 * column list is the union of keys across every row in the batch — a row
 * that omits an optional field (e.g. no `redesSociais`) gets an explicit
 * NULL for it rather than falling back to the column's SQL default,
 * which then fails NOT NULL columns like `redesSociais jsonb not null
 * default '[]'`. Filling every row with the same defaults first keeps the
 * column set (and values) consistent across the whole batch.
 */
function withDefaults<T extends Record<string, unknown>>(rows: T[], defaults: Partial<T>): T[] {
  return rows.map((row) => ({ ...defaults, ...row }));
}

async function main() {
  await upsert("partners", partners);
  await upsert("team_members", withDefaults(team, { redesSociais: [] }));
  await upsert(
    "activities",
    withDefaults(activities, {
      objectivos: [],
      galeria: [],
      parceiroIds: [],
      resultados: [],
      testemunhos: [],
      destaque: false,
    }),
  );
  await upsert("stories", withDefaults(stories, { galeria: [], destaque: false }));
  await upsert("newsletters", withDefaults(newsletters, { galeria: [], destaque: false }));
  await upsert("gallery_items", withDefaults([...galleryItems, ...galleryVideos], { imagens: [] }));

  await upsert(
    "site_settings",
    [
      {
        id: 1,
        hero: siteSettings.hero,
        impacto: siteSettings.impacto,
        sobreNumeros: siteSettings.sobreNumeros,
        participar: siteSettings.participar,
        contacto: siteSettings.contacto,
        sobre: sobreConteudo,
      },
    ],
    "id",
  );

  console.log("\nSeed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
