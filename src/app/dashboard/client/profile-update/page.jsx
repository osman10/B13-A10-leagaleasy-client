import LawyerForm from '@/components/LawyerForm';
import { getUserSession } from '@/lib/core/session';


const page =async () => {
    const userData =await getUserSession();
  
    const userId = userData.id;
  
    return (
        <div>
            <LawyerForm userId={userId}/>
        </div>
    );
};

export default page;