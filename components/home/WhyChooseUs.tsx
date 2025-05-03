import { Card, CardContent } from "@/components/ui/card";
import { Palette, Type, Sliders, Download, Save, CheckCircle } from "lucide-react"; // 把需要的图标也 import 进来

// 定义传入数据的类型 (告诉 TypeScript 我们期望收到什么样的 'razones' 数据)
interface Razon {
  icon: React.ReactNode; // 图标是 React 元素
  titulo: string;
  descripcion: string;
}

interface WhyChooseUsProps {
  razones: Razon[]; // 'razones' 是一个包含多个 Razon 对象的数组
}

// 定义组件函数，它接收 razones 作为 props
export function WhyChooseUs({ razones }: WhyChooseUsProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir nuestro Generador de Lettering?</h2>
          <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
            Nuestro generador de lettering ofrece una experiencia única con características diseñadas para hacer tu
            proceso creativo más fácil y divertido.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 使用传入的 razones 数据来渲染列表 */}
          {razones.map((razon, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {razon.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{razon.titulo}</h3>
                <p className="text-[#9EA3B0]">{razon.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
