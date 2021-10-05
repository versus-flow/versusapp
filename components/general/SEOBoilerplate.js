import Head from "next/head";

const SEOBoilerplate = ({
  title = "Versus - Better for Art",
  description,
  url,
  image,
}) => {
  const realDesc =
    description ||
    "Versus is a novel NFT art marketplace that works to empower the artist and the collector.";
  const realUrl = url
    ? `https://www.versus.auction/${url}`
    : "https://www.versus.auction/";
  const realImg = image || "https://www.versus.auction/images/versussocial.png";
  return (
    <Head>
      <link rel="icon" type="image/png" href="/images/icon.png" sizes="16x16" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={realDesc} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={realUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={realDesc} />
      <meta property="og:image" content={realImg} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={realUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={realDesc} />
      <meta property="twitter:image" content={realImg} />
    </Head>
  );
};

export default SEOBoilerplate;
