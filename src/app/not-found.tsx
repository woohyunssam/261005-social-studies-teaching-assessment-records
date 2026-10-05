import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container page">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>이 페이지는 찾을 수 없어요.</h1>
      <p>홈으로 돌아가 배움의 여정을 이어가세요.</p>
      <Link className="button primary" href="/">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
