import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";

import schema_get from "../schema/getUserSchema.js";

const ajv = new Ajv();
const baseURL = "https://reqres.in";

const apiKey = "free_user_3FPNgcbi6m5ott1OGBr12EUMNLd";

describe("GET Tests Suite", function () {
  it("READ - Get single user", async function () {
    const response = await fetch(`${baseURL}/api/users/2`, {
      headers: {
        "x-api-key": apiKey,
      },
    });

    expect(response.status, "status code tidak sesuai").to.equal(200);

    const data = await response.json();

    const validate = ajv.compile(schema_get);
    const valid = validate(data);
    expect(
      valid,
      `validasi schema salah: ${JSON.stringify(validate.errors)}`
    ).to.be.true;

    expect(data.data.id, "iD user tidak sesuai").to.equal(2);
  });
});
