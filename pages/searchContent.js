import { TextField } from "@mui/material"
import { useState } from "react"
import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk"
import NFT from "../components/NFT"

export default function searchContent() {
	const [name, setName] = useState("")
	const [open, setOpen] = useState(false)

	const nameChange = (event) => {
		setName(event.target.value)
		console.log(event.target.value)
	}

	const networkInfo = {
		network: ZDKNetwork.Ethereum,
		chain: ZDKChain.Mainnet,
	}

	const API_ENDPOINT = "https://api.zora.co/graphql"
	const args = {
		endPoint: API_ENDPOINT,
		networks: [networkInfo],
	}

	const zdk = new ZDK(args)

	let add
	async function queryCollectionName() {
		const args = {
			where: { collectionAddresses: [name] },
			includeFullDetails: true,
		}
		const collectionResponse = await zdk.collections(args)
		console.log("Address from query:- ")
		console.log(collectionResponse.collections.nodes[0].address)

		console.log("Address set is:-")

		setOpen(true)
		console.log(collectionResponse.collections.nodes[0].address)
		console.log(name)
	}

	function cancel() {
		setOpen(false)
	}
	const [openShareModal, setOpenShareModal] = useState(false)

	function modalOutput() {}

	return (
		<div className="p-10">
			<TextField
				fullWidth
				required
				label="Name of the content"
				variant="outlined"
				onChange={nameChange}
			/>
			<button
				className="m-5 border-2 p-4 rounded-lg border-black"
				onClick={queryCollectionName}
			>
				Search
			</button>
			<button
				className="m-5 border-2 p-4 rounded-lg border-black"
				onClick={cancel}
			>
				Cancel
			</button>
			<div>
				{open ? (
						<NFT contract={name} />
				) : (
					<h2>Search</h2>
				)}
			</div>
			
		</div>
	)
}
