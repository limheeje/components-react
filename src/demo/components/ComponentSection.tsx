import type {ReactNode} from 'react'

import {CodeBlock} from '~/demo/components/CodeBlock'

interface ComponentSectionProps {
  title: string
  description?: string
  preview: ReactNode
  code: string | string[]
  notes?: string[]
}

export function ComponentSection({title, description, preview, code, notes}: ComponentSectionProps) {
  return (
    <section className="demo-section">
      <div className="demo-section__head">
        <span className="demo-section__title">{title}</span>
        {description != null && <span className="demo-section__desc">{description}</span>}
      </div>
      <div className="demo-section__preview">{preview}</div>
      <CodeBlock code={code} />
      {notes != null && notes.length > 0 && (
        <ul className="demo-section__notes">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
