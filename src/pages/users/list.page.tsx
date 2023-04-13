import { useEffect } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';

const UsersListPage = () => {
    useEffect(()=>{
        checkToken()
    },[])
    
    return (
        <>
            <H2Title>List User</H2Title>
        </>
    );
};

export default UsersListPage;
