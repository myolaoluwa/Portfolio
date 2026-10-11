import PortfolioExperience from "@/components/portfolio-experience";
import { PortfolioContent } from "@/components/portfolio-content";
import { Services } from "@/components/services";
import { Engagement } from "@/components/engagement";
import { InsightsLinks } from "@/components/insights-links";

export default function Home() {
  return (
    <PortfolioExperience>
      <PortfolioContent
        services={<Services />}
        engagement={<Engagement />}
        insights={<InsightsLinks />}
      />
    </PortfolioExperience>
  );
}
