import { useEffect } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';

const ListContactsPage = () => {
    useEffect(()=>{
        checkToken()
    },[])
    
    return (
        <div>
            <H2Title>List Contacts</H2Title>
        </div>
    );
};

export default ListContactsPage;
