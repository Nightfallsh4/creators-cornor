import { NFTPreview } from "@zoralabs/nft-components"
import { useState } from "react"
import { Modal, Box } from "@mui/material"
// import Box from "@mui/material"

export default function NFT(props) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "white",
		border: "2px solid #000",
		boxShadow: 24,
		p: 8,
	}

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)


	return (
		<div>
			<NFTPreview contract={props.contract} id="1" onClick={handleOpen} />
			<Modal
				open={open}
				onClose={handleClose}
			>
                <Box sx={style}>
                    <h2>MOdal WOrks</h2>
                    <input type={"file"}/>
                </Box>
            </Modal>
		</div>
	)
}
