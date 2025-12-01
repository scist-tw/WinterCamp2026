#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

function sha256Hex(str) {
  return crypto.createHash("sha256").update(str, "utf8").digest("hex");
}

function replaceEmails(node) {
  if (Array.isArray(node)) {
    return node.map(replaceEmails);
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      if (key === "email" && typeof value === "string") {
        out[key] = sha256Hex(value);
      } else {
        out[key] = replaceEmails(value);
      }
    }
    return out;
  }
  return node;
}

(async () => {
  try {
    const inputPath = path.resolve(process.cwd(), "input.json");
    const outputPath = path.resolve(process.cwd(), "output.json");

    const raw = await fs.readFile(inputPath, "utf8");
    const data = JSON.parse(raw);

    const transformed = replaceEmails(data);

    await fs.writeFile(
      outputPath,
      JSON.stringify(transformed, null, 2) + "\n",
      "utf8"
    );
    console.log(
      `Wrote hashed emails to ${path.relative(process.cwd(), outputPath)}`
    );
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
})();
