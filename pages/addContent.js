import {
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import LitJsSdk from "lit-js-sdk"
import { Web3Storage } from "web3.storage"

export default function addContent() {
	const [condition, setCondition] = useState("")
	const [input, setInput] = useState("")
	const [selectedFile, setSelectedFile] = useState(null)
	function handleChange(event) {
		setCondition(event.target.value)
	}
	function inputChange(event) {
		setInput(event.target.value)
	}
	console.log(condition)
	console.log(input)

	function makeControlCondition() {
		let control
		if (condition == "NFT Address") {
			control = [
				{
					conditionType: "evmBasic",
					contractAddress: input,
					standardContractType: "ERC721",
					chain: "ethereum",
					method: "balanceOf",
					parameters: [":userAddress"],
					returnValueTest: {
						comparator: ">=",
						value: "1",
					},
				},
			]
		} else if (condition == "POAP ID") {
			control = [
				{
					conditionType: "evmBasic",
					contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
					standardContractType: "POAP",
					chain: "xdai",
					method: "eventId",
					parameters: [],
					returnValueTest: {
						comparator: "=",
						value: input,
					},
				},
				{
					operator: "or",
				},
				{
					conditionType: "evmBasic",
					contractAddress: "0x22C1f6050E56d2876009903609a2cC3fEf83B415",
					standardContractType: "POAP",
					chain: "ethereum",
					method: "eventId",
					parameters: [],
					returnValueTest: {
						comparator: "=",
						value: input,
					},
				},
			]
		} else if (condition == "Wallet Address") {
			control = [
				{
					conditionType: "evmBasic",
					contractAddress: "",
					standardContractType: "",
					chain: "ethereum",
					method: "",
					parameters: [":userAddress"],
					returnValueTest: {
						comparator: "=",
						value: input,
					},
				},
			]
		}
		return control
	}

	async function encrypt() {
		const client = new LitJsSdk.LitNodeClient()
		await client.connect()
		window.litNodeClient = client
		const accessControlConditions = makeControlCondition()
		const chain = "polygon"

		await client.connect()
		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
		console.log("Authenticated MEssage:- ")
		console.log(authSig)
		// const { encryptedFile, symmetricKey } =
		// 	await LitJsSdk.encryptFileAndZipWithMetadata({
		// 		authSig: authSig,
		// 		accessControlConditions: accessControlConditions,
		// 		file: selectedFile,
		// 		LitNodeClient: client,
		// 		chain: chain,
		// 	})
		const { zipBlob,encryptedSymmetricKey, symmetricKey } = await LitJsSdk.encryptFileAndZipWithMetadata({
			file: selectedFile,
			authSig: authSig, 
			accessControlConditions: accessControlConditions,
			chain: chain,
			litNodeClient: window.litNodeClient,
			unifiedAccessControlConditions: [accessControlConditions]
		})
		console.log("Symmetric Key :- ")
		console.log(symmetricKey)
		// const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
		// 	accessControlConditions: accessControlConditions,
		// 	symmetricKey: symmetricKey,
		// 	authSig: authSig,
		// 	chain: chain,
		// })
		console.log("Encrypted Symmetric Key:-")
		console.log(encryptedSymmetricKey)
		console.log("Enxrypted File")
		console.log(zipBlob);
		return {
			zipBlob,
			encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
				encryptedSymmetricKey,
				"base16",
			),
			accessControlConditions,
		}
	}

	async function uploadIpfs() {
		const token = process.env.NEXT_PUBLIC_WEB3_STORAGE
		const web3Client = new Web3Storage({ token: token })
		console.log("Getting Encrypted FIle and key...")
		const { zipBlob, encryptedSymmetricKey, accessControlConditions } =
			await encrypt()
		console.log("Done getting Encrypted FIle and key")
		console.log("Putting files on ipfs.....")
		const cid = await web3Client.put([
			new File([zipBlob], "upload.zip"),
			// new File([encryptedSymmetricKey], "encryptedSymmetric.txt"),
			// new File([accessControlConditions], "accessCOntrolConditions.json"),
		])
		console.log("Uploaded to IPFS successfully. CID is :- ")
		console.log(cid)
        alert(`YOUR FIles have been encrypted with LIT and Uploaded to IPFS ${cid}`)
	}

	return (
		<div className="justify-center p-10">
			<h1 className="text-2xl">Fill the Conditions</h1>
			<div className="flex w-[50%] border-b-2 my-10 py-5">
				<div className="mx-5">
					<Box sx={{ minWidth: 250 }}>
						<FormControl fullWidth>
							<InputLabel>
								Select Condition
							</InputLabel>
							<Select
								value={condition}
								label="Select Condition"
								onChange={handleChange}
							>
								<MenuItem value={"NFT Address"}>NFT Contract</MenuItem>
								<MenuItem value={"POAP ID"}>POAP</MenuItem>
								<MenuItem value={"Wallet Address"}>Wallet</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
				<Box sx={{ minWidth: 350 }}>
					<TextField
						required
						value={input}
						label={condition}
						onChange={inputChange}
						fullWidth
					/>
				</Box>
			</div>
			<div className="flex m-5">
				<Input
					type={"file"}
					placeholder="Placeholder"
					onChange={(e) => {
						setSelectedFile(e.target.files[0])
					}}
				/>
				<button
					className="mx-5 border-2 p-4 rounded-lg border-black hover:bg-slate-300"
					onClick={uploadIpfs}
				>
					Publish to LIT and IPFS
				</button>
			</div>
		</div>
	)
}
