"use client";
import { useState } from "react";
import { Sparkles, Download } from "lucide-react";
import {
  initialForm,
  LessonForm,
  promptTypes,
  generatePrompt,
} from "@/lib/builder";
import { PageHeading, Prompt } from "./ui";
export function LessonFields({
  value,
  onChange,
}: {
  value: LessonForm;
  onChange: (v: LessonForm) => void;
}) {
  const fields: [keyof LessonForm, string, string?][] = [
    ["school", "학교급"],
    ["grade", "학년", "number"],
    ["semester", "학기", "number"],
    ["subject", "교과"],
    ["unit", "단원", "number"],
    ["title", "단원명"],
    ["periods", "전체 차시 수", "number"],
    ["students", "학생 수", "number"],
    ["tools", "사용 도구"],
  ];
  return (
    <div className="form-grid">
      {fields.map(([key, label, type]) => (
        <label key={key}>
          {label}
          <input
            required
            type={type || "text"}
            min={type === "number" ? 1 : undefined}
            max={key === "semester" ? 2 : key === "grade" ? 12 : undefined}
            value={value[key]}
            onChange={(e) => onChange({ ...value, [key]: e.target.value })}
          />
        </label>
      ))}
      <label className="full-width">
        성취기준
        <textarea
          required
          rows={5}
          value={value.standards}
          onChange={(e) => onChange({ ...value, standards: e.target.value })}
        />
      </label>
    </div>
  );
}
export function Builder() {
  const [form, setForm] = useState(initialForm);
  const [type, setType] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [resultTitle, setResultTitle] = useState("");
  function download() {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "내-수업-프롬프트.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="container page">
      <PageHeading
        eyebrow="YOUR LESSON STUDIO"
        title="내 수업 만들기"
        description="선생님의 교육과정으로, 우리 반에 꼭 맞는 프롬프트를 만드세요."
      />
      <div className="builder-layout">
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            const submitter = (e.nativeEvent as SubmitEvent)
              .submitter as HTMLButtonElement | null;
            if (!submitter) return;
            const selectedType = Number(submitter.value);
            setType(selectedType);
            setResult(generatePrompt(form, selectedType));
            setResultTitle(promptTypes[selectedType]);
          }}
        >
          <h2>
            <span className="number-badge">1</span> 수업 정보를 알려주세요
          </h2>
          <LessonFields value={form} onChange={setForm} />
          <p className="small">
            강의 원문을 바탕으로 수업 정보와 입력 항목만 반영합니다. 원문
            그대로의 프롬프트는 강의 페이지에서 복사할 수 있습니다.
          </p>
          <label>
            최종 목표(일반화 문장)
            <textarea
              rows={3}
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            />
          </label>
          <label>
            탐구 질문 4가지
            <textarea
              rows={7}
              value={form.inquiryQuestions}
              onChange={(e) =>
                setForm({ ...form, inquiryQuestions: e.target.value })
              }
            />
          </label>
          <p className="small">
            학생 데이터 추출·NEIS 평어에 사용할 정보입니다. 필요한 경우
            입력하세요.
          </p>
          <label>
            학생 이름 또는 익명 기호
            <input
              value={form.student}
              onChange={(e) => setForm({ ...form, student: e.target.value })}
              placeholder="예: 학생 A"
            />
          </label>
          <label>
            도화지 그림 활동 내용
            <textarea
              rows={4}
              value={form.artwork}
              onChange={(e) => setForm({ ...form, artwork: e.target.value })}
              placeholder="해당 학생의 실제 활동 내용을 입력하세요."
            />
          </label>
          <h2>
            <span className="number-badge">2</span> 원하는 프롬프트를 바로
            만드세요
          </h2>
          <div className="type-options">
            {promptTypes.map((name, i) => (
              <button
                type="submit"
                value={i}
                key={name}
                className={type === i ? "selected" : ""}
              >
                <Sparkles size={17} />
                {name}
              </button>
            ))}
          </div>
          <p className="small">
            입력 내용은 서버에 저장되지 않습니다. 새로고침하면 초기화됩니다.
          </p>
        </form>
        <aside className="builder-result">
          {result ? (
            <>
              <Prompt title={`${resultTitle} 프롬프트`} text={result} />
              <button className="text-button" onClick={download}>
                <Download size={16} /> 텍스트 파일로 저장
              </button>
              <p className="small">
                수업 정보를 바꿨다면 원하는 프롬프트 버튼을 다시 눌러 주세요.
              </p>
            </>
          ) : (
            <div className="empty-result">
              <span className="step-icon sage">
                <Sparkles size={28} />
              </span>
              <h2>
                다음 수업의 시작을
                <br />
                여기서 준비하세요.
              </h2>
              <p>
                왼쪽 정보를 채우고 프롬프트를 만들면
                <br />
                바로 복사해서 사용할 수 있어요.
              </p>
              <div className="howto">
                <span>01 수업 정보 입력</span>
                <span>02 프롬프트 생성 & 복사</span>
                <span>03 Gemini에서 실습</span>
              </div>
            </div>
          )}
          <div className="tip">
            <strong>선생님의 판단으로 완성됩니다.</strong>
            <p>
              생성된 프롬프트를 Gemini에 붙여 넣고 필요한 자료를 함께
              제공하세요. AI의 답변은 수업 맥락에 맞게 검토해 주세요.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
