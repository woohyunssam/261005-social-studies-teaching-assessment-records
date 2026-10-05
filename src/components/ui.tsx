"use client";
import Image from "next/image";
import { useState } from "react";
import { Copy, ArrowUpRight, Sparkles, Image as ImageIcon } from "lucide-react";
import { site, media } from "@/data/content";
import { useProgress } from "./site-shell";
export function Prompt({
  title,
  text,
  defaultOpen = false,
}: {
  title: string;
  text: string;
  defaultOpen?: boolean;
}) {
  const { notify } = useProgress();
  const [open, setOpen] = useState(defaultOpen);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      notify("프롬프트를 복사했습니다.");
    } catch {
      setOpen(true);
      notify("복사 권한이 없습니다. 본문을 선택해 직접 복사해 주세요.");
    }
  }
  return (
    <section className="prompt">
      <div className="prompt-heading">
        <span>
          <Sparkles size={19} /> READY-TO-USE PROMPT
        </span>
        <button
          className="text-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? "접기" : "전체 보기"}
        </button>
      </div>
      <h3>{title}</h3>
      <pre className={open ? "prompt-text expanded" : "prompt-text"}>
        {text}
      </pre>
      <div className="button-row">
        <button className="button primary" onClick={copy}>
          <Copy size={17} /> 프롬프트 복사
        </button>
        <a
          className="button secondary"
          href={site.gemini}
          target="_blank"
          rel="noreferrer"
        >
          Gemini 열기 <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
export function Flow({ items }: { items: string[] }) {
  return (
    <div className="flow">
      {items.map((item, i) => (
        <span key={item}>
          <b>{item}</b>
          {i < items.length - 1 && <i aria-hidden="true">→</i>}
        </span>
      ))}
    </div>
  );
}
export function Example({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const item = media[id];
  return (
    <figure className="example">
      {item?.src ? (
        <Image
          unoptimized
          width={1000}
          height={700}
          src={item.src}
          alt={item.alt}
        />
      ) : (
        <>
          <figcaption>
            <ImageIcon size={17} />
            {item?.alt}
            <span>설명용 예시</span>
          </figcaption>
          <div className="example-body">
            {children || <p>학생의 생각을 모으고, 서로의 경험을 연결합니다.</p>}
          </div>
        </>
      )}
    </figure>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
