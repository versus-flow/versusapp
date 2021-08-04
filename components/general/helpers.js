export const getGraffleUrl = (query) =>
  `${
    process.env.NEXT_PUBLIC_GRAFFLE_URL ||
    "https://prod-test-net-dashboard-api.azurewebsites.net/api/company/737eb23a-5c80-4421-8b49-15b20a42f5f4/search"
  }${query}`;
