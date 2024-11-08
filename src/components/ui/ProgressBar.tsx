export default function ProgressBar({ current, total }: { current: number, total: number }) {
  function getProgressType() {
    if (current / total > 0.74) {
      return 'progress-error'
    }

    return 'progress-primary'
  }

  return (
    <progress className={`progress w-full ${getProgressType()}`} value={current} max={total}></progress>
  )
}