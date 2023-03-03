/** @type {import('next').NextConfig} */
//nextjs config file

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    SITE: process.env.SITE,
    STRIPE_PKEY: process.env.STRIPE_PKEY,
  },

  //for next/image <Image/>
  images: {
    domains: [
      "localhost:5000",
      "192.168.0.128:5000",
      "localhost",
      `${process.env.BASE_URL}`,
    ],
  },

  sassOptions: {
    prependData: ` 
    $light: #FFFFFF;
    $dark: #242526;
    $dark1: #18191a;
    $accent1: #ff9933;
    $accent2: #ff8585;
    $txt-light: #DEE3EA;
    $txt-dark: #222222;
    $grey: #E8E8E8;
    $light-bg1: #F1F0EB;
    $light-bg2: #F2DDD5;
    $danger: #dc3545;
    $success: #28a745;`,
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
