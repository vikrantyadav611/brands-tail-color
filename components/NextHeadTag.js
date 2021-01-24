import React from "react";
import Head from "next/head";

export default function NextHeadTag({ queryLength,queriedpaletteslength }) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="Configurable custom animation utilities generator for Tailwind CSS."
        ></meta>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {!queryLength ? (
          <title>Brand Colors</title>
        ) : (
          <title>
            Brand Colors -{" "}
            {`${queriedpaletteslength} ${
              queriedpaletteslength === 1 ? "result" : "results"
            }`}
          </title>
        )}
      </Head>
    </React.Fragment>
  );
}
