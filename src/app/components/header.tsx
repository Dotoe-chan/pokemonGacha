import Link from "next/link";
const Header = () => {
    return (
        <header>
            <Link href="/">
            <div>
            <h1 className="bg-blue-200 text-5xl font-bold text-center p-5">ポケモンガチャ</h1>
            </div>
            </Link>
        </header>
    );
}

export default Header; 
