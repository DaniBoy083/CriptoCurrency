import styles from './home.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent, useEffect } from 'react';

interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    pricdeUsd: string;
    marketCapUsd: string;
    rank: string;
    changePercent24Hr: string;
    supply: string;
    maxSupply: string;
    vwap24Hr: string;
    volumeUsd24Hr: string;
    explorer: string;
}

interface DataProps {
    data: CoinProps[];
}

export function HomePage() {

    const [input, setInput] = useState('');
    const [coins, setCoins] = useState<CoinProps[]>([]);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=04a07e84652a8216b58b05be9a2b603a7201ec7db445a28ce65f7c1796503d36")
        .then((response) => response.json())
        .then((data: DataProps) => {
            const coinsData = data.data;
            const price = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            const formatedCoins = coinsData.map((coin) => {
                const formated = {
                    ...coin,
                    formatedPrice: price.format(Number(coin.pricdeUsd))
                }

                return formated;
            })

            console.log(formatedCoins);
        })
    }

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // Lógica para buscar a moeda com base no input
        if (input === '') return;
        navigate(`/detail/${input}`);
    }

    function handleGetMore() {
        // Lógica para carregar mais moedas
        console.log('Carregar mais moedas...');
    }

    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o nome da moeda..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">
                    <BsSearch size={30} color='white' />
                </button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor de mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume (24h)</th>
                        <th scope='col'>Últimas 24h</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                    <tr className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <div className={styles.name}>
                                <Link to="/detail/bitcoin">
                                    <span>Bitcoin</span> | BTC
                                </Link>
                            </div>
                        </td>
                        <td className={styles.td} data-label="Valor de mercado">
                            1BI
                        </td>
                        <td className={styles.td} data-label="Preço">
                            1BI
                        </td>
                        <td className={styles.td} data-label="Volume (24h)">
                            1BI
                        </td>
                        <td className={styles.tdProfit} data-label="Últimas 24h">
                            <span>1.20</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className={styles.buttonMore} onClick={handleGetMore}>
                Carregar mais
            </button>
        </main>
    )
}
