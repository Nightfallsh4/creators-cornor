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
						<h2 className="m-20 text-xl border-2 p-20 rounded-lg border-black w-[20%] text-center transition ease-in-out hover:scale-105 duration-500">
							See Your NFT Collection
						</h2>
					</Link>

					<Link href={"/seeContent"}>
						<h2 className="m-20 text-xl border-2 p-20 rounded-lg border-black w-[20%] text-center transition ease-in-out hover:scale-105 duration-500">
							See Exclusive Content for things you own
						</h2>
					</Link>
				</div>
			) : (
				<h2>Connect to Rinkeby</h2>
			)}
		</div>
	)
}
