import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import KlinikMainView from "@/components/views/klinik/KlinikMainView";

import React, { Fragment } from "react";

const page = () => {
  return (
    <Fragment>
      <Header />
      <KlinikMainView />
      <Footer />
    </Fragment>
  );
};

export default page;
