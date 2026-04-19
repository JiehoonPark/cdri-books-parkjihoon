import { formatPrice } from '../lib/formatPrice';

interface BookPriceProps {
  price: number;
  salePrice: number;
}

function PriceLabel({ children }: { children: string }) {
  return (
    <span className="w-[37px] text-right text-[10px] leading-[22px] font-medium text-text-subtitle">
      {children}
    </span>
  );
}

export function BookPrice({ price, salePrice }: BookPriceProps) {
  const hasDiscount = salePrice > 0 && salePrice < price;

  if (!hasDiscount) {
    return (
      <div className="flex items-baseline gap-2">
        <PriceLabel>판매가</PriceLabel>
        <span className="text-[18px] leading-[26px] font-bold text-text-primary">
          {formatPrice(price)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-[14px]">
      <div className="flex items-baseline gap-2">
        <PriceLabel>원가</PriceLabel>
        <span
          className="text-[18px] leading-[26px] text-text-primary line-through"
          style={{ fontWeight: 350 }}
        >
          {formatPrice(price)}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <PriceLabel>할인가</PriceLabel>
        <span className="text-[18px] leading-[26px] font-bold text-text-primary">
          {formatPrice(salePrice)}
        </span>
      </div>
    </div>
  );
}
