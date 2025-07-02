import ClientHome from "./client-home";
import AdsterraBanner from "@/components/AdsterraBanner"; // 1. 导入新的广告组件

// 使用静态导出以提高SEO
export const metadata = {
  title: "Generador de Lettering - Crea diseños tipográficos únicos",
  description:
    "Diseña textos artísticos, caligrafía digital y letras decoradas para tus proyectos con nuestro generador de lettering online. Fácil, rápido y gratuito.",
};

export default function Home() {
  return (
    // 2. 使用 React Fragment (<>) 来包裹您的主页组件和广告组件
    <>
      <ClientHome />
      
      {/* 这会将广告横幅放置在您主页内容的紧下方 */}
      <AdsterraBanner />
    </>
  );
}
