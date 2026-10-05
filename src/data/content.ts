export const site = {
  title: "배움의 흔적을 기록으로",
  teacher: "최우현",
  school: "광주양동초등학교",
  padlet: "https://padlet.com/",
  gemini: "https://gemini.google.com/",
  selfAssessment: "https://woohyunssam.my.canva.site/c56ytt6cf3zdqmzk",
};
export const steps = [
  {
    name: "수업 설계",
    title: "성취기준에서 탐구 질문까지",
    desc: "교육과정을 읽고, 배움의 방향을 정합니다.",
    tag: "교육과정 · 탐구 질문",
    color: "sage",
  },
  {
    name: "활동 설계",
    title: "탐구 질문을 학생 활동으로",
    desc: "좋은 질문을 학생이 움직이는 활동으로 바꿉니다.",
    tag: "Padlet · 활동 아이디어",
    color: "peach",
  },
  {
    name: "개념 탐구",
    title: "우리 동네 디지털 도화지",
    desc: "장소에 담긴 경험과 감정으로 개념을 발견합니다.",
    tag: "Sandbox · 장소감",
    color: "lavender",
  },
  {
    name: "사고 확장",
    title: "방구석 탐험대",
    desc: "“만약 ~라면?” 질문으로 생각의 경계를 넓힙니다.",
    tag: "꼬리물기 피드백 · 토론",
    color: "butter",
  },
  {
    name: "삶으로 전이",
    title: "교실 밖으로 나가 봅시다",
    desc: "배운 것을 우리 동네의 작은 실천으로 연결합니다.",
    tag: "동네 답사 · 실천",
    color: "sage",
  },
  {
    name: "평가",
    title: "점수보다 먼저, 배움의 근거",
    desc: "흩어진 활동 속에서 학생의 성장을 읽습니다.",
    tag: "자기평가 · 과정중심평가",
    color: "peach",
  },
  {
    name: "기록",
    title: "한 학생의 이야기로 모읍니다",
    desc: "구체적인 배움의 흔적을 성장의 문장으로 남깁니다.",
    tag: "데이터 추출 · NEIS 평어",
    color: "lavender",
  },
];
export const standards =
  "[4사01-01] 주변 여러 장소에서의 경험과 느낌을 다양한 방식으로 표현하고, 장소감을 나누며 서로 존중하는 태도를 지닌다.\n[4사01-02] 주변의 여러 장소를 살펴보고, 우리가 사는 곳을 더 살기 좋은 곳으로 만드는 방안을 탐색한다.";
