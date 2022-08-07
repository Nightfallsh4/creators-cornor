import TextField from "@mui/material/TextField"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useState } from "react"
import ZoraNFTCreatorProxy_ABI from "../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json"
const ZoraNFTCreatorProxy_ADDRESS_RINKEBY =
	"0x2d2acD205bd6d9D0B3E79990e093768375AD3a30"
import { ethers } from "ethers"

export default function MintModal() {
	const { isWeb3Enabled, chainId, account } = useMoralis()

	const [name, setName] = useState("")
	const [symbol, setSymbol] = useState("")
	const [number, setNumber] = useState(0)
	const [royalty, setRoyalty] = useState(0)
	const [imageUri, setImageUri] = useState("")

	function nameChange(event) {
		setName(event.target.value)
	}
	function symbolChange(event) {
		setSymbol(event.target.value)
	}
	function numberChange(event) {
		setNumber(event.target.value)
	}
	function royaltyChange(event) {
		setRoyalty(event.target.value)
	}
	function imageChange(event) {
		setImageUri(event.target.value)
	}

	// const { chain } = useNetwork()
	// const publicSalePrice = ethers.utils.parseEther("0")
	const salesConfig = [
		ethers.utils.parseEther("0"),
		"100",
		"0",
		String(Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60),
		"0",
		"0",
		"0x0000000000000000000000000000000000000000000000000000000000000000",
	]

	const description = " "
	// console.log(chainId)
	const chainId2 = parseInt(chainId)
	// console.log(chainId2)
	const params = {
		name: name,
		symbol: symbol,
		editionSize: number,
		royaltyBPS: royalty,
		fundsRecipient: account,
		defaultAdmin: account,
		saleConfig: salesConfig,
		description: description,
		animationURI:
			"ipfs://bafybeihb7c3dci47emksiwjviixkiq2xkfcasn4refpupsy5uhzy32b5oq",
		imageURI: `ipfs://${imageUri}`,
	}
	const { runContractFunction: mintContract } = useWeb3Contract({
		abi: ZoraNFTCreatorProxy_ABI.abi,
		contractAddress: ZoraNFTCreatorProxy_ADDRESS_RINKEBY,
		functionName: "createEdition",
		params: params,
	})

	return (
		<>
			{isWeb3Enabled ? (
				<div className="space-y-5">
					<h1 className="my-4">Mint Colletion</h1>
					<TextField
						fullWidth
						required
						label="Enter name of collection"
						variant="outlined"
						onChange={nameChange}
					/>
					<TextField
						fullWidth
						required
						label="Enter symbol of collection"
						variant="outlined"
						onChange={symbolChange}
					/>
					<TextField
						fullWidth
						required
						label="Enter number of NFTs in collection"
						variant="outlined"
						type={"number"}
						onChange={numberChange}
					/>
					<TextField
						fullWidth
						required
						label="Enter Royalty in BPS"
						variant="outlined"
						type={"number"}
						onChange={royaltyChange}
					/>
					<TextField
						fullWidth
						label="Enter Image URI of collection"
						variant="outlined"
						onChange={imageChange}
					/>
					{/* <button
						className="border-black border-2 my-5 rounded-lg p-5"
						onClick={() => {
							connectToRinkeby()
						}}
					>
						Connect to Metamask
					</button> */}
					<button
						className="border-black border-2 my-5 rounded-lg p-5 hover:bg-slate-300"
						onClick={mintContract}
					>
						Mint
					</button>
				</div>
			) : (
				<h1>Connect to Metamask and try again</h1>
			)}
		</>
	)
}
