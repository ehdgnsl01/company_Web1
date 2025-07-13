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

  const isLoginPath =
    path === "/admin/login" || path === "/admin/login/";

  useEffect(() => {
    // 로그인 페이지는 가드만 해제
    if (isLoginPath) {
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
  }, [isLoginPath, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading…
      </div>
    );
  }

  return (
    <>
      {/* 로그인 페이지가 아니면 헤더 표시 */}
      {!isLoginPath && (
        <AdminHeader
          onSignOut={async () => {
            await signOut(auth);
            router.replace("/admin/login");
          }}
        />
      )}
      <main
        className="p-6 bg-gray-100 min-h-screen pt-30 -mt-20"
      >
        {children}
      </main>
    </>
  );
}
