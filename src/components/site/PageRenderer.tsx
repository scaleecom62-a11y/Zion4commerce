import type { PageContent, SiteSettings } from "@/lib/content/schema";
import { SECTION_COMPONENTS } from "./sections";
import type { RenderData } from "./shared";

export function PageRenderer({ page, site, data, selectable }: { page: PageContent; site: SiteSettings; data: RenderData; selectable?: boolean }) {
  const visible = page.sections.filter((s) => !s.hidden && SECTION_COMPONENTS[s.type]);
  return (
    <>
      {visible.map((section, i) => {
        const Component = SECTION_COMPONENTS[section.type];
        return (
          <div key={section.id} data-section-id={section.id} data-section-type={section.type} className={selectable ? "z-selectable" : undefined}>
            <Component section={section} site={site} data={data} isFirst={i === 0} />
          </div>
        );
      })}
    </>
  );
}
