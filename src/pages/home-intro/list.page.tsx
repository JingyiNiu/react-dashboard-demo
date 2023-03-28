import { useEffect } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';

const ListHomeIntroPage = () => {
    useEffect(()=>{
        checkToken()
    },[])
    
    return (
        <div>
            <H2Title>List Home Intro</H2Title>
        </div>
    );
};

export default ListHomeIntroPage;
