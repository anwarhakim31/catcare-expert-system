import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import FaqView from "@/components/views/home/FaqView";
import HeroView from "@/components/views/home/HeroView";
import InformationView from "@/components/views/home/InformationView";
import IntructionView from "@/components/views/home/IntructionView";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <main className="py-16">
        <HeroView />
        <IntructionView />
        <InformationView />
        <FaqView />
      </main>
      <Footer />
    </Fragment>
  );
}
