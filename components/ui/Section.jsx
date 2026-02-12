export default function Section({ title, children }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-3">{title}</h2>
      {children}
    </div>
  )
}
