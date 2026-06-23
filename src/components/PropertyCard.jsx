// 物件1件分の情報を表示するカード
export function PropertyCard({ property }) {
  const { name, rent, area } = property

  return (
    <div className="property-card">
      <h3 className="property-name">{name}</h3>
      <p className="property-rent">家賃: {rent.toLocaleString()}円</p>
      <p className="property-area">エリア: {area}</p>
    </div>
  )
}
