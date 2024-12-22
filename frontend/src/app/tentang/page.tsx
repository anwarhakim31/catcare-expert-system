import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import TentangMainView from "@/components/views/tentang/TentangMainview";
import React, { Fragment } from "react";

const TentangPage = () => {
  return (
    <Fragment>
      <Header />
      <TentangMainView />
      <Footer />
    </Fragment>
  );
};
export default TentangPage;
