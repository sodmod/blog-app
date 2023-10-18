const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*"],
  },
};

module.exports = nextConfig;
