import PortfolioExperience from "@/components/portfolio-experience";
import { Services } from "@/components/services";
import { Engagement } from "@/components/engagement";

export default function Home() {
  return (
    <PortfolioExperience
      services={<Services />}
      engagement={<Engagement />}
    />
  );
}
