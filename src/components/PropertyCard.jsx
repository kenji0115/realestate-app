// 物件1件分の情報を表示するカード
export function PropertyCard({ property, onEdit, onDelete }) {
  const { name, rent, area, layout } = property

  return (
    <div className="property-card">
      <h3 className="property-name">{name}</h3>
      <p className="property-rent">家賃: {rent.toLocaleString()}円</p>
      <p className="property-area">エリア: {area}</p>
      <p className="property-layout">間取り: {layout}</p>

      <div className="property-card-actions">
        <button type="button" onClick={onEdit}>
          編集
        </button>
        <button type="button" className="danger" onClick={onDelete}>
          削除
        </button>
      </div>
    </div>
  )
}
