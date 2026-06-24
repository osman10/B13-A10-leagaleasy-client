import ClientForm from '@/components/ClientForm';
import { getUserSession } from '@/lib/core/session';


const page =async () => {
    const userData =await getUserSession();
  
    const userId = userData.id;
  
    return (
        <div>
            <ClientForm userId={userId}/>
        </div>
    );
};

export default page;