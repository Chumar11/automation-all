export const ensureHttp = (url: string, widgetType: string) => {
  if (!url) return "";
  if (
    widgetType.toLowerCase() !== "sms" &&
    widgetType.toLowerCase() !== "phone" &&
    widgetType.toLowerCase() !== "email" &&
    !url.includes("https") &&
    !url.includes("http")
  ) {
    return `https://${url}`;
  }
  return url;
};
