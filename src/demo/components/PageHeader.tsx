interface PageHeaderProps {
  title: string
  component?: string
  desc: string
}

export function PageHeader({title, component, desc}: PageHeaderProps) {
  return (
    <header className="demo-page-header">
      <h2 className="demo-page-header__title">{title}</h2>
      <div className="demo-page-header__meta">
        {component != null && <code className="demo-page-header__chip">{component}</code>}
        <span className="demo-page-header__desc">{desc}</span>
      </div>
    </header>
  )
}
