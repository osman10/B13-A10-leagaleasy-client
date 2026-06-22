import LawyersList from '@/components/LawyersList';
import Loading from '@/components/Loading';






const page = async () => {

  const res = await fetch(`${process.env.SERVER_URL}/lawyers`, {
    cache: "no-store",
  });
  const lawyers = await res.json();


  if (!lawyers) {
    return <Loading />
  }




  return (
    <div>
      <LawyersList lawyers={lawyers} />
    </div>
  );
};

export default page;