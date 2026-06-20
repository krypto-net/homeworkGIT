import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";

import schema_post from "../schema/createUserSchema.js";

const ajv = new Ajv();
const baseURL = "https://reqres.in";

const apiKey = "free_user_3FPNgcbi6m5ott1OGBr12EUMNLd";

describe("POST Tests Suite", function () {
  it("CREATE - Create User Baru", async function () {
    const newUser = {
      name: "morpheus",
      job: "leader",
    };

    const response = await fetch(`${baseURL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(newUser),
    });

    expect(response.status, "status code tidak sesuai").to.equal(201);

    const data = await response.json();

    const validate = ajv.compile(schema_post);
    const valid = validate(data);
    expect(
      valid,
      `validasi schema salah: ${JSON.stringify(validate.errors)}`
    ).to.be.true;

    expect(data.name, "name tidak sesuai").to.equal(newUser.name);
    expect(data.job, "job tidak sesuai").to.equal(newUser.job);
  });
});
