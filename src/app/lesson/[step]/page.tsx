import { Lesson } from "@/components/lesson";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return Array.from({ length: 7 }, (_, i) => ({ step: String(i + 1) }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (!/^[1-7]$/.test(step)) notFound();
  return <Lesson step={Number(step)} />;
}
