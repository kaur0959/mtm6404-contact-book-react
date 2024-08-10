import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import db from './db';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCollection = collection(db, 'contacts');
        const contactsSnapshot = await getDocs(contactsCollection);
        const contactsList = contactsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactsList);
      } catch (error) {
        console.error('Error fetching contacts: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const addContact = async () => {
    try {
      const newContact = {
        firstName,
        lastName,
        email,
      };
      const docRef = await addDoc(collection(db, 'contacts'), newContact);
      setContacts([...contacts, { id: docRef.id, ...newContact }]);
      setFirstName('');
      setLastName('');
      setEmail('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding contact: ', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact: ', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Contacts List</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Contact'}
      </button>
      {showForm && (
        <div className="card p-4 mb-4">
          <form onSubmit={(e) => { e.preventDefault(); addContact(); }}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Save Contact</button>
          </form>
        </div>
      )}
      <ul className="list-group">
        {contacts.map(contact => (
          <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/contact/${contact.id}`} className="text-decoration-none">
              {contact.firstName} {contact.lastName}
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {contacts.length === 0 && <p className="mt-3">No contacts found.</p>}
    </div>
  );
};

export default Contacts;
