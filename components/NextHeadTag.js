import React from "react";
import Head from "next/head";

export default function NextHeadTag({ queryLength,queriedpaletteslength }) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="Configuration generator of various brand colors for background, border and text for Tailwind CSS."
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
