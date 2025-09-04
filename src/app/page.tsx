"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import hakase from '../../public/hakase.png';

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
    const router = useRouter();

    const singlegacha = async () => {
        router.push('/single');
    };
    
    const tengacha = async () => {
        // 10連ガチャの処理（後で実装）
                router.push('/ten');
    }

    return (
        <main >
            <h2 className="text-3xl font-bold text-blue-800 mb-4">ポケモンガチャ</h2>
            <div className="flex justify-start mb-4">
                <div className="text-9xl">👨‍🔬</div>
                <div className="box-border p-1 border-5 border-gray-400 rounded-lg ">
                    <p className="text-gray-700 text-lg">はじめまして！ポケモンガチャへようこそ！</p>
                    <p className="text-gray-700 text-lg">わたしのなまえはオーキド　みんなからはポケモン はかせと したわれて おるよ</p>
                    <p className="text-gray-700 text-lg">この せかいには ポケット モンスターと よばれる いきもの たちが いたるところに すんでいる！</p>
                    <p className="text-gray-700 text-lg">きみも ぜひ ガチャを まわして ポケモンを つかまえて みたまえ！</p>
                </div>
            </div>
            <div className="flex gap-4 w-full">
            <button onClick={singlegacha} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
                1回ガチャをまわす
            </button>
            <button onClick={tengacha} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50">
                10連ガチャをまわす
            </button>
            </div>
        </main>
    );
}

export default Main;