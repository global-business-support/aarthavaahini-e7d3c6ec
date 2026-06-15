import { createFileRoute } from "@tanstack/react-router";
import { PartnerLayout } from "@/components/partner/PartnerLayout";

export const Route = createFileRoute("/partner")({ component: PartnerLayout });
