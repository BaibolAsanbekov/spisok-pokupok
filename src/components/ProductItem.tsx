import { type Product } from '../types/product'

interface ProductItemProps {
    product: Product;
    onDelete: (id: number) => void;
}

function ProductItem({ product, onDelete }: ProductItemProps) {
    return (
        <li className="item">
            <span className="item-name">{product.name}</span>
            <span className="item-right">
                <span className="item-price">
                    {product.price.toLocaleString("ru-RU")} сом
                </span>
                <button
                    type="button"
                    className="btn-del"
                    onClick={() => onDelete(product.id)}
                    aria-label={`Удалить ${product.name}`}
                >
                    Удалить
                </button>
            </span>
        </li>
    )
}

export default ProductItem;
