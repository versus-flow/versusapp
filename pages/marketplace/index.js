import React, { useState, useEffect } from "react";
import Head from "next/head";

import Main from "../../components/layouts/Main";
import Holder from "../../components/marketplace/filters/Holder";
import Sorting from "../../components/marketplace/filters/Sorting";
import Results from "../../components/marketplace/Results";

export default function Marketplace() {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {}, []);
  return (
    <Main>
      {() => (
        <>
          <Head>
            <title>Marketplace</title>
          </Head>
          <div className="bg-white min-h-screen pb-20">
            <div className="container pt-12">
              <div className="w-full grid grid-cols-12 gap-12">
                <div className="col-span-4">
                  <Holder />
                </div>
                <div className="col-span-8 pr-12">
                  <Sorting />
                  <Results />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Main>
  );
}
