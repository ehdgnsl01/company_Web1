// src/app/admin/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><main className="-mt-30">{children}</main></>;
}
