import { CaseStudy } from "@/components/case-study";
import { caseStudies, caseStudyMetadata } from "@/lib/case-studies";

export const metadata = caseStudyMetadata(caseStudies.elara);

export default function ElaraCaseStudy() {
  return <CaseStudy study={caseStudies.elara} />;
}
