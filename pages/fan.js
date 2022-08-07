import { useMoralis } from "react-moralis"
import Link from "next/link"

export default function Fan() {
	const { isWeb3Enabled, account } = useMoralis()

	return (
		<div>
			<h1 className="text-center my-10 font-bold text-2xl">FANS PAGE</h1>
			{isWeb3Enabled && account ? (
				<div className="flex justify-evenly">
					<Link href={"/showContent"}>
						<h2 className="m-20 text-xl p-20 rounded-lg bg-white w-[20%] text-center transition ease-in-out hover:scale-105 duration-500 shadow-3xl">
							See Your NFT Collection
						</h2>
					</Link>

					<Link href={"/seeContent"}>
						<h2 className="m-20 text-xl p-20 rounded-lg bg-white w-[20%] text-center transition ease-in-out hover:scale-105 duration-500 shadow-3xl">
							See Exclusive Content
						</h2>
					</Link>
				</div>
			) : (
				<h2>Connect to Rinkeby</h2>
			)}
		</div>
	)
}
