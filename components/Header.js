import ConnectButton from "./ConnectButton"
import Link from "next/link"

export default function Header() {
	return (
		<nav className="border-b-2 border-black">
			<div className="flex flex-row items-center justify-between mb-10">
				<Link href={"/"}>
					<a className="text-4xl font-bold text-black">Creators Conor</a>
				</Link>
				<div className="flex items-center justify-between">
					<ConnectButton />
					
				</div>
			</div>
			
		</nav>
	)
}
