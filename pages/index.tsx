import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Layout>
        <div className="flex bg-slate-200 flex-1 gap-2">
          <div className="flex-1 bg-white rounded-md">FOO</div>
          <div className="w-1/3 bg-white rounded-md">BAR</div>
        </div>
      </Layout>
    </>
  );
}