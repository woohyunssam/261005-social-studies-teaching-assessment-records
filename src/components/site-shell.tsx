"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import {
  BookOpen,
  Menu,
  X,
  ArrowUpRight,
  RotateCcw,
  Check,
} from "lucide-react";
import { site, steps } from "@/data/content";
const ProgressContext = createContext<{
  completed: number[];
  toggle: (step: number) => void;
  notify: (message: string) => void;
}>({ completed: [], toggle: () => {}, notify: () => {} });
export const useProgress = () => useContext(ProgressContext);
const key = "learning-traces-progress-v1";
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  useEffect(() => {
    function restore() {
      try {
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        if (Array.isArray(saved))
          setCompleted([
            ...new Set(
              saved.filter(
                (n: unknown): n is number =>
                  typeof n === "number" &&
                  Number.isInteger(n) &&
                  n >= 1 &&
                  n <= 7,
              ),
            ),
          ]);
      } catch {}
    }
    const frame = requestAnimationFrame(restore);
    window.addEventListener("storage", restore);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", restore);
    };
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  function save(next: number[]) {
    setCompleted(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      setToast("브라우저 저장이 제한되어 이번 방문 동안만 유지됩니다.");
    }
  }
  const nav = [
    ["/", "HOME"],
    ["/lesson/1", "강의 시작"],
    ["/create", "내 수업 만들기"],
    ["/resources", "자료실"],
    ["/books", "저서"],
  ];
  if (pathname === "/") return <>{children}</>;
  return (
    <ProgressContext.Provider
      value={{
        completed,
        toggle: (n) =>
          save(
            completed.includes(n)
              ? completed.filter((x) => x !== n)
              : [...completed, n],
          ),
        notify: setToast,
      }}
    >
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="배움의 흔적 홈">
            <span className="brand-icon">
              <BookOpen size={23} />
            </span>
            <span>
              배움의 흔적<span className="brand-sub">TEACHING TO GROWTH</span>
            </span>
          </Link>
          <nav
            className={menu ? "main-nav open" : "main-nav"}
            aria-label="주 메뉴"
          >
            {nav.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenu(false)}
                aria-current={
                  (
                    href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(
                          href.split("/").slice(0, 2).join("/"),
                        )
                  )
                    ? "page"
                    : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            className="progress-trigger"
            onClick={() => setProgress(!progress)}
            aria-expanded={progress}
          >
            <span className="tiny-ring">{completed.length}</span>
            <span>진행 상황</span>
            <small>{completed.length}/7</small>
          </button>
          <button
            className="menu-toggle icon-button"
            aria-label={menu ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {progress && (
        <section
          className="progress-panel container"
          aria-label="나의 진행 상황"
        >
          <div className="section-heading">
            <h2>
              나의 배움 여정 <small>{completed.length} / 7 완료</small>
            </h2>
            <button
              className="icon-button"
              aria-label="진행 상황 닫기"
              onClick={() => setProgress(false)}
            >
              <X />
            </button>
          </div>
          <progress max={7} value={completed.length} />
          <div className="progress-links">
            {steps.map((s, i) => (
              <Link
                href={`/lesson/${i + 1}`}
                key={s.name}
                onClick={() => setProgress(false)}
              >
                {completed.includes(i + 1) ? (
                  <Check size={16} />
                ) : (
                  <span>{i + 1}</span>
                )}
                {s.name}
              </Link>
            ))}
          </div>
          <button
            className="text-button"
            onClick={() => {
              save([]);
              setToast("진행 상황을 초기화했습니다.");
            }}
          >
            <RotateCcw size={15} /> 진행 초기화
          </button>
          <p className="small">진행 상황은 이 브라우저에만 저장됩니다.</p>
        </section>
      )}
      <div id="main">{children}</div>
      <footer className="footer">
        <div className="container footer-top">
          <div>
            <Link className="brand" href="/">
              <BookOpen size={22} /> 배움의 흔적을 기록으로
            </Link>
            <p>학생의 작은 흔적에서, 성장의 이야기를 발견합니다.</p>
            <small>
              {site.school} 교사 {site.teacher} · 교원 연수용 자료
            </small>
          </div>
          <div className="footer-links">
            <Link href="/lesson/1">강의</Link>
            <Link href="/resources">자료실</Link>
            <Link href="/books">저서</Link>
            <a href={site.padlet} target="_blank" rel="noreferrer">
              Padlet <ArrowUpRight size={14} />
            </a>
            <a href={site.gemini} target="_blank" rel="noreferrer">
              Gemini <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          배움의 흔적 · 함께 설계하고, 함께 성장하는 수업
        </div>
      </footer>
      <div
        role="status"
        aria-live="polite"
        className={toast ? "toast visible" : "toast"}
      >
        {toast && <Check size={18} />} {toast}
      </div>
    </ProgressContext.Provider>
  );
}
