// src/app/works/page.tsx
export default function WorksPage() {
  // 추후 fetch로 포트폴리오 데이터 불러오시면 됩니다.
  return (
    <main className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">Our Works</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {/* 예시 카드 */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <iframe
            src="https://www.youtube.com/embed/VIDEO_ID"
            className="w-full aspect-video"
            allowFullScreen
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Sample Project</h2>
            <p className="text-gray-600 mt-2">Commercial Film</p>
          </div>
        </div>
        {/* 추가 카드들... */}
      </div>
    </main>
  );
}
