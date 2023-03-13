import React, { ReactElement } from 'react';

interface OrderItemToggleProps {
  className?: string;
  icon: ReactElement;
  onToggle?: (selected: boolean) => void;
}

function OrderItemToggle({ className, icon, onToggle }: OrderItemToggleProps) {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (onToggle) {
      onToggle(selected);
    }
  }, [selected, onToggle]);

  const handleOnClick = () => {
    setSelected(!selected);
  };

  return (
    <button
      onClick={handleOnClick}
      className={
        (selected ? 'bg-slate-700 ' : '') +
        'round shadow-xl bg-slate-500 rounded-full w-14 h-14 border-2 border-transparent hover:border-slate-400 transition'
      }
    >
      {React.cloneElement(icon, {
        className: 'mx-auto text-slate-200',
      })}
    </button>
  );
}

export default OrderItemToggle;
