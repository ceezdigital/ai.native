import { UtilityBar } from "@/features/utility-bar";
import { Nav } from "@/features/nav";
import { Hero } from "@/features/hero";
import { ProofBand } from "@/features/proof-band";
import { Problem } from "@/features/problem";
import { Offers } from "@/features/offers";
import { Why } from "@/features/why";
import { News } from "@/features/news";
import { RoomMoment } from "@/features/room-moment";
import { CloneCamp } from "@/features/clone-camp";
import { Community } from "@/features/community";
import { Retainer } from "@/features/retainer";
import { Footer } from "@/features/footer";

export default function Home() {
  return (
    <main>
      <UtilityBar />
      <Nav />
      <Hero />
      <ProofBand />
      <Problem />
      <Offers />
      <Why />
      <News />
      <RoomMoment />
      <CloneCamp />
      <Community />
      <Retainer />
      <Footer />
    </main>
  );
}
