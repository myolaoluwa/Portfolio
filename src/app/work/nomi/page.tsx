import { CaseStudy } from "@/components/case-study";
import { caseStudies, caseStudyMetadata } from "@/lib/case-studies";

export const metadata = caseStudyMetadata(caseStudies.nomi);

export default function NomiWalkthrough() {
  return <CaseStudy study={caseStudies.nomi} />;
}
