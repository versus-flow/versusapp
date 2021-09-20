import Head from "next/head";

import Main from "../components/layouts/Main";

export default function Technical() {
  return (
    <Main>
      {() => (
        <>
          <Head>
            <title>Technical Information</title>
          </Head>
          <div className="pt-12 pb-24 bg-white">
            <div className="container">
              <h1 className="text-4xl font-bold font-lato mt-4 mb-1">
                Versus Technical Information
              </h1>
              <div className="mt-8 text-lg">
                <p className="mb-4">
                  One thing that we are really proud of is the decentralized
                  nature of Versus.
                </p>
                <p className="mb-4">
                  Versus is what we passionately refer to as a SODA. SODA stands
                  for Serverless Onchain-data Distributed Application.
                </p>
                <p className="mb-4">
                  The nature of this type of decentralized application allows
                  for censorship resistent onchain NFTs. Since the entirety of
                  an NFT is stored on the Flow blockchain it will never change
                  or lose its image. Versus NFTs are immutable and entirely
                  under the control of their owner.
                </p>
                <p className="mb-4">
                  This system also means that the only way to interact with the
                  Versus application and contracts is through the spending of
                  Flow tokens from a third party wallet provider. Versus is
                  currently built to support Blocto, but in the future we should
                  be able to support any other large wallet providers.
                </p>
                <p className="mb-4">
                  Versus contracts are entirely open-sourced at{" "}
                  <a
                    href="https://github.com/versus-flow/auction-flow-contract"
                    target="_blank"
                    className="underline"
                  >
                    https://github.com/versus-flow/auction-flow-contract
                  </a>
                </p>
                <p className="mb-4">
                  <br />A SODA has numerous advantages that will contribute to
                  the longevity of the Versus platform.
                </p>
                <p className="mb-4">
                  Versus should not face the scaling issues that some
                  traditional blockchain dapps have faced. As long as wallet
                  providers and the Flow blockchain are able to accommodate
                  increasing demand Versus will effortlessly scale.
                </p>
                <p className="mb-4">
                  In the future when Versus is stably built out the keys for the
                  accounts that host the Versus contracts can theoretically be
                  discarded, creating a truly immutable system.
                </p>
                <p className="mb-4">
                  As long as the Flow blockchain exists Versus will continue to
                  thrive.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </Main>
  );
}
