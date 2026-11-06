// Core educational types

export type Lesson = {
  id: string
  module: string
  title: string
  description: string
  explanation: string
  codeExample?: CodeExample
  challenges?: Challenge[]
  practice?: string[]
}

export type Module = {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  completed: boolean
}

export type Challenge = {
  id: string
  type: 'slots' | 'playground' | 'multiple-choice' | 'text-fill'
  prompt: string
  code?: string
  expected?: string
  options?: string[]
  explanation?: string
  pass?: boolean
}

export type CodeExample = {
  code: string
  language?: string
  description?: string
  output?: string
}

export type Progress = {
  lessonId: string
  completed: boolean
  challengeScore?: number
  practiced: boolean
}

export type CurriculumData = {
  [key: string]: Module
}

// Progression states
export type LessonStatus = 'locked' | 'active' | 'completed'
export type ChallengeStatus = 'pending' | 'attempting' | 'passed' | 'failed'