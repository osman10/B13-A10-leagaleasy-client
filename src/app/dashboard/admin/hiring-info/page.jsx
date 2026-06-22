import { getHiringInfo } from "@/app/data/Data";
import HiringInfo from "@/components/HiringInfo";



const page =async () => {
    const hiringInfo =await getHiringInfo()
    return (
        <div>
            <HiringInfo hiringInfo={hiringInfo}/>
        </div>
    );
};

export default page;