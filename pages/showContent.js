import { useState } from "react"
import { ZDK } from "@zoralabs/zdk"
import NFT from "../components/NFT"
import { useMoralis } from "react-moralis"
import { Box, CircularProgress, Fade, Skeleton } from "@mui/material"

let nfts
export default function showContent() {
	const { isWeb3Enabled, account } = useMoralis()
	const [openNft, setNft] = useState(false)
	const [loading, setLoading] = useState(false)
	const API_ENDPOINT = "https://api.zora.co/graphql"

	const zdk = new ZDK(API_ENDPOINT)

	const args = {
		where: {
			ownerAddresses: [account, "zeneca.eth"],
		},
		sort: {
			sortDirection: "ASC",
			sortKey: "MINTED",
		},
		pagination: { limit: 12 },
	}

	async function getNFTs() {
		setLoading(true)
		const response = await zdk.tokens(args)
		console.log(response.tokens.nodes)
		nfts = response.tokens.nodes
		setLoading(false)
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
							disabled={loading}
						>
							Show Your NFTs
						</button>
						<Box sx={{ height: 40 }}>
							<Fade
								in={loading}
								style={{
									transitionDelay: loading ? "800ms" : "0ms",
								}}
								unmountOnExit
							>
								<CircularProgress />
							</Fade>
						</Box>
					</div>
				</div>
			) : (
				<h1>Not Connected</h1>
			)}
			{openNft ? (
				<div>
					<div className="flex flex-wrap justify-between rounded-lg ">
						{nfts.length == 0 ? <h2>No NFTS found</h2> : nfts.map(nft)}
					</div>
				</div>
			) : null}
			{loading ? (
				<Box sx={{ width:"100%" }}>
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
					<Skeleton animation="wave" />
				</Box>
			) : null}
		</div>
	)
}
