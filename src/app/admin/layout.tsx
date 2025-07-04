// src/app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // 로그인 페이지는 가드만 해제
    if (path === "/admin/login" || path === "/admin/login/") {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [path, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading…
      </div>
    );
  }

  return (
    <>
      {/* /admin/login 경로일 때는 Header 노출 안 함 */}
      {path !== "/admin/login" && (
        <AdminHeader
          onSignOut={async () => {
            await signOut(auth);
            router.replace("/admin/login");
          }}
        />
      )}
      <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
    </>
  );
}
