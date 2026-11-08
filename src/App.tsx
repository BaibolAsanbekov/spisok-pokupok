import { useState } from 'react'
import { type Product } from './types/product'
import ProductItem from './components/ProductItem'
import './App.css'

// Пара товаров, чтобы список не был пустым при первом открытии
const начальныеТовары: Product[] = [
    { id: 1, name: "Телефон", price: 25000 },
    { id: 2, name: "Наушники", price: 3500 },
];

function App() {
    // state — то, что React отслеживает: поменялось, значит надо перерисовать
    const [products, setProducts] = useState<Product[]>(начальныеТовары);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // Общая стоимость: складываем цены всех товаров.
    // Считается заново при каждой перерисовке, хранить отдельно не нужно.
    const total = products.reduce((сумма, product) => сумма + product.price, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();                 // иначе страница перезагрузится

        if (name.trim() === "" || price === "") {
            return;                         // пустое не добавляем
        }

        const newProduct: Product = {
            id: Date.now(),                 // простой способ получить разные id
            name: name,
            price: Number(price),
        };

        // Новый массив, а не push: React сравнивает ссылки, а не содержимое,
        // и при push ссылка осталась бы прежней — перерисовки бы не случилось.
        setProducts([...products, newProduct]);

        setName("");
        setPrice("");
    };

    const handleDelete = (id: number) => {
        // filter оставляет все товары, КРОМЕ того, у кого совпал id
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="app">
            <div className="panel">
                <header className="app-head">
                    <h1>Список покупок</h1>
                    <p className="subtitle">
                        Товаров в списке: {products.length}
                    </p>
                </header>

                <ul className="items">
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>

                {products.length === 0 && (
                    <p className="empty">Список пуст, добавь первый товар.</p>
                )}

                <div className="total">
                    <span>Общая стоимость</span>
                    <strong>{total.toLocaleString("ru-RU")} сом</strong>
                </div>

                <form className="add-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="field field-name"
                        placeholder="Название"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        className="field field-price"
                        placeholder="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <button type="submit" className="btn-add">
                        Добавить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default App;
