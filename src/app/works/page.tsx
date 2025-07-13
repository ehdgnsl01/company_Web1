// src/app/works/page.tsx  (서버 컴포넌트)
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default async function WorksPage() {
  const q = query(collection(db, "works"), orderBy("date", "desc"));
  const snap = await getDocs(q);
  const works = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

  return (
    <main className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">Works</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {works.map((w) => (
          <div
            key={w.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <img src={w.thumbnailUrl} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{w.title}</h2>
              <p className="text-gray-600 mt-2">{w.client}</p>
              <div className="mt-4">
                <iframe
                  src={w.youtubeUrl.replace("watch?v=", "embed/")}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
