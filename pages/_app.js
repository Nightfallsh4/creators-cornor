import { MoralisProvider } from "react-moralis"
import "../styles/globals.css"
import Head from "next/head"
import Header from "../components/Header"

function MyApp({ Component, pageProps }) {
	return (
		<MoralisProvider initializeOnMount={false}>
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
		</MoralisProvider>
	)
}

export default MyApp
