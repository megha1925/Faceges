import React, { FC, Fragment } from "react";
import Image from "next/image";

const index = () => {
  return (
    <Fragment>
      <div style={{ margin: "auto", display: "block", textAlign: "center" }}>
        <Image src="/spinner.gif" alt="Loading..." width={100} height={100} />
      </div>
    </Fragment>
  );
};

export default index;
