from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import requests

app = FastAPI(title="Pokemon Gacha API", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/api/gacha")
def gacha():
    # ランダムなポケモンIDを生成（1-898）
    pokemon_id = random.randint(1, 898)
    
    try:
        # PokeAPIからポケモンデータを取得
        response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemon_id}")
        response.raise_for_status()  # エラーがあれば例外を発生
        data = response.json()
        
        # タイプ情報を取得
        types = [t["type"]["name"] for t in data["types"]]
        type_str = " / ".join(types)

        url = data["sprites"]["front_default"]

        # 日本語の名前を取得

        species_response = requests.get(f"https://pokeapi.co/api/v2/pokemon-species/{pokemon_id}")
        species_response.raise_for_status()
        species_data = species_response.json()

        ja_name = next(
            (name["name"] for name in species_data["names"] if name["language"]["name"] == "ja"),
            data["name"].capitalize()
        )

        type_str = next(
            (t["genus"] for t in species_data["genera"] if t["language"]["name"] == "ja"),
            type_str
        )

        # フロントエンドが期待する形式でレスポンスを作成
        pokemon = {
            "id": data["id"],
            "name": ja_name,
            "type": type_str,
            "URL": data["sprites"]["front_default"]
        }
        
        return {
            "pokemon": pokemon,
            "message": f"{pokemon['name']}を捕まえた！"
        }
        
    except requests.exceptions.RequestException as e:
        # エラー
        return{
            "massage": "エラー!",
        }
