import Head from "next/head";

const SEOBoilerplate = ({
  title = "Versus - Better for Art",
  description = "Versus is a novel NFT art marketplace that works to empower the artist and the collector.",
  url = "https://www.versus.auction/",
  image = "https://www.versus.auction/images/versussocial.png",
}) => {
  return (
    <Head>
      <link rel="icon" type="image/png" href="/images/icon.png" sizes="16x16" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default SEOBoilerplate;
