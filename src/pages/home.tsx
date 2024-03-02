import Hero from '@/components/Hero/Hero';
import Navbar from '@/components/Navbar/Navbar';
import Matrix from '@/components/Utils/Matrix';
import PageWithIndicator from '@/components/Utils/PageWithIndicator';
import React from'react';
 
interface HomeProps{
prop: string
}
 
const Home: React.FC<HomeProps> = ({prop}) => 
{
  return (
    <>
      {" "}
      <Navbar />
      <PageWithIndicator route={"/home"} bgcolor={"bg-indigo-500"}>
        <>
          <Matrix />
          <Hero />
        </>
      </PageWithIndicator>
    </>
  );
}
export default Home;