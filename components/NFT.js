import { useState } from "react"
import { ZDK } from "@zoralabs/zdk"

export default function NFT(props) {
	console.log("Contract Address in NFT")
	console.log(props.contract)
	console.log("Contract ID in NFT")
	console.log(props.id)
	const [url, setUrl] = useState("")
	const [mimeType, setMimeType] = useState("")
	const [address, setAddress] = useState("")
	const [tokenId, setTokenId] = useState(0)
	const [name, setName] = useState("")

	async function MyNFT() {
		const API_ENDPOINT = "https://api.zora.co/graphql"
		const zdk = new ZDK(API_ENDPOINT)

		const args = {
			token: {
				address: props.contract,
				tokenId: props.id,
			},
			includeFullDetails: false,
		}
		const response = await zdk.token(args)
		console.log(response)
		if ("image" in response.token.token && response.token.token.image != null) {
			if (
				"url" in response.token.token.image &&
				response.token.token.image.url != null
			) {
				const url1 = response.token.token.image.url
				const mime = response.token.token.image.mimeType
				if (url1.startsWith("ipfs://")) {
					const realUrl = url1.replace("ipfs://", "https://ipfs.io/ipfs/")
					setUrl(realUrl)
					setMimeType(mime)
					setAddress(response.token.token.collectionAddress)
					setTokenId(response.token.token.tokenId)
					setName(response.token.token.name)
				} else {
					setUrl(url1)
					setMimeType(mime)
					setAddress(response.token.token.collectionAddress)
					setTokenId(response.token.token.tokenId)
					setName(response.token.token.name)
				}
			}
		} else {
			setUrl("No Image Url found")
			setMimeType("text")
			setAddress(response.token.token.collectionAddress)
			setTokenId(response.token.token.tokenId)
			setName(response.token.token.name)
		}
	}

	const Media = () => {
		if (mimeType == null) {
			return <div className="w-80 h-96 bg-slate-300">No mime type found</div>
		}
		if (mimeType.startsWith("text")) {
			return <div className="w-80 h-96 bg-slate-300">{url}</div>
		}
		if (mimeType.startsWith("audio")) {
			return <audio className="w-80 h-96" src={url} />
		}
		if (mimeType.startsWith("video")) {
			return <video className="w-80 h-96" src={url} />
		}
		if (mimeType.startsWith("image")) {
			return <img className="w-80 h-96" src={url} />
		}
		return <div className="w-80 h-96">unknown: {mimeType}</div>
	}

	MyNFT()
	return (
		<div className="w-80 h-96 mx-14 mb-44">
			<Media />
			<div className="bg-black p-5">
				{address == "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85" ? (
					<h2 className="text-white">NFT:- ENS</h2>
				) : (
					<h2 className="text-white">NFT:- {name}</h2>
				)}

				<h2 className="text-white">
					Contract:- {address.slice(0, 8)}.....
					{address.slice(address.length - 6)}
				</h2>
				{tokenId.length > 15 ? (
					<h2 className="text-white">
						Token ID- {tokenId.slice(0, 8)} .....{" "}
						{tokenId.slice(tokenId.length - 6)}
					</h2>
				) : (
					<h2 className="text-white">Token ID :- {tokenId}</h2>
				)}
			</div>
		</div>
	)
}
