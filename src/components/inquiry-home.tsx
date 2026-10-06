"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  Compass,
  Download,
  Glasses,
  Leaf,
  Lightbulb,
  Menu,
  MessageCircle,
  MoveUpRight,
  Network,
  Sprout,
  X,
} from "lucide-react";
import "./inquiry.css";
import "./stitch-inquiry-theme.css";

const elements = [
  {
    title: "사실적 지식",
    en: "FACT",
    icon: BookOpen,
    question: "무엇을 알아야 할까?",
    text: "탐구의 바탕이 되는 구체적인 사실, 사례, 정보와 데이터를 모읍니다.",
    example: "학교, 시장, 공원, 병원과 그곳에서 사람들이 하는 일",
    note: "사실은 탐구의 재료입니다.",
  },
  {
    title: "핵심 개념",
    en: "CORE CONCEPT",
    icon: Boxes,
    question: "사실을 연결하는 생각은?",
    text: "여러 사례에서 반복되는 공통된 의미와 중심 개념을 발견합니다.",
    example: "장소 · 생활 · 변화 · 관계 · 공동체",
    note: "낱개의 지식을 의미로 연결합니다.",
  },
  {
    title: "개념 렌즈",
    en: "CONCEPTUAL LENS",
    icon: Glasses,
    question: "어떤 관점으로 바라볼까?",
    text: "사실을 더 넓고 깊게 바라보도록 돕는 ‘사고의 안경’을 선택합니다.",
    example: "변화 · 체계 · 상호의존 · 정체성 · 관계 · 원인과 결과 · 관점",
    note: "같은 사실도 관점에 따라 새로워집니다.",
  },
  {
    title: "일반화 문장",
    en: "GENERALIZATION",
    icon: Lightbulb,
    question: "어떤 이해에 도달할까?",
    text: "개념 사이의 관계를 시간과 장소를 넘어 적용할 수 있는 문장으로 표현합니다.",
    example: "사람과 장소는 서로 영향을 주고받으며 변화한다.",
    note: "이해는 새로운 상황으로 이어집니다.",
  },
];
const questions = [
  {
    title: "사실적 질문",
    en: "Factual",
    label: "관찰하고 알아보기",
    question: "우리 동네에는 어떤 장소가 있을까?",
    detail: "지도와 사진, 현장 관찰을 통해 장소의 이름과 기능을 찾아봅니다.",
    activity: "장소 사진을 모아 기능별로 분류하기",
  },
  {
    title: "개념적 질문",
    en: "Conceptual",
    label: "관계를 발견하기",
    question: "장소와 사람들의 생활은 어떤 관계가 있을까?",
    detail:
      "서로 다른 장소를 비교하며 사람들의 필요와 장소의 기능이 연결되는 방식을 설명합니다.",
    activity: "장소와 생활을 연결한 관계 지도 만들기",
  },
  {
    title: "논쟁적 질문",
    en: "Debatable",
    label: "근거를 들어 판단하기",
    question: "우리 동네에는 공원과 병원 중 어떤 시설이 더 필요할까?",
    detail:
      "주민의 필요와 기존 시설을 조사하고, 서로 다른 입장을 근거와 함께 비교합니다.",
    activity: "주민의 입장에서 우선순위 토론하기",
  },
  {
    title: "실천적 질문",
    en: "Action",
    label: "삶으로 연결하기",
    question: "우리 동네를 더 살기 좋게 만들기 위해 무엇을 할 수 있을까?",
    detail:
      "탐구한 관계를 바탕으로 실현 가능한 개선안을 제안하고 예상되는 변화를 설명합니다.",
    activity: "우리 동네 공간 개선 제안서 만들기",
  },
];
const stages = [
  ["성취기준 분석", "학생이 배울 지식·기능·가치를 살펴봅니다."],
  ["사실적 지식 추출", "반드시 알아야 할 사실과 사례를 정리합니다."],
  ["핵심 개념 선정", "사실을 연결하는 중심 개념을 찾습니다."],
  ["개념 렌즈 선정", "단원을 바라볼 사고의 관점을 정합니다."],
  ["일반화 문장 만들기", "도달할 개념적 이해를 문장으로 표현합니다."],
  ["탐구 질문 만들기", "사실·개념·논쟁·실천 질문으로 사고를 넓힙니다."],
  ["탐구 활동 설계", "비교·분류·조사·토론·문제 해결을 배치합니다."],
  ["평가와 전이", "새로운 상황에 개념을 적용하고 이해를 확인합니다."],
];
const connections = [
  ["깊이 있는 학습", "핵심 개념과 일반화를 중심으로 단원을 재구성"],
  ["탐구 중심 교수·학습", "질문 → 조사 → 비교 → 토론 → 개념화"],
  ["학생 주도성", "학생이 질문하고 근거를 찾아 의미를 구성"],
  ["역량 함양", "지식을 활용하여 설명·판단·문제 해결"],
  ["학습의 전이", "새로운 사례와 실제 삶에 개념을 적용"],
  ["교사의 교육과정 자율성", "성취기준을 바탕으로 개념·질문·활동을 재구성"],
];

