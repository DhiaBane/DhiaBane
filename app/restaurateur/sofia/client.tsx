"use client"

import dynamic from "next/dynamic"

// Dynamically import the SofiaAIChat component with SSR disabled
// This prevents the component from trying to access browser APIs during server rendering
const SofiaAIChat = dynamic(() => import("@/components/sofia-ai-chat"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-gray-300 mb-4"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  ),
})

export function SofiaAIChatClient() {
  return <SofiaAIChat />
}
