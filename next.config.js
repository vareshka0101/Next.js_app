const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thronesapi.com",
        port: "",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
