interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
} as const;

export function Spinner({ size = 'lg', label = 'Loading...' }: SpinnerProps) {
  return (
    <div role="status" aria-label={label || 'Loading'} className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-transparent border-indigo-600 ${sizeMap[size]}`}
        aria-hidden="true"
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

export default Spinner;
