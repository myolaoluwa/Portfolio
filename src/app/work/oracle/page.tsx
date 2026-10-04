import { CaseStudy } from "@/components/case-study";
import { caseStudies, caseStudyMetadata } from "@/lib/case-studies";

export const metadata = caseStudyMetadata(caseStudies.oracle);

export default function OracleWalkthrough() {
  return <CaseStudy study={caseStudies.oracle} />;
}
