import { useState } from "react"
import { ZDK } from "@zoralabs/zdk"
import NFT from "../components/NFT"
import { useMoralis } from "react-moralis"

let nfts
export default function showContent() {
	const { isWeb3Enabled, account } = useMoralis()
	const [openNft, setNft] = useState(false)
	const [address, setAddress] = useState("")
	const API_ENDPOINT = "https://api.zora.co/graphql"

	const zdk = new ZDK(API_ENDPOINT)

	const args = {
		where: {
			ownerAddresses: ["rustboot.eth", account, "superphiz.eth"],
		},
		pagination: { limit: 12 },
	}

	async function getNFTs() {
		const response = await zdk.tokens(args)
		console.log(response.tokens.nodes)
		nfts = response.tokens.nodes

		setNft(true)
	}

	function nft(params) {
		console.log(params.token.collectionAddress)
		return (
			<div>
				<NFT
					contract={params.token.collectionAddress}
					id={params.token.tokenId}
				/>
			</div>
		)
	}

	return (
		<div className="my-5">
			{isWeb3Enabled ? (
				<div className=" min-h-full h-28">
					<div className="flex justify-center">
						<button
							className="mx-5 border-2 p-4 rounded-lg border-black hover:bg-slate-300"
							onClick={getNFTs}
						>
							Show Your NFTs
						</button>
					</div>
				</div>
			) : (
				<h1>Not Connected</h1>
			)}
			{openNft ? (
				<div>
					<div className="flex flex-wrap justify-between rounded-lg ">
						{nfts.map(nft)}
					</div>
				</div>
			) : null}
		</div>
	)
}
