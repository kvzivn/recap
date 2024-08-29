"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface ReminderContextType {
  generating: boolean
  setGenerating: (generating: boolean) => void
}

const ReminderContext = createContext<ReminderContextType | undefined>(
  undefined
)

export const ReminderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [generating, setGenerating] = useState(false)

  return (
    <ReminderContext.Provider value={{ generating, setGenerating }}>
      {children}
    </ReminderContext.Provider>
  )
}

export const useReminderContext = () => {
  const context = useContext(ReminderContext)
  if (context === undefined) {
    throw new Error("useReminderContext must be used within a ReminderProvider")
  }
  return context
}
