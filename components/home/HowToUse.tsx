import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react"; // 导入需要的图标

// 定义数据类型
interface Paso {
  numero: number;
  titulo: string;
  descripcion: string;
}

interface HowToUseProps {
  pasos: Paso[]; // 接收一个步骤数组
}

export function HowToUse({ pasos }: HowToUseProps) {
  return (
    <section className="py-20 bg-[#F4F4F8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Cómo Usar Nuestro Generador de Lettering</h2>
          <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
            Sigue estos sencillos pasos para crear diseños de lettering impresionantes en minutos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 使用传入的 pasos 数据 */}
          {pasos.map((paso, index) => (
            <div key={index} className="flex mb-12 last:mb-0">
              <div className="mr-6">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {paso.numero}
                </div>
                {/* 控制分隔线显隐 */}
                <div
                  className={`h-full w-0.5 bg-primary/20 mx-auto ${
                    index === pasos.length - 1 ? "hidden" : "block"
                  }`}
                ></div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold mb-2">{paso.titulo}</h3>
                <p className="text-[#9EA3B0] mb-4">{paso.descripcion}</p>
                {/* 最后一个步骤显示按钮 */}
                {index === pasos.length - 1 ? (
                  <Button asChild>
                    <Link href="/editor" className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Comenzar ahora
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
