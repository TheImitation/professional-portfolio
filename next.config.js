/** @type {import('next').NextConfig} */
const nextConfig = {
  /* The gallery was trialled at /fluid before it became the home page;
     keep any old links to it working. */
  async redirects() {
    return [{ source: "/fluid", destination: "/", permanent: true }];
  },
}

module.exports = nextConfig
