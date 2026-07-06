export function FilterChips({ options, value, onChange, label }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="text-sm font-medium text-text-secondary mr-1">{label}</span>}
      {options.map((opt) => {
        const id = typeof opt === 'string' ? opt : opt.id
        const lbl = typeof opt === 'string' ? opt : opt.label
        const active = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              active
                ? 'bg-primary text-white shadow-sm shadow-primary/25'
                : 'bg-gray-100 text-text-secondary hover:bg-primary-light hover:text-primary-dark'
            }`}
          >
            {lbl}
          </button>
        )
      })}
    </div>
  )
}

export function MultiFilterChips({ options, values, onChange, label }) {
  const toggle = (id) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id))
    } else {
      onChange([...values, id])
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="text-sm font-medium text-text-secondary mr-1">{label}</span>}
      {options.map((opt) => {
        const id = typeof opt === 'string' ? opt : opt.id
        const lbl = typeof opt === 'string' ? opt : opt.label
        const active = values.includes(id)
        return (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              active
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 text-text-secondary hover:bg-primary-light'
            }`}
          >
            {lbl}
          </button>
        )
      })}
    </div>
  )
}
