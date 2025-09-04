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
    const [result, setResult] = useState<GachaResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const Start = async () => {
        setLoading(true);
setResult(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/gacha');
            const data: GachaResponse = await response.json();
            setResult(data);
            console.log(data);
        } catch (error) {
            alert('ガチャに失敗しました:');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main >
            <h2 className="text-3xl font-bold text-blue-800 mb-4">１回ガチャをまわす</h2>
            <p className="text-gray-700 text-lg mb-2">君はでんせつのポケモンを捕まえられるかな？</p>
            
            <button 
                onClick={Start} 
                disabled={loading}
                className="md-2 pd-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
                {loading ? "ガチャ中..." : "ガチャをまわす"}
                
            </button>

            {result && (
                <div >

                        <br/>
                        <hr/>
                    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                        
                        <h3 className="text-xl font-bold text-blue-700 mb-2">{result.pokemon.name}</h3>
                        <p>{result.pokemon.type}</p>
                        <Image src={result.pokemon.URL} alt={result.pokemon.name} width={200} height={200} />
                        <p className="mt-2 text-green-600">{result.message}</p>
                    </div>
                    
                </div>
            )}
        </main>
    );
}
export default Main;