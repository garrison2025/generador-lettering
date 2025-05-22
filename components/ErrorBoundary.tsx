"use client"; // 这一行非常重要，告诉Next.js这是个客户端组件

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // 一个可选的属性，用来显示自定义的错误界面
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // 当子组件抛出错误时，这个静态方法会被调用
    //它应该返回一个新的state，告诉组件现在有错误了
    return { hasError: true, error, errorInfo: null }; // 我们只记录error，errorInfo在componentDidCatch中获取
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 这个生命周期方法在错误被抛出后，并且getDerivedStateFromError被调用后执行
    // 你可以在这里记录错误到服务器，或者做其他处理
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // 同时更新 state 包含 errorInfo，以便调试时显示
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // 如果有错误，就显示我们预设的 fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // 如果没有提供 fallback UI，就显示一个默认的
      return (
        <div style={{ padding: "20px", border: "1px solid red", margin: "10px" }}>
          <h1>客户端渲染出错了</h1>
          <p>抱歉，应用的一部分遇到了问题，无法正常显示。</p>
          {/* 为了调试，我们可以在开发环境显示详细错误 */}
          {/* 在实际部署到Cloudflare Pages时，process.env.NODE_ENV 通常是 'production' */}
          {/* 但为了这次排错，我们暂时都显示 */}
          {this.state.error && (
            <div style={{ marginTop: "10px", padding: "10px", background: "#ffe0e0", border: "1px solid #ffb0b0" }}>
              <h3 style={{ color: "darkred" }}>错误详情 (供调试):</h3>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: "12px", color: "#333" }}>
                <strong>错误名称:</strong> {this.state.error.name}
                <br />
                <strong>错误信息:</strong> {this.state.error.message}
                {this.state.errorInfo && (
                   <>
                     <br />
                     <strong>组件堆栈:</strong>
                     {this.state.errorInfo.componentStack}
                   </>
                )}
                 <br />
                <strong>完整堆栈跟踪 (请复制给技术支持):</strong>
                {this.state.error.stack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    // 如果没有错误，就正常显示子组件
    return this.props.children;
  }
}

export default ErrorBoundary;
