/** @type {import('next').NextConfig} */

module.exports = {
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgo: false,
        },
      },
    });

    return config;
  },
};
