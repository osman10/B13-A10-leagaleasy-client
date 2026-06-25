import AdmintForm from '@/components/AdminForm';
import { getUserSession } from '@/lib/core/session';


const page =async () => {
    const userData =await getUserSession();
  
    const userId = userData.id;
  
    return (
        <div>
            <AdmintForm userId={userId}/>
        </div>
    );
};

export default page;