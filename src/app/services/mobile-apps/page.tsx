import { ServicePage } from "@/components/service-page";
import { serviceOffers, serviceMetadata } from "@/lib/services";
const service = serviceOffers[2];
export const metadata = serviceMetadata(service);
export default function Page() { return <ServicePage service={service} />; }
