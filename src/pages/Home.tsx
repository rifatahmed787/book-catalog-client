import HeroBanner from "@/components/Home/HeroBanner";
import LatestBooks from "@/components/Home/LatestBooks";

const Home = () => {
	return (
		<div>
			<HeroBanner />
			<div className="bg-white pt-[210px]  md:pt-[283px] pb-[100px] -mt-[190px]">
				<LatestBooks />
			</div>
		</div>
	);
};

export default Home;

