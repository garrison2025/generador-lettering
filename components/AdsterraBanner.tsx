// file: components/AdsterraBanner.tsx

'use client'; // 声明这是一个客户端组件，因为广告脚本需要在浏览器中运行

import Script from 'next/script';
import { useEffect, useRef } from 'react';

const AdsterraBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 这个 useEffect 确保组件在浏览器中渲染后执行
    // Adsterra 的脚本是自执行的，它会自动查找具有特定ID的div
  }, []);

  return (
    // 您可以根据需要调整外层 div 的样式，比如边距和对齐
    <div className="my-4 flex justify-center items-center">
      {/* 
        这是 Adsterra 提供的广告容器 div。
        ID "container-cc202e40437a820c195547baf8127c69" 已根据您的代码设置。
      */}
      <div ref={adRef} id="container-cc202e40437a820c195547baf8127c69" />

      {/* 
        这是 Adsterra 提供的脚本，使用 Next.js 的 <Script> 组件优化加载。
        src URL 已根据您的代码设置。
      */}
      <Script
        id="adsterra-script-invoke" // 给脚本一个唯一的ID
        strategy="afterInteractive" // 在页面变得可交互后加载脚本，不影响性能
        async
        src="//pl27062724.profitableratecpm.com/cc202e40437a820c195547baf8127c69/invoke.js"
      />
    </div>
  );
};

export default AdsterraBanner;