export function InquiryHome() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(0);
  const [lens, setLens] = useState("상호의존");
  const [downloaded, setDownloaded] = useState(false);
  const lensQuestions: Record<string, string> = {
    상호의존: "장소와 사람들은 서로 어떤 도움을 주고받을까?",
    변화: "사람들의 생활이 달라지면 동네의 모습은 어떻게 바뀔까?",
    관점: "같은 장소를 어린이와 어른은 어떻게 다르게 바라볼까?",
  };
  function download() {
    const content =
      "개념기반 탐구 단원 설계 노트\n\n단원명: \n학년 / 교과: \n\n" +
      stages
        .map(
          ([title, text], i) => `${i + 1}. ${title}\n${text}\n나의 설계: \n\n`,
        )
        .join("") +
      "일반화 점검: 다른 시간과 장소에도 적용할 수 있나요?\n평가 점검: 새로운 사례를 설명할 때 개념과 근거를 활용하나요?\n";
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", content], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "개념기반-탐구-설계노트.txt";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }
  return (
    <div className="inquiry">
      <a href="#inquiry-main" className="skip-link">
        본문으로 바로가기
      </a>
      <header className="iq-header">
        <div className="iq-wrap iq-nav">
          <a href="#" className="iq-brand">
            <span>
              <Sprout size={25} />
            </span>
            개념의 숲<small>CONCEPT TO CONNECTION</small>
          </a>
          <nav
            className={menu ? "iq-links is-open" : "iq-links"}
            aria-label="주 메뉴"
          >
            {[
              ["#why", "교육과정과 연결"],
              ["#principles", "핵심 설계 원리"],
              ["#questions", "탐구 질문"],
              ["#example", "수업 예제"],
            ].map(([href, title]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {title}
              </a>
            ))}
          </nav>
          <a className="iq-nav-cta" href="#design">
            설계 시작하기 <ArrowUpRight size={16} />
          </a>
          <button
            className="iq-menu"
            aria-label={menu ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="inquiry-main">
        <section className="iq-hero iq-wrap">
          <div className="iq-hero-copy">
            <div className="iq-eyebrow">
              <span /> 질문으로 자라는 배움, 개념으로 연결되는 세상
            </div>
            <h1>
              사실에서 개념으로,
              <br />
              배움에서 <em>삶으로.</em>
            </h1>
            <p className="iq-hero-sub">개념기반 탐구학습</p>
            <p className="iq-intro">
              사실을 배우고, 개념을 발견하며,
              <br />
              스스로 질문하고 새로운 상황에 적용하는 수업.
              <br />
              깊이 있는 배움의 여정을 함께 설계해 보세요.
            </p>
            <div className="iq-actions">
              <a className="iq-button" href="#principles">
                핵심 원리 알아보기 <ArrowRight size={18} />
              </a>
              <a className="iq-text-link" href="#example">
                수업 예제 살펴보기 <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="iq-hero-note">
              <span>
                <Leaf size={15} />
              </span>{" "}
              2022 개정 교육과정과 함께하는 수업의 변화
            </div>
          </div>
          <div
            className="iq-visual"
            aria-label="사실에서 개념, 일반화를 거쳐 삶으로 전이되는 배움"
          >
            <div className="iq-orbit orbit-one" />
            <div className="iq-orbit orbit-two" />
            <div className="iq-visual-caption">
              THE JOURNEY OF UNDERSTANDING
            </div>
            <div className="iq-float iq-fact">
              <BookOpen size={21} />
              <div>
                <small>01 · FACT</small>
                <strong>사실을 만나다</strong>
                <p>관찰하고, 발견하고</p>
              </div>
            </div>
            <div className="iq-float iq-concept">
              <Boxes size={22} />
              <div>
                <small>02 · CONCEPT</small>
                <strong>개념을 연결하다</strong>
                <p>공통된 의미를 찾고</p>
              </div>
            </div>
            <div className="iq-float iq-general">
              <Lightbulb size={23} />
              <div>
                <small>03 · GENERALIZATION</small>
                <strong>이해를 만들다</strong>
                <p>관계를 나의 언어로</p>
              </div>
            </div>
            <div className="iq-float iq-transfer">
              <MoveUpRight size={23} />
              <div>
                <small>04 · TRANSFER</small>
                <strong>삶으로 나아가다</strong>
                <p>새로운 세상에 적용하기</p>
              </div>
            </div>
            <div className="iq-center">
              <Sprout size={43} strokeWidth={1.3} />
              <span>
                작은 질문 하나가
                <br />
                <b>깊은 배움이 되도록</b>
              </span>
            </div>
            <span className="iq-spark spark-one">✳</span>
            <span className="iq-spark spark-two">✦</span>
            <span className="iq-visual-foot">
              더 많이 아는 것을 넘어, 더 깊이 이해하는 배움
            </span>
          </div>
        </section>
        <div className="iq-ribbon">
          <div className="iq-wrap">
            <span>배움의 방향을 바꾸는 네 가지 연결</span>
            {["사실", "개념", "일반화", "전이"].map((s, i) => (
              <div key={s}>
                <b>0{i + 1}</b> {s}
                {i < 3 && <ArrowRight size={16} />}
              </div>
            ))}
          </div>
        </div>
        <section id="why" className="iq-section iq-wrap">
          <div className="iq-section-head">
            <div>
              <span className="iq-kicker">01 / WHY CONCEPT-BASED INQUIRY</span>
              <h2>왜 지금, 개념기반 탐구학습일까요?</h2>
            </div>
            <p>
              많이 기억하는 수업에서 깊이 이해하는 수업으로.
              <br />
              2022 개정 교육과정의 방향을 교실에서 연결합니다.
            </p>
          </div>
          <div className="iq-values">
            {[
              [
                BookOpen,
                "깊이 있는 학습",
                "핵심적인 내용을 연결하며\n배움의 본질을 이해합니다.",
              ],
              [
                MessageCircle,
                "탐구 중심 학습",
                "스스로 질문하고 근거를 찾으며\n의미를 만들어 갑니다.",
              ],
              [
                Compass,
                "역량의 함양",
                "지식을 실제 상황에 활용하며\n문제를 해결하는 힘을 기릅니다.",
              ],
              [
                Sprout,
                "삶과 연결된 전이",
                "교실에서 발견한 이해를\n새로운 상황과 삶에 적용합니다.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof BookOpen;
              return (
                <article key={String(title)}>
                  <I size={24} strokeWidth={1.5} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </div>
          <details className="iq-details">
            <summary>
              2022 개정 교육과정과의 연결 자세히 보기 <span>＋</span>
            </summary>
            <div className="iq-table">
              <table>
                <thead>
                  <tr>
                    <th>교육과정의 방향</th>
                    <th>개념기반 탐구학습에서의 구현 예</th>
                  </tr>
                </thead>
                <tbody>
                  {connections.map(([a, b]) => (
                    <tr key={a}>
                      <td>{a}</td>
                      <td>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                위 연결은 수업 설계를 위한 해석입니다. 개념기반 탐구학습은
                교육과정의 방향을 구현하는 하나의 방법입니다.
              </p>
              <a
                href="https://www.moe.go.kr/boardCnts/viewRenew.do?boardID=340&boardSeq=89952&lev=0&m=020501&opType=N&page=124&s=moe"
                target="_blank"
                rel="noreferrer"
              >
                교육부 · 2022 개정 교육과정 관련 자료 ↗
              </a>
            </div>
          </details>
        </section>
        <section id="principles" className="iq-tinted">
          <div className="iq-wrap iq-section">
            <div className="iq-section-head">
              <div>
                <span className="iq-kicker">02 / THE FOUR BUILDING BLOCKS</span>
                <h2>깊이 있는 이해를 만드는 네 가지 설계 요소</h2>
              </div>
              <p>
                무엇을 알고, 어떤 관점으로 바라보며,
                <br />
                결국 무엇을 이해하게 할 것인가.
              </p>
            </div>
            <div className="iq-elements">
              {elements.map((el, i) => (
                <article key={el.en} className={`iq-element el-${i}`}>
                  <div className="iq-element-top">
                    <el.icon size={26} strokeWidth={1.5} />
                    <span>0{i + 1}</span>
                  </div>
                  <small>{el.en}</small>
                  <h3>{el.title}</h3>
                  <h4>{el.question}</h4>
                  <p>{el.text}</p>
                  <div className="iq-el-example">
                    <span>예를 들어</span>
                    {el.example}
                  </div>
                  <footer>{el.note}</footer>
                </article>
              ))}
            </div>
            <div className="iq-lens">
              <div>
                <Glasses size={30} />
                <h3>
                  사고의 안경을 바꾸면,
                  <br />
                  질문도 달라집니다.
                </h3>
              </div>
              <div className="iq-lens-demo">
                <div className="iq-chips" aria-label="개념 렌즈 선택">
                  {Object.keys(lensQuestions).map((l) => (
                    <button
                      key={l}
                      aria-pressed={lens === l}
                      onClick={() => setLens(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <p aria-live="polite">“{lensQuestions[lens]}”</p>
              </div>
            </div>
            <details className="iq-details">
              <summary>
                좋은 일반화 문장은 무엇이 다를까요? <span>＋</span>
              </summary>
              <div className="iq-compare">
                <div>
                  <small>구체적인 사실</small>
                  <p>광주에는 사람들이 이용하는 다양한 시설이 있다.</p>
                </div>
                <div>
                  <small>다른 맥락으로 확장되는 일반화</small>
                  <p>
                    사람들의 필요와 생활 방식에 따라 지역의 공간은 서로 다른
                    기능을 갖는다.
                  </p>
                </div>
                <strong>
                  <Check size={18} /> 다른 시간과 장소에도 적용할 수 있는지
                  확인해 보세요.
                </strong>
              </div>
            </details>
          </div>
        </section>
        <section id="questions" className="iq-section iq-wrap">
          <div className="iq-section-head">
            <div>
              <span className="iq-kicker">
                03 / QUESTIONS THAT OPEN THINKING
              </span>
              <h2>개념을 질문으로, 질문을 탐구로.</h2>
            </div>
            <p>
              설계한 개념적 이해를 학생의 배움으로 바꾸는 질문.
              <br />
              질문을 눌러 사고가 확장되는 모습을 살펴보세요.
            </p>
          </div>
          <div className="iq-question-layout">
            <div className="iq-question-options">
              {questions.map((q, i) => (
                <button
                  key={q.en}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  <span>0{i + 1}</span>
                  <b>{q.title}</b>
                  <small>{q.en}</small>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
            <div className="iq-question-content" aria-live="polite">
              <span className="iq-kicker">{questions[selected].label}</span>
              <h3>“{questions[selected].question}”</h3>
              <p>{questions[selected].detail}</p>
              <div>
                <span>수업 속 활동</span>
                {questions[selected].activity}
              </div>
            </div>
          </div>
          <p className="iq-fine">
            사실적·개념적·논쟁적 질문에 실천적 질문을 더한 수업 구성 예시입니다.
            질문은 탐구 과정에서 서로 오갈 수 있습니다.
          </p>
        </section>
        <section id="example" className="iq-example-section">
          <div className="iq-wrap iq-section">
            <div className="iq-section-head">
              <div>
                <span className="iq-kicker">04 / FROM THEORY TO CLASSROOM</span>
                <h2>하나의 수업으로 연결해 볼까요?</h2>
              </div>
              <span className="iq-tag">초등 사회 · 3학년 수업 예시</span>
            </div>
            <div className="iq-example-grid">
              <div className="iq-example-title">
                <span>우리 삶에서 시작하는 탐구</span>
                <h3>
                  우리가
                  <br />
                  사는 곳
                </h3>
                <Network size={76} strokeWidth={1} />
                <p>학습 목표 예시</p>
                <strong>
                  우리 주변의 장소와
                  <br />
                  사람들의 생활 모습을 탐구한다.
                </strong>
                <small>성취기준 원문이 아닌 설명용 목표입니다.</small>
              </div>
              <div className="iq-example-flow">
                {[
                  [
                    "FACT",
                    "학교, 공원, 시장, 병원, 도로",
                    "우리 동네의 여러 장소와 기능을 관찰합니다.",
                  ],
                  [
                    "CORE CONCEPT",
                    "장소 · 생활 · 관계",
                    "다양한 사실에서 공통된 의미를 찾습니다.",
                  ],
                  [
                    "CONCEPTUAL LENS",
                    "상호의존 Interdependence",
                    "사람과 장소가 주고받는 영향을 살펴봅니다.",
                  ],
                  [
                    "GENERALIZATION",
                    "사람들의 필요와 생활 방식은 장소의 모습을 만들고, 장소의 특성은 다시 사람들의 생활에 영향을 준다.",
                    "여러 사례를 근거로 관계를 설명합니다.",
                  ],
                ].map(([label, title, desc], i) => (
                  <div key={label}>
                    <span className="iq-flow-dot">{i + 1}</span>
                    <div>
                      <small>{label}</small>
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="iq-transfer-box">
              <MoveUpRight size={28} />
              <div>
                <small>TRANSFER & ASSESSMENT · 평가와 전이</small>
                <h3>“다른 지역에서도 이러한 관계가 나타날까?”</h3>
                <p>
                  낯선 지역의 지도와 생활 자료를 살펴보고, 장소와 생활의 관계를
                  근거와 함께 설명해 봅니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="design" className="iq-section iq-wrap">
          <div className="iq-section-head">
            <div>
              <span className="iq-kicker">05 / DESIGN YOUR OWN INQUIRY</span>
              <h2>이제, 나의 탐구 단원을 설계해 보세요.</h2>
            </div>
            <p>
              성취기준에서 출발해 새로운 상황으로의 전이까지.
              <br />
              여덟 가지 단계가 수업 설계의 길잡이가 됩니다.
            </p>
          </div>
          <div className="iq-stages">
            {stages.map(([title, text], i) => (
              <article key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="iq-download">
            <div>
              <span className="iq-kicker">YOUR NEXT CHAPTER</span>
              <h3>좋은 수업은, 좋은 질문 하나에서 시작됩니다.</h3>
              <p>여덟 단계 설계 노트에 나만의 수업 아이디어를 담아 보세요.</p>
            </div>
            <button className="iq-button" onClick={download}>
              <Download size={18} /> 설계 노트 내려받기
            </button>
            <span className="iq-download-status" role="status">
              {downloaded ? "텍스트 형식의 설계 노트를 내려받았습니다." : ""}
            </span>
          </div>
        </section>
      </main>
      <footer className="iq-footer iq-wrap">
        <a className="iq-brand" href="#">
          <Sprout size={23} />
          개념의 숲
        </a>
        <p>사실을 연결하고, 질문을 키우고, 배움을 삶으로.</p>
        <span>개념기반 탐구학습 안내 · 교사를 위한 수업 설계</span>
        <a href="#">맨 위로 ↑</a>
      </footer>
    </div>
  );
}
