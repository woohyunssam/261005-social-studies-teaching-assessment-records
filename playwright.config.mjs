export default {
  timeout: 60000,
  testDir: "./tests",
  fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:3000", channel: "msedge", headless: true },
  reporter: "list",
};
