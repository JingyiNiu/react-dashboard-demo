import { useEffect } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';

const ListUsersPage = () => {
    useEffect(()=>{
        checkToken()
    },[])
    
    return (
        <div>
            <H2Title>List User</H2Title>
        </div>
    );
};

export default ListUsersPage;
