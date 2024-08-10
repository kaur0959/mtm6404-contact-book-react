import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from './db';

function Contact() {
  const { id } = useParams();
  const [contact, setContact] = React.useState(null);

  React.useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, 'contacts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    fetchContact();
  }, [id]);

  if (!contact) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>{contact.firstName} {contact.lastName}</h2>
        <p>Email: {contact.email}</p>
      </div>
    </div>
  );
}

export default Contact;
