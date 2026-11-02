import "../../(site)/site.css";
import { PreviewFrame } from "@/components/editor/PreviewFrame";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default function PreviewPage() {
  return <PreviewFrame />;
}
