"use client"
import React from 'react';
import EditorClient from './editor-client'; // 确保路径正确

export default function EditorPage() {
  return (
    <>
      <p style={{color: 'purple', textAlign: 'center'}}>Now rendering EditorClient from page.tsx</p>
      <EditorClient />
    </>
  );
}
