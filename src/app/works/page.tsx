/* src/app/works/page.tsx */

import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default async function WorksPage() {
  const q = query(collection(db, "works"), orderBy("date", "desc"));
  const snap = await getDocs(q);
  const works = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

  return (
    <main className="bg-black py-16 min-h-screen">
      <div className="container mx-auto w-full max-w-[1350px] text-white">
        <h1 className="text-4xl font-bold mb-8">Works</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <Link key={w.id} href={`/works/${w.id}`}>
              <div className="block group relative overflow-hidden rounded-lg shadow-sm">
                <img
                  src={w.thumbnailUrl}
                  alt={w.title}
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-maincolor-300 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h2 className="text-xl font-semibold text-white">
                      {w.title}
                    </h2>
                    <p className="mt-2 text-gray-200">{w.client}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}