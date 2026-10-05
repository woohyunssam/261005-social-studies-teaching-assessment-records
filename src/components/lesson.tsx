"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  BookOpen,
} from "lucide-react";
import {
  steps,
  questions,
  prompts,
  selfAssessments,
  site,
} from "@/data/content";
import {
  initialForm,
  lessonContext,
  personalizeExtraction,
} from "@/lib/builder";
import { LessonFields } from "./builder";
import { Prompt, Flow, Example } from "./ui";
import { useProgress } from "./site-shell";
function ActivityEditor() {
  const [items, setItems] = useState([
    { id: 1, text: "Sandbox에 우리 동네의 의미 있는 장소 그리기", use: true },
    { id: 2, text: "장소에 얽힌 경험과 느낌을 게시물로 남기기", use: true },
    { id: 3, text: "친구의 장소 경험을 읽고 공감 댓글 남기기", use: true },
  ]);
  const [draft, setDraft] = useState("");
  return (
    <section className="panel">
      <h2>우리 반에 맞는 활동 고르기</h2>
      <p>
        아래는 패들렛 AI 레시피로 만든 수업 활동 아이디어 예시입니다. 내 수업에
        맞는 수업 아이디어를 찾아 활용해 봅시다.
      </p>
      <Example id="activityIdeas" />
      <p>
        아이디어를 수정하거나 추가하며 활동을 설계해 보세요. 이 실습은
        새로고침하면 초기화됩니다.
      </p>
      {items.map((item, i) => (
        <div className="activity-row" key={item.id}>
          <input
            aria-label={`활동 ${i + 1} 사용`}
            type="checkbox"
            checked={item.use}
            onChange={() =>
              setItems(
                items.map((x) =>
                  x.id === item.id ? { ...x, use: !x.use } : x,
                ),
              )
            }
          />
          <input
            aria-label={`활동 ${i + 1} 내용 수정`}
            value={item.text}
            onChange={(e) =>
              setItems(
                items.map((x) =>
                  x.id === item.id ? { ...x, text: e.target.value } : x,
                ),
              )
            }
          />
          <button
            className="icon-button"
            aria-label={`활동 ${i + 1} 제거`}
            onClick={() => setItems(items.filter((x) => x.id !== item.id))}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <form
        className="activity-add"
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) {
            setItems([
              ...items,
              { id: Date.now(), text: draft.trim(), use: true },
            ]);
            setDraft("");
          }
        }}
      >
        <input
          aria-label="새 활동 아이디어"
          placeholder="선생님의 아이디어를 더해 주세요"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          className="button secondary"
          type="submit"
          disabled={!draft.trim()}
        >
          <Plus size={17} /> 추가
        </button>
      </form>
      <p className="small">
        사용할 활동 {items.filter((i) => i.use).length}개 선택
      </p>
    </section>
  );
}
function Design() {
  const [form, setForm] = useState(initialForm);
  return (
    <>
      <section className="panel">
        <h2>수업의 출발점 살펴보기</h2>
        <p>
          초등 3학년 사회 「우리가 사는 곳」을 예로 시작합니다. 수업 정보를 바꿔
          실습할 수도 있어요.
        </p>
        <LessonFields value={form} onChange={setForm} />
      </section>
      <Prompt title="개념 기반 탐구수업 설계" text={prompts.inquiry} />
      <Prompt title="별도로 제공할 수업 사전 정보" text={lessonContext(form)} />
      <h2>실제 수업의 네 가지 탐구 질문</h2>
      <div className="two-grid">
        {questions.map(([type, q], i) => (
          <article className={`question-card ${steps[i].color}`} key={type}>
            <span>
              0{i + 1} · {type}
            </span>
            <h3>{q}</h3>
          </article>
        ))}
      </div>
      <h2>1단계를 마치기 전, 메인 패들렛 구성하기</h2>
      <p>
        네 가지 탐구 질문을 담을 단원 통합 게시판을 만듭니다. 질문별로 섹션을
        하나씩 구성하고, 각 섹션에 해당 탐구 질문을 게시해 주세요.
      </p>
      <Flow
        items={["메인 패들렛 만들기", "질문 1~4 섹션 구성", "탐구 질문 게시"]}
      />
      <Example id="mainPadlet" />
      <div className="tip">
        네 개의 섹션에 탐구 질문을 모두 넣었다면 1단계를 완료하세요. 다음
        단계에서는 질문에 맞는 활동 아이디어를 선별해 이 게시판에 채워 넣습니다.
      </div>
    </>
  );
}
function Inquiry() {
  return (
    <>
      <section className="question-card sage">
        <span>사실적 질문 해결하기 · 우리 동네 디지털 도화지</span>
        <h2>
          우리 주변에는 어떤 장소들이 있으며, 우리는 그곳에서 주로 무엇을
          하는가?
        </h2>
      </section>
      <h2>이렇게 우리 동네 디지털 도화지를 만들었어요</h2>
      <p>
        학생들이 장소에 담긴 자신의 경험과 감정을 표현할 수 있도록, 모둠별로
        사용할 샌드박스를 미리 준비했습니다.
      </p>
      <Flow items={["만들기", "샌드박스", "화이트보드"]} />
      <Example id="sandboxGuide" />
      <section className="panel">
        <h2>선생님의 준비 과정</h2>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong>우리 동네 지도 준비하기</strong>
            <p>네이버 지도에서 우리 동네 지도 이미지를 가져옵니다.</p>
          </li>
          <li>
            <strong>학생들에게 의미 있는 장소 적기</strong>
            <p>
              지도 위에 학생들에게 의미 있는 장소의 이름을 적습니다. 장소 이름을
              적는 작업은 생성형 AI에게 부탁해도 됩니다.
            </p>
          </li>
          <li>
            <strong>모둠별 샌드박스에 이미지 넣기</strong>
            <p>장소 이름을 적은 지도 이미지를 각 모둠의 샌드박스에 넣습니다.</p>
          </li>
          <li>
            <strong>감정 이모티콘 준비하기</strong>
            <p>
              다양한 감정을 나타내는 이모티콘을 미리 배치해, 학생들이 복사해서
              사용할 수 있도록 합니다.
            </p>
          </li>
        </ol>
      </section>
      <Flow items={["장소", "경험", "감정", "장소감"]} />
      <div className="two-grid">
        <section className="panel">
          <span className="eyebrow">01 · 개념 인식</span>
          <h2>우리 동네를 펼쳐요</h2>
          <p>
            모둠별 샌드박스에 준비된 지도를 살펴보고, 자신에게 의미 있는 장소를
            찾습니다.
          </p>
        </section>
        <section className="panel">
          <span className="eyebrow">02 · 개념 연결</span>
          <h2>경험을 나누어요</h2>
          <p>
            준비된 감정 이모티콘을 복사해 장소에 놓고, 그곳에서의 경험과 느낌을
            기록합니다. 친구들이 같은 장소에 놓은 이모티콘도 함께 살펴봅니다.
          </p>
        </section>
      </div>
      <Example id="map">
        <div className="map-example">
          <span>우리 집 ♡</span>
          <span>학교 ✎</span>
          <span>도서관 ▤</span>
          <span>공원 ♧</span>
          <strong>나의 마음속 동네</strong>
        </div>
      </Example>
      <blockquote>
        같은 장소라도 사람마다
        <br />
        서로 다른 감정을 느낄 수 있어요.
      </blockquote>
      <p>
        학생들은 같은 장소에 놓인 서로 다른 감정 이모티콘을 보며, 각자의 경험에
        따라 장소에 대한 느낌이 달라질 수 있다는 사실을 알게 되었습니다.
      </p>
      <h2>패들렛에 기록하며 생각을 구체화해요</h2>
      <section className="question-card lavender">
        <span>개념적 질문 학습하기</span>
        <h2>
          같은 장소라도 사람마다 느끼는 감정이나 생각(장소감)이 다른 까닭은
          무엇일까?
        </h2>
      </section>
      <p>
        샌드박스에서 이모티콘으로 표현한 감정을 패들렛에 글로 기록하며, 그
        장소에서 겪은 경험과 그렇게 느낀 이유를 구체화했습니다. 이 과정에서
        맞춤형 신호등 피드백을 사용했습니다.
      </p>
      <Example id="posts">
        <div className="two-grid">
          <div className="sample-post">
            <small>학생 A · 설명용 창작 예시</small>
            <h3>할머니와 걷던 공원</h3>
            <p>
              할머니와 꽃을 보며 걸었어요. 공원에 가면 따뜻한 마음이 들어요.
            </p>
          </div>
          <div className="sample-post">
            <small>학생 B · 설명용 창작 예시</small>
            <h3>처음 자전거를 탄 공원</h3>
            <p>넘어질까 봐 무서웠지만 끝까지 타고 나니 뿌듯했어요.</p>
          </div>
        </div>
      </Example>
      <h2>맞춤형 신호등 피드백</h2>
      <p>점수 대신 학생에게 다음 학습 행동을 알려주는 신호입니다.</p>
      <div className="tip">
        보완이 필요한 경우에는 댓글에 선생님의 의견을 남겨, 학생이 자신의 경험과
        생각을 더 구체적으로 표현하도록 도왔습니다. 교사의 댓글을 학생의 배움을
        돕는 비계(Scaffolding)로 활용했습니다.
      </div>
      <div className="signal-grid">
        {[
          ["white", "제출 완료", "생각을 남겼어요"],
          ["red", "보완 필요", "경험을 조금 더 구체적으로"],
          ["green", "통과", "생각이 잘 드러났어요"],
          ["purple", "우수 작품", "친구들과 함께 나눠요"],
        ].map(([color, title, desc]) => (
          <article className="panel signal" key={color}>
            <span className={`signal-dot ${color}`} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </>
  );
}
function Thinking() {
  const [choice, setChoice] = useState("");
  return (
    <>
      <section className="question-card butter">
        <span>논쟁적 질문 학습하기 · 방구석 탐험대</span>
        <h2>
          만약 우리 동네에서 경찰서나 소방서와 같이 안전을 지켜주는 장소가
          사라진다면 어떤 일이 발생할까?
        </h2>
      </section>
      <blockquote>
        “만약 우리 동네에
        <br />이 장소가 사라진다면?”
      </blockquote>
      <div className="chips">
        {["경찰서", "소방서", "병원", "학교", "도서관"].map((s) => (
          <span key={s}>{s}가 없다면?</span>
        ))}
      </div>
      <Flow items={["장소", "역할", "사람들의 삶"]} />
      <h2>먼저, 패들렛 신호등 활동으로 생각해요</h2>
      <p>
        네 모퉁이 토론에 앞서, 장소가 사라졌을 때 생길 일을 패들렛에 기록하며
        먼저 생각해 보는 시간을 가졌습니다. 신호등 피드백을 통해 자신의 생각을
        점검하고 보완한 다음 네 모퉁이 토론으로 이어갔습니다.
      </p>
      <Example id="thinking">
        <div className="sample-post">
          <h3>소방서가 없다면?</h3>
          <p>“불이 났을 때 도와줄 사람이 빨리 오지 못할 것 같아요.”</p>
          <small>
            꼬리물기 질문: 불을 끄는 일 말고, 소방관은 또 언제 우리를
            도와줄까요?
          </small>
        </div>
      </Example>
      <Flow
        items={["Padlet", "PDF 내보내기", "Gemini 업로드", "피드백 생성"]}
      />
      <Prompt
        title="생각을 한 걸음 더, 꼬리물기 피드백"
        text={prompts.feedback}
      />
      <h2>네 모퉁이 토론</h2>
      <p>
        패들렛에서 정리한 생각을 바탕으로, 각자 중요하다고 생각하는 장소를
        선택하고 근거를 나눴습니다.
      </p>
      <Flow
        items={[
          "만들기",
          "샌드박스",
          "화이트보드",
          "하단의 전체 검색",
          "동의 또는 반대",
        ]}
      />
      <p>
        화이트보드 하단의 ‘전체 검색’에서 ‘동의 또는 반대’를 선택해 토론판을
        준비하세요.
      </p>
      <p>
        우리 동네를 가장 살기 좋은 곳으로 만들기 위해, 지금 당장 가장 중요하게
        여겨야 할 장소는 어디일까요?
      </p>
      <Example id="debate" />
      <section className="panel">
        <h3>나의 생각도 골라 보세요</h3>
        <div className="two-grid">
          {["도서관 / 미술관", "종합병원", "경찰서 / 소방서", "큰 공원"].map(
            (s) => (
              <button
                aria-pressed={choice === s}
                className={`debate-choice ${choice === s ? "selected" : ""}`}
                key={s}
                onClick={() => setChoice(s)}
              >
                {s}
                {choice === s && <Check size={18} />}
              </button>
            ),
          )}
        </div>
        <p role="status">
          {choice
            ? `${choice}을 선택했어요. 왜 그렇게 생각했나요?`
            : "한 모퉁이를 선택하고 근거를 이야기해 보세요."}
        </p>
      </section>
      <Flow items={["선택", "근거", "친구 의견 읽기", "생각 수정"]} />
    </>
  );
}
function Transfer() {
  return (
    <>
      <section className="question-card sage">
        <span>실천적 질문 학습하기 · 교실 밖으로 나가 봅시다</span>
        <h2>
          우리가 사는 곳을 더 살기 좋은 곳으로 만들기 위해, 내가 할 수 있는 것은
          무엇일까?
        </h2>
      </section>
      <blockquote>
        배움은 교실을 넘어,
        <br />
        우리의 삶으로 이어집니다.
      </blockquote>
      <Flow items={["관찰", "판단", "근거", "실천"]} />
      <section className="panel">
        <h2>동네 답사 Padlet 게시물 필드 설계</h2>
        <p>다음 다섯 필드로 관찰을 실천까지 연결해 보세요.</p>
        <div className="field-list">
          {[
            ["단답형", "조사한 장소 이름", "어디를 살펴보았나요?"],
            [
              "단일 선택",
              "내가 발견한 것",
              "우리 동네의 자랑거리 / 조심하거나 고쳐야 할 점",
            ],
            ["첨부파일", "현장 사진", "발견한 모습을 사진으로 남겨요."],
            ["서술형", "구체적인 이유", "왜 그렇게 판단했나요?"],
            ["서술형", "나의 작은 실천", "내가 할 수 있는 일은 무엇인가요?"],
          ].map(([type, title, desc], i) => (
            <div key={title}>
              <span className="number-badge">{i + 1}</span>
              <div>
                <h3>
                  {title} <small>{type}</small>
                </h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <h2>게시물 필드를 활용한 실제 수업 사례</h2>
      <p>
        학생들은 조사한 장소의 사진과 발견한 점, 구체적인 이유, 나의 작은 실천을
        각 필드에 기록했습니다.
      </p>
      <Example id="field" />
      <div className="tip">
        이 활동에서도 맞춤형 신호등 피드백으로 비계(Scaffolding)를 제시했습니다.
        보완이 필요한 게시물에는 교사의 의견을 댓글로 남겨, 관찰한 내용과 이유,
        실천 방법을 더 구체적으로 표현할 수 있도록 도왔습니다.
      </div>
      <h2>마무리 활동 · 마음속 지도 갤러리</h2>
      <p>
        마지막에는 평소 자주 가고 좋다고 생각한 건물들을 중심으로 마음속 지도를
        그렸습니다. 완성한 지도를 패들렛 갤러리에 모아 서로의 작품을 함께
        살펴보았습니다.
      </p>
      <p>
        나에게 의미 있는 장소를 떠올리고 지도에 표현하는 활동을 통해, 우리가
        사는 동네를 좀 더 생각해 보는 시간을 가졌습니다.
      </p>
      <Example id="mindMapGallery" />
    </>
  );
}
function Evaluation() {
  return (
    <>
      <h2>6-1 · 우리 동네 탐험 자기평가</h2>
      <section className="panel">
        <h3>실제 수업에서 활용한 자기평가 기록</h3>
        <p>
          학생들이 자신의 배움을 돌아보고 자기평가를 했던 실제 수업 자료입니다.
        </p>
        <a
          className="button secondary"
          href={site.selfAssessment}
          target="_blank"
          rel="noopener noreferrer"
        >
          실제 자기평가 기록 보기 ↗
        </a>
      </section>
      <Prompt
        title="자기평가 루브릭 요청 · 원문"
        text={prompts.selfAssessment}
        defaultOpen
      />
      <p className="small">
        원문의 ‘탐구 질문 4가지 제시’ 위치에 수업에서 도출한 질문을 넣어
        사용합니다.
      </p>
      <Prompt
        title="자기평가 웹 앱 만들기 · 원문"
        text={prompts.selfAssessmentApp}
      />
      <p className="small">
        연수 당시 사용한 제작 프롬프트입니다. 이 홈페이지의 로그인이나 저장
        기능을 설정하는 내용은 아닙니다.
      </p>
      <p>
        3학년 1단원 「우리가 사는 곳」 · 학생용 화면을 설명하는 강의 사례입니다.
      </p>
      <div className="two-grid">
        {selfAssessments.map((item, i) => (
          <section className="panel assessment" key={item.title}>
            <span className="eyebrow">
              0{i + 1} · {item.badge}
            </span>
            <h3>{item.title}</h3>
            {item.levels.map((level, j) => (
              <div key={level}>
                <strong>
                  {["🌟 완벽해요", "👍 잘했어요", "🌱 노력할래요"][j]}
                </strong>
                <p>{level}</p>
              </div>
            ))}
            <p className="reason-example">
              왜 그렇게 생각했나요? → 자신의 활동을 근거로 이야기해요.
            </p>
          </section>
        ))}
      </div>
      <blockquote>
        자기평가의 등급보다 중요한 것은
        <br />왜 그렇게 생각했는가입니다.
      </blockquote>
      <Flow items={["자기평가 + 활동 기록", "더 풍부한 평가 근거"]} />
      <p className="small">
        자기평가와 교사평가는 같지 않습니다. 함께 읽을 때 더 풍부한 근거가
        됩니다.
      </p>
      <h2>6-2 · 근거에서 시작하는 과정중심평가</h2>
      <div className="chips">
        {[
          "Padlet 게시물",
          "Sandbox 결과",
          "댓글",
          "토론",
          "답사 기록",
          "자기평가",
          "도화지 활동",
        ].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <Flow
        items={[
          "평가 기준 설정",
          "증거 모으기",
          "학생별 증거 추출",
          "루브릭과 비교",
          "교사 확인",
          "성장 기록",
        ]}
      />
      <Prompt title="과정중심평가 루브릭 만들기" text={prompts.rubric} />
      <Prompt title="PDF에서 학생별 평가 근거 찾기" text={prompts.evaluation} />
      <h3>실제 결과 · 학생별 평가 근거와 평어</h3>
      <p>
        패들렛 PDF를 분석해 학생별 성취 수준과 구체적인 평가 근거를 정리한
        결과입니다.
      </p>
      <Example id="pdfEvaluationResult" />
      <h2>6-3 · 마음속 지도를 읽는 세 가지 관점</h2>
      <Prompt
        title="도화지 마음속 지도 평가 루브릭 · 원문"
        text={prompts.mapRubric}
      />
      <h3>실제 결과 · 마음속 지도 평가 루브릭</h3>
      <p>
        장소의 강조, 감정의 시각화, 경험의 반영을 세 수준으로 구분한 실제
        루브릭입니다.
      </p>
      <Example id="mapRubricResult" />
      <div className="three-grid">
        {[
          [
            "장소의 강조",
            "의미 있는 장소를 크기나 색으로 특별하게 표현했는가?",
          ],
          ["감정의 시각화", "장소에 대한 느낌을 그림이나 색채로 표현했는가?"],
          ["경험의 반영", "자신의 구체적인 경험과 기억이 담겼는가?"],
        ].map(([t, d]) => (
          <article className="panel" key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <section className="tip">
        <h2>6-4 · 종합 판단은 교사의 몫</h2>
        <p>
          등급부터 매기지 말고 학생이 실제로 남긴 근거부터 찾습니다. 자기평가,
          활동 기록, 지도 표현을 함께 읽고 AI가 제시한 근거를 원자료와
          대조하세요.
        </p>
      </section>
    </>
  );
}
function Record() {
  const [name, setName] = useState("");
  const [artwork, setArtwork] = useState("");
  const [generated, setGenerated] = useState(prompts.extract);
  return (
    <>
      <Flow
        items={[
          "마음속 지도 + Padlet 글 + 친구 댓글",
          "토론 + 동네 답사 + 자기평가",
          "학생별 배움 데이터",
        ]}
      />
      <blockquote>
        먼저 무엇을 했는지 찾고,
        <br />
        그다음 성장의 의미를 읽습니다.
      </blockquote>
      <div className="three-grid">
        {[
          ["팩트 추출", "학생이 실제 남긴 행동과 문장"],
          ["교육적 해석", "성취기준에 비추어 읽은 배움"],
          ["NEIS 평어 작성", "근거가 담긴 성장의 문장"],
        ].map(([t, d], i) => (
          <article className="panel" key={t}>
            <span className="eyebrow">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <form
        className="panel"
        onSubmit={(e) => {
          e.preventDefault();
          setGenerated(personalizeExtraction(name.trim(), artwork));
        }}
      >
        <h2>학생별 데이터 추출 프롬프트</h2>
        <label>
          학생 이름 또는 익명 기호
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 학생 A"
          />
        </label>
        <p className="small">
          이름은 저장되지 않습니다. 실습에는 익명 기호를 사용해도 됩니다.
        </p>
        <label>
          도화지 그림 활동 내용
          <textarea
            value={artwork}
            onChange={(e) => setArtwork(e.target.value)}
            rows={4}
            placeholder="해당 학생의 실제 도화지 활동 내용을 입력하세요."
          />
        </label>
        <p className="small">
          아래에는 김지훈 학생 사례가 담긴 원문이 표시됩니다. 생성 버튼을 누르면
          이름과 도화지 활동 내용만 바뀝니다.
        </p>
        <button className="button primary" disabled={!name.trim()}>
          프롬프트 만들기
        </button>
      </form>
      {generated && <Prompt title="한 학생의 흔적 모으기" text={generated} />}
      <Prompt title="근거를 담은 NEIS 평어 초안" text={prompts.record} />
      <Example id="record">
        <div className="sample-post">
          <small>설명용 창작 예시 · 교사 검토 전 초안</small>
          <p>
            공원에서 가족과 함께한 경험을 그림과 글로 표현하며 장소에 담긴
            자신의 느낌을 구체적으로 설명함. 친구의 경험을 듣고 같은 장소에 대해
            서로 다른 느낌을 가질 수 있음을 이해함. 학교 앞 횡단보도의 위험
            요소를 관찰하고 안전하게 길을 건너는 방법을 제안함.
          </p>
        </div>
      </Example>
      <div className="tip">
        AI에게 처음부터 평어를 작성시키지 않습니다. 팩트 추출 → 교육적 해석 →
        기록 순서를 지키고, 최종 문장은 교사가 확인합니다.
      </div>
    </>
  );
}
export function Lesson({ step }: { step: number }) {
  const data = steps[step - 1];
  const { completed, toggle } = useProgress();
  return (
    <main className="container page">
      <div className="breadcrumb">
        <Link href="/">HOME</Link>
        <span>/</span>강의 시작<span>/</span>
        {data.name}
      </div>
      <nav className="lesson-steps" aria-label="강의 단계">
        {steps.map((s, i) => (
          <Link
            aria-current={step === i + 1 ? "step" : undefined}
            href={`/lesson/${i + 1}`}
            key={s.name}
          >
            <span>
              {completed.includes(i + 1) ? <Check size={16} /> : i + 1}
            </span>
            {s.name}
          </Link>
        ))}
      </nav>
      <div className="lesson-layout">
        <aside className="lesson-aside">
          <span className={`step-icon ${data.color}`}>
            <BookOpen />
          </span>
          <p className="eyebrow">STEP 0{step}</p>
          <h2>{data.name}</h2>
          <p>{data.desc}</p>
          <div className="aside-note">
            오늘의 배움이
            <br />
            내일의 수업이 되도록.
          </div>
          <Link className="text-button" href="/create">
            내 수업에 적용하기 <ArrowRight size={16} />
          </Link>
        </aside>
        <article className="lesson-content" key={step}>
          <div className="page-heading">
            <p className="eyebrow">{data.tag}</p>
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
          </div>
          {step === 1 ? (
            <Design />
          ) : step === 2 ? (
            <>
              <Flow
                items={[
                  "탐구 질문",
                  "Padlet AI 레시피",
                  "활동 아이디어",
                  "교사 선별",
                  "통합 게시판",
                ]}
              />
              <section className="panel">
                <h2>Padlet에서 활동 아이디어 얻기</h2>
                <Example id="aiRecipeGuide" />
                <Flow items={["만들기", "AI 레시피", "수업 활동 아이디어"]} />
                <p>‘수업 활동 아이디어 만들기’를 누르고 아래처럼 입력하세요.</p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>과목 및 학년: ‘사회’, ‘3학년’을 선택한다.</li>
                  <li>주제 또는 수업 목표: ‘우리가 사는 곳’을 입력한다.</li>
                  <li>
                    강의실 리소스 옵션: 교실 환경에 맞추어 ‘태블릿 PC’ 또는
                    ‘노트북’ 등을 선택한다.
                  </li>
                  <li>
                    [사실적 질문] [개념적 질문] [논쟁적 질문] [실천적 질문]을
                    넣고, 이 질문들을 생각해보며 태블릿 PC로 할 수 있는 수업
                    활동 아이디어를 만들어 줘.
                  </li>
                </ul>
              </section>
              <Prompt
                title="패들렛 AI레시피로 수업 활동 구상하기"
                text={prompts.activity}
              />
              <ActivityEditor />
            </>
          ) : step === 3 ? (
            <Inquiry />
          ) : step === 4 ? (
            <Thinking />
          ) : step === 5 ? (
            <Transfer />
          ) : step === 6 ? (
            <Evaluation />
          ) : (
            <Record />
          )}
          <div className="lesson-complete">
            <div>
              <h3>
                {completed.includes(step)
                  ? "이 단계의 배움을 기록했어요."
                  : "이번 단계를 마쳤나요?"}
              </h3>
              <p>완료 표시를 남기고 다음 배움으로 이어가세요.</p>
            </div>
            <button
              className={`button ${completed.includes(step) ? "secondary" : "primary"}`}
              aria-pressed={completed.includes(step)}
              onClick={() => toggle(step)}
            >
              <Check size={18} />
              {completed.includes(step) ? "완료됨 · 취소" : "이 단계 완료"}
            </button>
          </div>
          <div className="lesson-pagination">
            <Link href={step > 1 ? `/lesson/${step - 1}` : "/"}>
              <ArrowLeft size={17} />
              {step > 1 ? steps[step - 2].name : "홈으로"}
            </Link>
            <Link href={step < 7 ? `/lesson/${step + 1}` : "/create"}>
              {step < 7 ? steps[step].name : "내 수업 만들기"}
              <ArrowRight size={17} />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
