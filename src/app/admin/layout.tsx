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
    // 로그인 페이지는 검증 없이 통과
    if (path === "/admin/login") {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      // 관리자 여부 확인: custom claim 검증
      const token = await user.getIdTokenResult(true);
      if (token.claims.admin) {
        setLoading(false);
      } else {
        await signOut(auth);
        router.replace("/admin/login");
      }
    });
    return () => unsub();
  }, [path, router]);

  if (loading) return <p className="p-6 text-center">Loading…</p>;

  return (
    <>
      <AdminHeader
        onSignOut={async () => {
          await signOut(auth);
          router.replace("/admin/login");
        }}
      />
      <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
    </>
  );
}
