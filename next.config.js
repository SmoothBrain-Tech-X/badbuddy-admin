/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  env: {
    NEXT_PUBLIC_BASE_API:
      "https://general-badbuddy-be.tu4rl4.easypanel.host",
  },
  output: "standalone"
};

export default config;
