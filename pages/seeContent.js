import { CircularProgress, Fade, Skeleton, TextField } from "@mui/material"
import { useState } from "react"

import LitJsSdk from "lit-js-sdk"
import { Box } from "@mui/system"

export default function showContent() {
	const [input, setInput] = useState("")
	const [image, setImage] = useState([])
	const [meta, setMeta] = useState("")
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	function inputChange(event) {
		setInput(event.target.value)
	}

	async function getFilesFromIPFS(cid) {
		console.log("Getting files from ipfs.....")
		const data = await fetch(`https://ipfs.io/ipfs/${cid}/upload.zip`)
			.then((response) => {
				if (response.ok) {
					return response
				}
				throw response
			})
			.catch((error) => {
				console.log(error)
			})
		const zip = await data.blob()
		console.log(zip)
		return zip
	}

	async function decrypt(cid) {
		setLoading(true)
		const client = new LitJsSdk.LitNodeClient()
		await client.connect()
		window.litNodeClient = client
		const chain = "polygon"

		await client.connect()
		const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
		console.log("Authenticated MEssage:- ")
		console.log(authSig)

		const file = await getFilesFromIPFS(cid)
		console.log("File:- ")
		console.log(file)
		const { decryptedFile, metadata } =
			await LitJsSdk.decryptZipFileWithMetadata({
				authSig: authSig,
				file: file,
				litNodeClient: window.litNodeClient,
			})

		console.log("Decrypted file is:- ")
		console.log(decryptedFile)
		console.log("Metadata is :-")
		console.log(metadata)
		const blob = new Blob([decryptedFile])
		const url = URL.createObjectURL(blob)

		setLoading(false)
		setImage(url)
		setMeta(metadata)
		setOpen(true)
	}

	const Media = () => {
		if (meta.type == null) {
			return <div className="w-96 h-1/2 bg-slate-300">No metadata found</div>
		}
		if (meta.type.startsWith("text")) {
			return <div className="w-96 h-1/2 bg-slate-300">{image}</div>
		}
		if (meta.type.startsWith("audio")) {
			return <audio className="w-96 h-1/2" src={image} />
		}
		if (meta.type.startsWith("video")) {
			return <video className="w-96 h-1/2" src={image} />
		}
		if (meta.type.startsWith("image")) {
			return <img className="w-96 h-1/2" src={image} />
		}
		return <div className="w-96 h-1/2">unknown: {meta.type}</div>
	}

	return (
		<div className="py-10">
			<div className="p-5">
				<TextField
					required
					value={input}
					label={"Enter IPFS CID"}
					onChange={inputChange}
					fullWidth
				/>
			</div>
			<div className="my-10 flex justify-center border-b-2">
				<button
					className="m-5 border-2 p-4 rounded-lg border-black hover:bg-slate-300"
					onClick={() => {
						decrypt(input)
					}}
				>
					Get files
				</button>
				<Box sx={{ height: 30 }}>
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
			{open ? (
				<div className="my-10 flex justify-center">
					<Media />
				</div>
			) : null}
			{loading ? (
				<Box sx={{ width: "100%" }}>
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
