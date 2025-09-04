"use client";
import { useState } from "react";
import Image from "next/image";

interface Pokemon {
    id: number;
    name: string;
    type: string;
    URL: string;
}

interface GachaResponse {
    pokemon: Pokemon;
    message: string;
}

const Main = () => {
    const [result, setResult] = useState<GachaResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const Start = async () => {
        setLoading(true);
        setResult([]);
        setProgress(0);
        
        try {
            const results: GachaResponse[] = [];
            
            // 10回のガチャを順次実行して進捗を表示
            for (let i = 0; i < 10; i++) {
                const response = await fetch('http://127.0.0.1:8000/api/gacha');
                const data: GachaResponse = await response.json();
                results.push(data);
                setResult([...results]); // 結果を逐次更新
                setProgress(i + 1); // 進捗を更新
                
                // 少し待機してアニメーション効果を追加
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        } catch (error) {
            alert('ガチャに失敗しました:');
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    return (
        <main>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">１０連ガチャをまわす</h2>
            <p className="text-gray-700 text-lg mb-2">君はでんせつのポケモンを捕まえられるかな？</p>
            
            <button 
                onClick={Start} 
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 mb-4"
            >
                {loading ? `ガチャ中...(${progress}/10)` : "ガチャをまわす"}
            </button>

            {/* 進捗バー */}
            {loading && (
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>進捗</span>
                        <span>{progress}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(progress / 10) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {result.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                    {result.map((poke, index) => (
                        <div key={index} className="pokemon-result">
                            <div className="p-4 bg-white rounded-lg shadow-md text-center">
                                <Image 
                                    src={poke.pokemon.URL} 
                                    alt={poke.pokemon.name} 
                                    width={100} 
                                    height={100}
                                    className="pokemon-image mx-auto"
                                />
                                <h3 className="text-lg font-bold text-blue-700 mt-2">{poke.pokemon.name}</h3>
                                <p className="text-sm text-gray-600">{poke.pokemon.type}</p>
                                <p className="text-xs text-green-600 mt-1">{poke.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
export default Main;