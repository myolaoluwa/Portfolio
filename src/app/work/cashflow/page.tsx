import { CaseStudy } from "@/components/case-study";
import { caseStudies, caseStudyMetadata } from "@/lib/case-studies";

export const metadata = caseStudyMetadata(caseStudies.cashflow);

export default function CashflowCaseStudy() {
  return <CaseStudy study={caseStudies.cashflow} />;
}
