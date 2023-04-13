import { useEffect } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';

const ContactsListPage = () => {
    useEffect(()=>{
        checkToken()
    },[])
    
    return (
        <>
            <H2Title>List Contacts</H2Title>
        </>
    );
};

export default ContactsListPage;
