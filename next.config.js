/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "firebasestorage.googleapis.com",
  //       port: "",
  //       pathname: "/v0/b/nana-s-memories.appspot.com/o/",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
