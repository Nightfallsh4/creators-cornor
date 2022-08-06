import TextField from "@mui/material/TextField"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useState } from "react"
// import {
// 	useContractWrite,
// 	useSwitchNetwork,
// 	useNetwork,
// 	useConnect,
// 	usePrepareContractWrite,
// } from "wagmi"
// import { InjectedConnector } from "wagmi/connectors/injected"
import ZoraNFTCreatorProxy_ABI from "../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json"
const ZoraNFTCreatorProxy_ADDRESS_RINKEBY =
	"0x2d2acD205bd6d9D0B3E79990e093768375AD3a30"
import { ethers } from "ethers"

export default function MintModal() {
	const { isWeb3Enabled, chainId, account } = useMoralis()

	const [name, setName] = useState("")
	const [symbol, setSymbol] = useState("")
	const [number, setNumber] = useState("")
	const [royalty, setRoyalty] = useState("")
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

	const description = ""
	// console.log(chainId)
	const chainId2 = parseInt(chainId)
	// console.log(chainId2)
	const params = {
				name:name,
				symbol:symbol,
				editionSize:number,
				royaltyBPS:royalty,
				fundsRecipient:account,
				defaultAdmin:account,
				saleConfig:salesConfig,
				description:description,
				animationURI:"ipfs://bafybeihb7c3dci47emksiwjviixkiq2xkfcasn4refpupsy5uhzy32b5oq",
				imageURI:`ipfs://${imageUri}`,
			}
	const { runContractFunction } = useWeb3Contract({
		abi: ZoraNFTCreatorProxy_ABI.abi,
		contractAddress: ZoraNFTCreatorProxy_ADDRESS_RINKEBY,
		functionName: "createEdition",
		params: params,
	})

	// const { connectAsync: connectToRinkeby } = useConnect({
	// 	connector: new InjectedConnector(),
	// 	chainId: 4,
	// 	onSettled(data, error, variables, context) {
	// 		console.log("connect to mainnet settled: ", data)
	// 	},
	// })

	// const {
	// 	config,
	// 	error: prepareError,
	// 	isError: isPrepareError,
	// } = usePrepareContractWrite({
	// 	addressOrName: ZoraNFTCreatorProxy_ADDRESS_RINKEBY,
	// 	contractInterface: ZoraNFTCreatorProxy_ABI.abi,
	// 	functionName: "createEdition",
	// 	args: {
	// 		name:name,
	// 		symbol:symbol,
	// 		editionSize:number,
	// 		royaltyBPS:royalty,
	// 		fundsRecipient:account,
	// 		defaultAdmin:account,
	// 		saleConfig:salesConfig,
	// 		description:description,
	// 		animationURI:"ipfs://bafybeihb7c3dci47emksiwjviixkiq2xkfcasn4refpupsy5uhzy32b5oq",
	// 		imageURI:`ipfs://${imageUri}`,
	// 	},
	// })

	// const {
	// 	data: rinkebyEditionData,
	// 	isError: rinkebyEditionError,
	// 	isLoading: rinkebyEditionLoading,
	// 	write: rinkebyEditionWrite,
	// } = useContractWrite({ config })

	// console.log(ZoraNFTCreatorProxy_ABI.abi)
	// console.log(zoraContractsAddress[chainId2])
	// console.log(params);


	return (
		<>
			{isWeb3Enabled && chainId == 0x4 ? (
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
				<input
					label="Enter Image URI of collection"
					variant="outlined"
					onChange={imageChange}
				/>
				<button
					className="border-black border-2 my-5 rounded-lg p-5"
					onClick={() => {
						connectToRinkeby()
					}}
				>
					Connect to Rinkeby
				</button>
				<button
					className="border-black border-2 my-5 rounded-lg p-5"
					onClick={ async () => {
						await runContractFunction()
					}}
				>
					Mint
				</button>
			</div>
			 ) : (
				<h1>Connect to Rinkeby in Metamask and try again</h1>
			)} 
		</>
	)
}
