export const metadata = {
  title: "Website editor · Zion4Commerce",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
