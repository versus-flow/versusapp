import { find, replace } from "lodash";

export const getGraffleUrl = (query) => {
  const contract = (
    process.env.NEXT_PUBLIC_CONTRACT || "0x69915b410cca3c65"
  ).substr(2);
  const editedQuery = replace(query, "CONTRACT", contract);
  return `${
    process.env.NEXT_PUBLIC_GRAFFLE_URL ||
    "https://prod-test-net-dashboard-api.azurewebsites.net/api/company/737eb23a-5c80-4421-8b49-15b20a42f5f4/search"
  }${editedQuery}`;
};

export const isMainnet = () => process.env.NEXT_PUBLIC_FLOW_ENV === "mainnet";

export const getLink = (links, title) => {
  const item = find(links, (l) => l.title === title) || {};
  return item.url;
};
