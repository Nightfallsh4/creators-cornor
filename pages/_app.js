import { MoralisProvider } from "react-moralis"
import "../styles/globals.css"
import Head from "next/head"
import Header from "../components/Header"
// import { chain } from "wagmi"
// import { WagmiConfig, createClient, configureChains } from "wagmi"
// import { publicProvider } from "wagmi/providers/public"

// const { provider, webSocketProvider } = configureChains(
// 	[chain.rinkeby, chain.ropsten],
// 	[publicProvider()],
// )

// const client = createClient({
// 	autoConnect: true,
// 	provider,
// 	webSocketProvider,
// })

function MyApp({ Component, pageProps }) {
	return (
		<MoralisProvider initializeOnMount={false}>
			{/* <WagmiConfig client={client}> */}
				<div className="p-20 bg-slate-100 min-h-full">
				<div className="pb-20">
					<Head>
						<title>Creators Content</title>
						<meta
							name="description"
							content="A one stop shop for creators to share exclusive content"
						/>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Header />
					<Component {...pageProps} />
					</div>
				</div>
			{/* </WagmiConfig> */}
		</MoralisProvider>
	)
}

export default MyApp
