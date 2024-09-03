import { openDB, type DBSchema } from "idb";
import { parse } from "csv-parse/browser/esm/sync";

interface DeutschlandtarifDb extends DBSchema {
  last_modified: {
    key: string;
    value: {
      name: string;
      date: string;
    };
  };
  Leitpunktkürzel: {
    key: string;
    value: {
      Leitpunktkürzel: string;
      Tarifpunkt: string;
    };
    indexes: { Leitpunktkürzel: string };
  };
}

const DB_NAME = "deutschlandtarif";
const BASE_URL =
  "https://raw.githubusercontent.com/pajowu/deutschlandtarif-data/main/data/";

export class DeutschlandtarifData {
  dbPromise;

  constructor() {
    this.dbPromise = openDB<DeutschlandtarifDb>(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore("last_modified", {
          keyPath: "name",
        });
        const ltpkstore = db.createObjectStore("Leitpunktkürzel", {
          keyPath: "Leitpunktkürzel",
        });
        ltpkstore.createIndex("Leitpunktkürzel", "Leitpunktkürzel");
      },
    });
  }

  async update() {
    const resp = await fetch(BASE_URL + "last_modified.csv");
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }
    const last_mod_dat: Array<{ name: string; date: string }> = await parse(
      await resp.text(),
      { columns: true }
    );
    const known_last_mod = Object.fromEntries(
      (await this.dbPromise.then((x) => x.getAll("last_modified"))).map((x) => [
        x.name,
        x.date,
      ])
    );
    const needs_upgrade = last_mod_dat
      .filter((row) => known_last_mod[row.name] !== row.date)
      .map((row) => row.name);
    console.log("Outdated Data for", needs_upgrade);

    if (needs_upgrade.includes("Leitpunktkürzel")) {
      console.log("Leitpunktkürzel");
      const req = await fetch(BASE_URL + "Leitpunktkürzel.csv");
      if (!req.ok) {
        throw new Error(`Response status: ${req.status}`);
      }
      const dat: { Leitpunktkürzel: string; Tarifpunkt: string }[] =
        await parse(await req.text(), { columns: true });
      const tx = (await this.dbPromise).transaction(
        ["last_modified", "Leitpunktkürzel"],
        "readwrite"
      );
      await Promise.all([
        ...dat.map((x: unknown) =>
          tx
            .objectStore("Leitpunktkürzel")
            .put(x as DeutschlandtarifDb["Leitpunktkürzel"]["value"])
        ),
        tx
          .objectStore("last_modified")
          .put(last_mod_dat.find((x) => x.name == "Leitpunktkürzel")!),
        tx.done,
      ]);
    }
  }

  async getTarifpunkt(Leitpunktkürzel: string): Promise<string | undefined> {
    return await this.dbPromise.then((x) => {
      return x
        .transaction("Leitpunktkürzel")
        .store.get(Leitpunktkürzel)
        .then((x) => x?.Tarifpunkt);
    });
  }

  async hasData(): Promise<boolean> {
    return this.dbPromise
      .then((x) => x.transaction("Leitpunktkürzel").store.count())
      .then((x) => x > 0);
  }
}
