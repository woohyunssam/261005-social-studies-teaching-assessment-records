import fs from "node:fs";
const raw = fs.readFileSync("docs/original-prompts.txt", "utf8");
const source = raw
  .replace(/\r\n/g, "\n")
  .replaceAll("&#x20;", "")
  .replace(/\\([.~-])/g, "$1")
  .replace(/\\\n/g, "\n")
  .replace(/\n[ \t]+/g, "\n")
  .replace(/\n{3,}/g, "\n\n");
function between(start, end) {
  const i = source.indexOf(start);
  if (i < 0) throw Error(start);
  const j = end ? source.indexOf(end, i + start.length) : source.length;
  if (j < 0) throw Error(end);
  return source
    .slice(i + start.length, j)
    .trim()
    .replace(/^"|"$/g, "")
    .trim();
}
const prompts = {
  inquiry: between(
    "개념 기반 탐구학습 단원 재구성 프롬프트:",
    "<패들렛 AI 레시피로 활동 아이디어 만들기>",
  ),
  activity:
    "[사실적 질문] [개념적 질문] [논쟁적 질문] [실천적 질문] 이 질문들을 생각해보며 태블릿 PC로 할 수 있는 수업 활동 아이디어를 만들어 줘.",
  feedback: between(
    "프롬프트를 입력한다.",
    "(맥락 적용) 게시물 필드 활용하기:",
  ),
  selfAssessment: between(
    "생성형AI에게 자기평가 루브릭 요청하기:",
    "<자기평가 웹 앱 만들기>",
  ),
  selfAssessmentApp: between(
    "학생들이 자신에 대해서 평가할거야.",
    "<과정중심평가>",
  ),
  rubric: between(
    "과정중심평가 루브릭 만들기:",
    "루브릭 제작 창에 PDF 파일 넣고 평가하기:",
  ),
  evaluation: between(
    "루브릭 제작 창에 PDF 파일 넣고 평가하기:",
    "<도화지 활동 평가>",
  ),
  mapRubric: between("\n평가 루브릭 만들기:", "<개별 맞춤형 성장 기록하기>"),
  extract: between("학생별 데이터 추출하기:", "<나이스 평어 추출하기>").replace(
    "꾸미지 5.",
    "꾸미지 마.",
  ),
  record: between("<나이스 평어 추출하기>"),
};
// Include the opening sentence consumed by this unique boundary.
prompts.selfAssessmentApp =
  "학생들이 자신에 대해서 평가할거야. " + prompts.selfAssessmentApp;
fs.writeFileSync(
  "src/data/original-prompts.json",
  JSON.stringify(prompts, null, 2) + "\n",
);
let content = fs.readFileSync("src/data/content.ts", "utf8");
const start = content.indexOf("const questionText =");
const end = content.indexOf("export const selfAssessments =", start);
if (start >= 0 && end >= 0)
  content =
    content.slice(0, start) +
    'export { default as prompts } from "./original-prompts.json";\n' +
    content.slice(end);
fs.writeFileSync("src/data/content.ts", content);
console.log(
  Object.fromEntries(
    Object.entries(prompts).map(([key, value]) => [key, value.length]),
  ),
);
