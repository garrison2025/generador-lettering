"use client"
import React from 'react';

export default function EditorClient() {
  console.log("EditorClient minimal version rendering on mobile?"); // 加个日志
  return (
    <div style={{ border: '2px solid orange', padding: '10px' }}>
      <p>EditorClient - Minimal Version Test</p>
    </div>
  );
}
