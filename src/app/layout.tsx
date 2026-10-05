import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "배움의 흔적을 기록으로", template: "%s | 배움의 흔적" },
  description:
    "최우현 선생님과 함께하는 Padlet × Gemini 교수·평·기 실습. 개념 기반 탐구부터 학생 성장 기록까지.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Browser extensions may add attributes such as data-kantu before hydration.
    // Suppress only the root element mismatch; keep checks on page content.
    <html lang="ko" suppressHydrationWarning>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
