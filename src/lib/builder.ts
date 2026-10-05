import { standards, prompts } from "@/data/content";
export const originalQuestions = prompts.rubric.split("질문 1:")[1];
export const initialForm = {
  school: "초등학교",
  grade: "3",
  semester: "1",
  subject: "사회",
  unit: "1",
  title: "우리가 사는 곳",
  periods: "12",
  students: "24",
  standards,
  tools: "Padlet, Gemini, 태블릿 PC",
  student: "",
  goal: "사람들은 각자의 경험에 따라 장소에 대해 서로 다른 느낌을 가지며, 우리가 사는 곳을 더 살기 좋은 곳으로 만들기 위해 문제를 찾아 개선을 실천한다.",
  inquiryQuestions: "질문 1:" + originalQuestions,
  artwork: "",
};
export type LessonForm = typeof initialForm;
export const promptTypes = [
  "탐구 질문",
  "Padlet 활동",
  "자기평가 루브릭",
  "과정중심평가",
  "학생 데이터 추출",
  "NEIS 평어",
];
export function lessonContext(form: LessonForm) {
  return `[수업 정보]\n학교급: ${form.school}\n학년: ${form.grade}학년\n학기: ${form.semester}학기\n교과: ${form.subject}\n단원: ${form.unit}단원 ${form.title}\n전체 차시: ${form.periods}차시\n학생 수: ${form.students}명\n사용 도구: ${form.tools}\n성취기준:\n${form.standards}`;
}
export function personalizeExtraction(name: string, artwork: string) {
  return (
    prompts.extract
      .split("[추가 제공 데이터: 도화지 그림 활동 내용]")[0]
      .replaceAll("김지훈", name)
      .replaceAll("지훈이가", `${name} 학생이`) +
    `[추가 제공 데이터: 도화지 그림 활동 내용]\n\n${artwork.trim() || "[도화지 그림 활동 내용을 입력하세요]"}`
  );
}
export function generatePrompt(form: LessonForm, type: number) {
  const originals = [
    prompts.inquiry,
    prompts.activity,
    prompts.selfAssessment,
    prompts.rubric,
    prompts.extract,
    prompts.record,
  ];
  let text = originals[type];
  if (type === 4)
    text = personalizeExtraction(
      form.student.trim() || "[학생 이름 또는 익명 기호]",
      form.artwork,
    );
  text = text.replaceAll("초등학교 3학년", `${form.school} ${form.grade}학년`);
  if (type === 1)
    text = text.replace(
      "[사실적 질문] [개념적 질문] [논쟁적 질문] [실천적 질문]",
      () => form.inquiryQuestions + "\n\n",
    );
  if (type === 2)
    text = text
      .replace("우리 동네 장소감", () => form.title)
      .replace(/\+\s*탐구 질문 4가지 제시/, () => form.inquiryQuestions);
  if (type === 3)
    text = text
      .replace(initialForm.goal, () => form.goal)
      .replace("질문 1:" + originalQuestions, () => form.inquiryQuestions);
  if (type === 4 && form.inquiryQuestions !== initialForm.inquiryQuestions) {
    const start = text.indexOf("질문 1:");
    const end = text.indexOf("[추가 제공 데이터:");
    text =
      text.slice(0, start) + form.inquiryQuestions + "\n\n" + text.slice(end);
  }
  if (type === 5)
    text = text
      .replace("지훈이의", () =>
        form.student.trim() ? `${form.student.trim()} 학생의` : "해당 학생의",
      )
      .replace("1학기 사회", () => `${form.semester}학기 ${form.subject}`)
      .replace(
        "'장소감의 다양성 이해'와 '더 좋은 동네를 위한 실천 의지'",
        () =>
          form.goal === initialForm.goal
            ? "'장소감의 다양성 이해'와 '더 좋은 동네를 위한 실천 의지'"
            : `'${form.goal}'`,
      );
  return `${text}\n\n${lessonContext(form)}`;
}
