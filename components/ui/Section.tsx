import { ReactNode } from 'react'

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-3">{title}</h2>
      {children}
    </div>
  )
}
