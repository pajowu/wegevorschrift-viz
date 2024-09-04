import type { DeutschlandtarifData } from "../data/deutschlandtarif";
import type { Alternative, Part, Wegevorschrift } from "./parser";

export function unparseWegevorschrift(input: Wegevorschrift): string {
  console.log(input);
  const mapped = input.map((x) => ({
    country: x.country,
    way: x.way.map(unparsePart).join("*"),
  }));
  if (new Set(mapped.map((x) => x.country)).size > 1) {
    return mapped.map((x) => `<${x.country}>${x.way}`).join("");
  } else {
    return mapped.map((x) => x.way).join("");
  }
}

function unparsePart(part: Part): string {
  if (typeof part === "string") {
    return part;
  } else {
    return unparseAlternative(part);
  }
}

function unparseAlternative(alt: Alternative): string {
  return (
    "(" +
    unparseWegevorschrift(alt[0]) +
    "/" +
    unparseWegevorschrift(alt[1]) +
    ")"
  );
}

export async function translateWegevorschrift(
  input: Wegevorschrift,
  db: DeutschlandtarifData
): Promise<Wegevorschrift> {
  return Promise.all(
    input.map(async (x) => ({
      ...x,
      way: await Promise.all(x.way.map((y) => translatePart(y, db))),
    }))
  );
}

async function translatePart(
  part: Part,
  db: DeutschlandtarifData
): Promise<Part> {
  if (typeof part === "string") {
    return (await db.getTarifpunkt(part.toUpperCase())) || part;
  } else {
    return translateAlternative(part, db);
  }
}

async function translateAlternative(
  alt: Alternative,
  db: DeutschlandtarifData
): Promise<Alternative> {
  return Promise.all([
    translateWegevorschrift(alt[0], db),
    translateWegevorschrift(alt[1], db),
  ]);
}
