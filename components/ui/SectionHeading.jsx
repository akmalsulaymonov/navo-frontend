export default function SectionHeading({ title, action, onAction }) {
  return (
    <div className="flex items-center justify-between border-t-[3px] border-primary pt-3.5 mb-6">
      <h2 className="text-[18px] font-bold text-gray-900 dark:text-white m-0 tracking-tight">{title}</h2>
      {action && (
        <button onClick={onAction}
          className="text-[13px] font-semibold text-secondary bg-transparent border-none cursor-pointer p-0 transition-opacity hover:opacity-70"
        >{action} →</button>
      )}
    </div>
  )
}
