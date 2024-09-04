import { parse } from "csv-parse/browser/esm/sync";
import rics_codes from "../assets/rics_codes.csv?raw";

export class RicsData {
  data;

  constructor() {
    this.data = parse(rics_codes, {
      objname: "code",
      columns: true,
      bom: true,
    });
  }

  getShortName(code: string): string | undefined {
    return this.data[code]?.shortname;
  }

  getLongName(code: string): string | undefined {
    return this.data[code]?.longame;
  }

  getCountry(code: string): string | undefined {
    return this.data[code]?.country;
  }
}
