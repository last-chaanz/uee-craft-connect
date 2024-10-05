module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", // Allows you to import from "@env"
          path: ".env", // Specify the path to the .env file
        },
      ],
    ],
  };
};
