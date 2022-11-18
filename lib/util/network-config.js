module.exports = (apikey, env) => {
  let baseUrl = "https://api.packagex.io/v1";

  switch (env) {
    case "production":
      baseUrl = "https://api.packagex.io/v1";
      break;
    case "staging":
      baseUrl = "https://staging--api.packagex.io/v1";
      break;
    case "sandbox":
      baseUrl = "https://sandbox--api.packagex.io/v1";
      break;
    case "dev":
      baseUrl = "https://dev--api.packagex.io/v1";
      break;
    default:
      baseUrl = "https://api.packagex.io/v1";
      break;
  }

  const object = {
    api_key: apikey,
    base_url: baseUrl,
  };

  return object;
};