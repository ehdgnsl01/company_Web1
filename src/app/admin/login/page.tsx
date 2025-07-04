// src/app/admin/login/page.tsx
"use client"; // 이 한 줄이 맨 위에 있어야 클라이언트 컴포넌트로 동작합니다

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("폼 제출 시도:", email, pw); // 디버그 로그
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      router.replace("/admin");
    } catch (err: any) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl mb-4">관리자 로그인</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <label className="block mb-4">
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 mt-1"
          />
        </label>
        <label className="block mb-6">
          비밀번호
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
            className="w-full border px-3 py-2 mt-1"
          />
        </label>
        <button
          type="submit" // ← 반드시 type="submit"이어야 onSubmit이 호출됩니다
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          로그인
        </button>
      </form>
    </main>
  );
}
