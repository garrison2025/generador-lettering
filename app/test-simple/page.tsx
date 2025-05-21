// app/test-simple/page.tsx
"use client" // 明确为客户端组件，以模拟 editor 页面的情况
import React from 'react';

export default function TestSimplePage() {
  return (
    <div style={{ padding: '20px', fontSize: '20px', textAlign: 'center', color: 'green' }}>
      <h1>Simple Test Page</h1>
      <p>This page is extremely simple.</p>
      <p>If this works on mobile, the issue is likely NOT global.</p>
    </div>
  );
}
