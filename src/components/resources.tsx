"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search, ArrowRight } from "lucide-react";
import { resources, books } from "@/data/content";
import { PageHeading } from "./ui";
export function Resources() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const categories = [
    "전체",
    "강의자료",
    "Padlet",
    "Gemini",
    "프롬프트",
    "템플릿",
    "학생 결과 예시",
  ];
  const found = resources.filter(
    (r) =>
      (category === "전체" || r.category === category) &&
      `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="container page">
      <PageHeading
        eyebrow="THE RESOURCE LIBRARY"
        title="수업에 바로 쓰는 자료실"
        description="연수 중에도, 새로운 수업을 준비할 때도. 필요한 자료를 꺼내 쓰세요."
      />
      <div className="resource-toolbar">
        <div className="filter-tabs" aria-label="자료 카테고리">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            aria-label="자료 검색"
            placeholder="자료 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="small" role="status">
        {found.length}개의 자료
      </p>
      <div className="three-grid">
        {found.map((r, i) => (
          <article className="resource-card" key={r.title}>
            <span
              className={`step-icon ${["sage", "peach", "lavender"][i % 3]}`}
            >
              <BookOpen />
            </span>
            <span className="badge">{r.category}</span>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            {r.url.startsWith("http") || r.url.endsWith(".html") ? (
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="text-button"
              >
                자료 열기 <ArrowUpRight size={17} />
              </a>
            ) : (
              <Link href={r.url} className="text-button">
                자료 보기 <ArrowRight size={17} />
              </Link>
            )}
          </article>
        ))}
      </div>
      {!found.length && (
        <div className="empty-result">
          <Search size={32} />
          <h2>검색 결과가 없어요.</h2>
          <p>다른 검색어나 카테고리를 선택해 주세요.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory("전체");
            }}
          >
            전체 자료 보기
          </button>
        </div>
      )}
    </main>
  );
}
export function Books() {
  return (
    <main className="container page">
      <PageHeading
        eyebrow="BEYOND THE CLASSROOM"
        title="최우현 선생님의 저서"
        description="AI·에듀테크를 수업과 학급 운영에 실제로 적용한 경험을 관련 저서에서도 만나보세요."
      />
      <div className="books-grid">
        {books.map((b, i) => (
          <article className="book-card" key={b.url}>
            <div className={`book-stage ${b.color}`}>
              {b.cover ? (
                <Image
                  unoptimized
                  width={1000}
                  height={700}
                  src={b.cover}
                  alt={`${b.title} 표지`}
                />
              ) : (
                <div className="book-placeholder">
                  <small>TEACHING & LEARNING</small>
                  <BookOpen size={30} />
                  <h2>{b.title}</h2>
                  <span>표지 이미지 준비 중</span>
                </div>
              )}
            </div>
            <div className="book-info">
              <span className="eyebrow">BOOK 0{i + 1}</span>
              <h2>{b.title}</h2>
              <p>{b.description}</p>
              <a
                className="button secondary"
                href={b.url}
                target="_blank"
                rel="noreferrer"
              >
                YES24에서 보기 <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