export const questions = [
  [
    "사실적 질문",
    "우리 주변에는 어떤 장소들이 있으며, 우리는 그곳에서 주로 무엇을 하는가?",
  ],
  [
    "개념적 질문",
    "같은 장소라도 사람마다 느끼는 감정이나 생각, 즉 장소감이 다른 까닭은 무엇일까?",
  ],
  [
    "논쟁적 질문",
    "만약 우리 동네에서 경찰서나 소방서와 같이 안전을 지켜주는 장소가 사라진다면 어떤 일이 발생할까?",
  ],
  [
    "실천적 질문",
    "우리가 사는 곳을 더 살기 좋은 곳으로 만들기 위해 내가 할 수 있는 것은 무엇일까?",
  ],
];
export { default as prompts } from "./original-prompts.json";
export const selfAssessments = [
  {
    title: "우리 동네 알기",
    badge: "우리 동네 장소 탐험가",
    levels: [
      "장소와 그곳에서 하는 일을 아주 자세히 설명할 수 있음",
      "여러 장소와 그곳에서 하는 일을 알고 있음",
      "어떤 장소가 있는지 더 살펴봐야 함",
    ],
  },
  {
    title: "다양한 마음 이해하기",
    badge: "마음 읽기 척척 박사",
    levels: [
      "사람마다 장소감이 다른 이유를 확실히 설명할 수 있음",
      "장소에 대한 생각과 기분이 다를 수 있음을 이해함",
      "생각이 왜 다른지 더 고민할 필요가 있음",
    ],
  },
  {
    title: "안전의 소중함 알기",
    badge: "우리 동네 든든 보안관",
    levels: [
      "안전 관련 기관이 사라졌을 때 생길 구체적인 어려움을 설명함",
      "우리 동네 안전을 지켜주는 곳의 중요성을 이해함",
      "안전을 지켜주는 장소의 역할을 더 알아볼 필요가 있음",
    ],
  },
  {
    title: "더 좋은 동네 만들기",
    badge: "살기 좋은 마을 메이커",
    levels: [
      "동네를 위해 자신이 할 수 있는 일을 찾아 실제 실천함",
      "문제 해결 아이디어를 내고 실천하려 노력함",
      "자신이 할 수 있는 일을 앞으로 더 찾아볼 필요가 있음",
    ],
  },
];
export const trainingBook = {
  title: "디지털로 쉬워지는 교수 평기 일체화 교육과정 수업 평가 기록",
  url: "https://www.yes24.com/product/goods/193918016",
  cover: "/images/teaching-assessment-record-book.png",
};
export const books = [
  {
    title: "된다! 교사를 위한 에듀테크 바이브 코딩 수업 활용법",
    description: "제미나이와 캔바로 우리 반 전용 20가지 프로그램, 웹 앱 만들기",
    url: "https://www.yes24.com/product/goods/194513646",
    cover: "/images/book-vibe-coding.png",
    color: "sage",
  },
  {
    title: "디지털로 쉬워지는 교수 평기 일체화 교육과정 수업 평가 기록",
    description: "개념기반 탐구학습 · AI 디지털 기반 수업",
    url: trainingBook.url,
    cover: trainingBook.cover,
    color: "peach",
  },
  {
    title: "AI 에듀테크 100과사전",
    description: "현직 교사들이 직접 써보고 추천하는 AI 에듀테크 100과사전",
    url: "https://www.yes24.com/product/goods/176544873",
    cover: "/images/book-ai-edtech-100.png",
    color: "lavender",
  },
  {
    title: "AI 코스웨어와 초등 교육",
    description: "초등 교육에서 생각하는 AI 코스웨어의 활용",
    url: "https://www.yes24.com/product/goods/153294899",
    cover: "/images/book-ai-courseware.png",
    color: "butter",
  },
];
export const resources = [
  {
    title: "7단계 연수 가이드",
    description: "수업 설계부터 기록까지, 강의를 순서대로 따라가세요.",
    category: "강의자료",
    url: "/lesson/1",
  },
  {
    title: "Padlet 시작하기",
    description: "게시판과 Sandbox로 학생의 생각을 모으는 수업 공간",
    category: "Padlet",
    url: site.padlet,
  },
  {
    title: "Gemini 시작하기",
    description: "프롬프트를 복사해 수업 설계와 피드백을 실습하세요.",
    category: "Gemini",
    url: site.gemini,
  },
  {
    title: "내 수업 맞춤 프롬프트",
    description: "학년과 단원을 입력하고 여섯 가지 프롬프트를 만드세요.",
    category: "프롬프트",
    url: "/create",
  },
  {
    title: "수업 설계 워크시트",
    description: "성취기준, 탐구 질문, 활동, 평가 근거를 정리하는 인쇄용 양식",
    category: "템플릿",
    url: "/templates/lesson-planner.html",
  },
  {
    title: "우리 동네 배움의 흔적",
    description: "장소·경험·감정을 연결하는 설명용 수업 예시",
    category: "학생 결과 예시",
    url: "/lesson/3",
  },
];
export const media: Record<string, { src: string; alt: string }> = {
  mapRubricResult: {
    src: "/images/mind-map-rubric-result.png",
    alt: "마음속 지도 평가 루브릭 실제 결과. 장소의 강조, 감정의 시각화, 경험의 반영을 우수·보통·노력 요함의 세 수준으로 구분한 표",
  },
  pdfEvaluationResult: {
    src: "/images/pdf-student-evaluation-result.png",
    alt: "PDF에서 찾은 학생별 평가 근거와 서술형 분석 결과. 우리 주변의 장소와 삶에 대한 성취 수준 및 구체적인 활동 근거를 정리한 표이며 학생 이름은 가려져 있음",
  },
  sandboxGuide: {
    src: "/images/padlet-sandbox-entry-guide.png",
    alt: "Padlet 만들기에서 샌드박스 영역의 화이트보드를 선택하는 경로를 화살표로 표시한 안내 화면",
  },
  aiRecipeGuide: {
    src: "/images/padlet-ai-recipe-guide.png",
    alt: "Padlet에서 만들기 버튼을 누른 뒤 AI 레시피 영역의 수업 활동 아이디어를 선택하는 경로를 화살표로 표시한 안내 화면",
  },
  activityIdeas: {
    src: "/images/padlet-activity-ideas-example.png",
    alt: "패들렛 AI 레시피 수업 활동 아이디어 예시. 우리 주변 장소 찾기, 장소 분류, 감정 스티커 지도, 인터뷰와 실천 다짐 등 우리가 사는 곳 단원의 활동을 제안한 게시판",
  },
  mainPadlet: {
    src: "/images/main-padlet-four-questions.png",
    alt: "1단원 통합 게시판. 질문1부터 질문4까지 네 개의 섹션에 사실적·개념적·논쟁적·실천적 탐구 질문을 각각 게시한 메인 패들렛",
  },
  map: {
    src: "/images/sandbox-neighborhood-emotion-map.png",
    alt: "Sandbox로 만든 우리 동네 감정지도. 학교, 시장, 놀이터, 소방서 등 주변 장소에 학생들의 경험과 감정을 메모와 이모지로 표현한 수업 활동",
  },
  posts: {
    src: "/images/padlet-place-stories-feedback.png",
    alt: "장소에 대한 경험과 감정을 기록한 학생들의 패들렛 게시물. 초록색과 빨간색 신호등 피드백으로 상태를 표시하고, 보완이 필요한 글에는 교사가 구체적인 경험을 묻는 댓글을 남긴 수업 사례",
  },
  thinking: {
    src: "/images/padlet-what-if-feedback.png",
    alt: "네 모퉁이 토론 전, 장소가 사라진 상황을 먼저 생각하고 패들렛에 기록한 학생 게시물과 신호등 피드백",
  },
  debate: {
    src: "/images/four-corners-discussion.png",
    alt: "도서관·미술관, 종합병원, 경찰서·소방서, 큰 공원 중 중요한 장소를 선택하고 근거를 나눈 네 모퉁이 토론 실제 수업 자료",
  },
  field: {
    src: "/images/padlet-field-design-example.png",
    alt: "동네 답사 게시물 필드 활용 사례. 조사한 장소의 사진, 발견한 점, 구체적인 이유, 나의 작은 실천을 기록하고 신호등 피드백을 적용한 패들렛 게시물",
  },
  mindMapGallery: {
    src: "/images/mind-map-gallery.png",
    alt: "평소 자주 가고 좋다고 생각한 건물들을 중심으로 학생들이 그린 마음속 지도를 모아 전시한 패들렛 갤러리 수업 예시",
  },
  record: { src: "", alt: "NEIS 평어 결과 예시" },
};
