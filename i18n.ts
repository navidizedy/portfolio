import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  return {
    locale: "en",
    messages: (await import("./src/messages/en.json")).default,
  };
});
