// app/editor/page.tsx
import type { Metadata } from "next"
import EditorClient from "./editor-client"
// 假设 ErrorBoundary.tsx 文件在项目的 'components' 文件夹下
// 如果你的 'components' 文件夹在 'app' 文件夹的同级，路径可能是 "@/components/ErrorBoundary"
// 如果 'components' 文件夹在 'src' 文件夹下 (且 src 是根)，路径也可能是 "@/components/ErrorBoundary"
// 如果 ErrorBoundary.tsx 与 page.tsx 在同一目录的父级目录下的 components 文件夹，路径会像下面这样
// import ErrorBoundary from "../../components/ErrorBoundary"; 
// *** 请根据你的实际项目结构调整下面的导入路径 ***
import ErrorBoundary from "@/components/ErrorBoundary"; 

export const metadata: Metadata = {
  title: "Editor de Lettering - Crea diseños tipográficos personalizados",
  description:
    "Utiliza nuestro editor de lettering para crear diseños tipográficos personalizados con múltiples estilos, colores y efectos para cualquier ocasión.",
  keywords:
    "editor de lettering, diseño de letras, tipografía personalizada, lettering online, crear lettering, herramienta de lettering",
  openGraph: {
    title: "Editor de Lettering - Crea diseños tipográficos personalizados",
    description:
      "Utiliza nuestro editor de lettering para crear diseños tipográficos personalizados con múltiples estilos, colores y efectos para cualquier ocasión.",
    images: [{ url: "/og-images/editor-preview.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editor de Lettering - Crea diseños tipográficos personalizados",
    description:
      "Utiliza nuestro editor de lettering para crear diseños tipográficos personalizados con múltiples estilos, colores y efectos para cualquier ocasión.",
    images: ["/og-images/editor-preview.png"],
  },
}

export default function EditorPage() {
  return (
    <ErrorBoundary
      fallback={ // 这是当 EditorClient 出错时显示的自定义界面
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh', // 占据大部分屏幕高度
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#fff3f3', // 淡红色背景
          border: '2px dashed #ff0000', // 红色虚线边框
          margin: '20px',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: '#cc0000', fontSize: '24px', marginBottom: '10px' }}>
            🚧 Editor Nivel Dios Ha Fallado 🚧
          </h2>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
            ¡Ups! El componente principal del editor no ha podido cargarse. Prueba a refrescar la página.
          </p>
          <p style={{ fontSize: '14px', color: '#777' }}>
            Si el problema persiste, por favor, captura o copia la información de error de la consola del navegador y envíala al equipo de soporte.
          </p>
        </div>
      }
    >
      <EditorClient /> 
    </ErrorBoundary>
  );
}
