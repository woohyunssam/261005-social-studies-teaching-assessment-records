"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Sprout,
  Compass,
  MessageCircle,
  MapPin,
  PenLine,
  Layers,
  Sparkles,
  Check,
  ClipboardCheck,
} from "lucide-react";
import { steps, trainingBook } from "@/data/content";
import { useProgress } from "./site-shell";
const icons = [
  Compass,
  Layers,
  MapPin,
  MessageCircle,
  Sprout,
  ClipboardCheck,
  PenLine,
];
export function Home() {
  const { completed } = useProgress();
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> 교사를 위한 수업 설계 & 기록 워크숍
          </p>
          <div className="tool-pills">
            <span>Padlet</span>
            <i>×</i>
            <span>
              Gemini <Sparkles size={13} />
            </span>
          </div>
          <h1>
            배움의 흔적을
            <br />
            <em>기록으로.</em>
          </h1>
          <p className="hero-subtitle">
            개념 기반 탐구와 피드백 중심의
            <br />
            교·수·평·기 일체화
          </p>
          <p className="hero-question">
            수업 시간에 남긴 학생의 생각을
            <br />
            어떻게 평가와 기록까지 연결할 수 있을까요?
          </p>
          <div className="button-row">
            <Link
              className="button primary large"
              href={`/lesson/${steps.findIndex((_, i) => !completed.includes(i + 1)) + 1 || 1}`}
            >
              {completed.length ? "이어서 실습하기" : "실습 시작하기"}{" "}
              <ArrowRight size={18} />
            </Link>
            <a className="button secondary large" href="#journey">
              전체 흐름 보기 <span>↘</span>
            </a>
          </div>
          <div className="teacher">
            <span className="teacher-avatar">최</span>
            <div>
              <strong>
                최우현 <span>선생님과 함께</span>
              </strong>
              <small>광주양동초등학교 · 초등 3학년 사회 실제 수업 사례</small>
            </div>
          </div>
        </div>
        <a
          className="hero-book"
          href={trainingBook.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${trainingBook.title} — YES24 구입처 보기 (새 탭)`}
        >
          <span className="eyebrow">이 책을 바탕으로 함께하는 연수</span>
          <Image
            className="hero-book-cover"
            src={trainingBook.cover}
            alt={`${trainingBook.title} 표지`}
            width={849}
            height={1200}
            priority
            unoptimized
          />
          <span className="hero-book-caption">
            최우현 공저 · 개념기반 탐구학습과 AI 디지털 기반 수업
          </span>
          <span className="hero-book-link">
            YES24에서 책 구입하기 <ArrowUpRight size={18} />
          </span>
        </a>
      </section>
      <section className="belief">
        <div className="container belief-inner">
          <p>
            수업 속에 이미,
            <br />
            <strong>평가의 답이 있습니다.</strong>
          </p>
          <div>
            <span>
              <BookOpen /> 수업 공간
            </span>
            <i>=</i>
            <span>
              <MessageCircle /> 평가 공간
            </span>
            <i>=</i>
            <span>
              <PenLine /> 기록 데이터
            </span>
          </div>
        </div>
      </section>
      <section className="container section" id="journey">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM LESSON TO GROWTH</p>
            <h2>일곱 걸음으로 완성하는 수업</h2>
            <p>
              교육과정에서 출발해, 한 학생의 성장 이야기까지 함께 걸어갑니다.
            </p>
          </div>
          <span className="section-meta">7 STEPS · 나의 속도로</span>
        </div>
        <div className="journey-grid">
          {steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <Link
                href={`/lesson/${i + 1}`}
                className={`journey-card ${i === 6 ? "last-card" : ""}`}
                key={s.name}
              >
                <div className="card-top">
                  <span className={`step-icon ${s.color}`}>
                    <Icon size={23} />
                  </span>
                  <span className="step-no">
                    {completed.includes(i + 1) ? (
                      <Check size={20} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                </div>
                <h3>
                  {s.name}
                  <ArrowUpRight size={20} />
                </h3>
                <p>{s.desc}</p>
                <span className="card-tag">{s.tag}</span>
              </Link>
            );
          })}
          <div className="journey-note">
            <Sprout size={30} />
            <p>
              학생이 수업에서 남긴
              <br />
              <strong>
                모든 흔적은
                <br />
                평가 자료가 됩니다.
              </strong>
            </p>
          </div>
        </div>
      </section>
      <section className="container reuse-banner">
        <div>
          <span className="eyebrow">MAKE IT YOURS</span>
          <h2>이제, 선생님의 수업으로.</h2>
          <p>
            학년과 단원만 바꾸면 나만의 수업 프롬프트가 완성됩니다.
            <br />
            연수가 끝난 뒤에도, 새로운 수업을 시작할 때 함께하세요.
          </p>
        </div>
        <Link href="/create" className="button primary large">
          <Sparkles size={18} /> 내 수업 만들기 <ArrowRight size={18} />
        </Link>
      </section>
      <section className="container quick-links">
        <Link href="/resources">
          <BookOpen />
          <div>
            <h3>필요한 자료를 한곳에</h3>
            <p>실습에 바로 쓰는 프롬프트와 템플릿</p>
          </div>
          <ArrowUpRight />
        </Link>
        <Link href="/books">
          <Layers />
          <div>
            <h3>수업의 이야기를 책으로</h3>
            <p>AI·에듀테크와 함께한 교실의 경험</p>
          </div>
          <ArrowUpRight />
        </Link>
      </section>
    </main>
  );
}
