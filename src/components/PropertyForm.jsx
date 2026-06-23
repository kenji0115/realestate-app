import { useId, useState } from 'react'

// 物件の新規登録・編集に使用する入力フォーム
export function PropertyForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [submitting, setSubmitting] = useState(false)
  // 新規登録フォームと編集フォームが同時に表示された際にid重複を避ける
  const formId = useId()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    await onSubmit({ name, rent: Number(rent), area, layout })
    setSubmitting(false)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor={`${formId}-name`}>物件名</label>
        <input
          id={`${formId}-name`}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor={`${formId}-rent`}>家賃(円)</label>
        <input
          id={`${formId}-rent`}
          type="number"
          min="0"
          value={rent}
          onChange={(event) => setRent(event.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor={`${formId}-area`}>エリア</label>
        <input
          id={`${formId}-area`}
          type="text"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor={`${formId}-layout`}>間取り</label>
        <input
          id={`${formId}-layout`}
          type="text"
          placeholder="例: 1LDK"
          value={layout}
          onChange={(event) => setLayout(event.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
