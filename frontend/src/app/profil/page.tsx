import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import ProfileMainView from "@/components/views/profil/ProfileMainView";
import React, { Fragment } from "react";

const ProfilePage = () => {
  return (
    <Fragment>
      <Header />
      <ProfileMainView />
      <Footer />
    </Fragment>
  );
};

export default ProfilePage;
