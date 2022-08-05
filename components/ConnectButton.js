import { useMoralis } from "react-moralis"


export default function ConnectButton() {
	const { enableWeb3, isWeb3Enabled, account, deactivateWeb3} = useMoralis()

    const connect = async () => {
        await enableWeb3()
        
    }
	return (
		<div>
			{isWeb3Enabled && account ? (
				<div>
					<button
						className="rounded-lg p-3 bg-black text-white transition ease-in-out hover:bg-slate-300 duration-300"
						onClick={async () => await deactivateWeb3()}
					>
						{account.slice(0, 8)}.....{account.slice(account.length - 6)}
					</button>
				</div>
			) : (
				<div>
					<button
						className="rounded-lg p-3 bg-black text-white transition ease-in-out hover:bg-slate-300"
						onClick={async () => connect()}
						
					>
						Connect Metamask
					</button>
				</div>
			)}
		</div>
	)
}
