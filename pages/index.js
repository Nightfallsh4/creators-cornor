import Link from "next/link"
import MintModal from "./MintModal"

export default function Home() {
	return (
		<div className="flex justify-center ">
			<Link href="/creator">
				<div className="rounded-lg mx-20 bg-white  shadow-3xl p-40 my-40 transition ease-in-out hover:scale-105 duration-500 ">
					<h2 className="text-3xl">I am a creator</h2>
				</div>
			</Link>
			<Link href="/fan">
				<div className="rounded-lg mx-20 bg-white  shadow-3xl p-40 my-40 transition ease-in-out hover:scale-105 duration-500">
					<h2 className="text-3xl">I am a fan</h2>
				</div>
			</Link>
		</div>
	)
}
