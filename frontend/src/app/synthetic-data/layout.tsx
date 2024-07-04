import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM Project",
  description: "LLM Project University",
};

export default function SyntheticDataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={"flex w-full h-full justify-center items-center"}
      style={{ height: "100vh" }}
    >
      {children}
    </div>
  );
}
