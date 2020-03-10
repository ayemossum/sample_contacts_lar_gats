//@flow
import React, { useEffect, useState } from "react";
// import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlusSquare, faEdit } from "@fortawesome/free-regular-svg-icons";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _get from "lodash/get";
import ContactModal from "../components/editContactModal";
import ConfirmModal from "../components/confirmModal";

import Layout from "../components/layout";
import SEO from "../components/seo";

import "./index.scss";

const IndexPage = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [deletingContact, setDeletingContact] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const fetchContacts = async () => {
        let result = await fetch("http://local.dev:8000/api/contacts")
        let _contacts = await result.json();
        setContacts(_contacts);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const editContact = (contact: Contact) => {
        setEditingContact(contact);
        setEditModalOpen(true);
    };

    const closeEditContact = () => {
        setEditModalOpen(false);
        setEditingContact(null);
    };

    const saveContact = async (contact: Contact) => {
        if (contact.id === null) {
            await saveNewContact(contact);
        }
        else {
            await saveEditContact(contact);
        }
        await fetchContacts();
        setEditModalOpen(false);
        setEditingContact(null);
    };

    const saveNewContact = async (contact: Contact) => {
        await fetch("http://local.dev:8000/api/contacts", {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    const saveEditContact = async (contact: Contact) => {
        await fetch(`http://local.dev:8000/api/contacts/${contact.id}`, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    const confirmDeleteContact = (contact: Contact) => {
        setDeletingContact(contact);
        setConfirmModalOpen(true);
    }

    const closeConfirmContact = () => {
        setDeletingContact(null);
        setConfirmModalOpen(false);
    };

    const deleteContact = async () => {
        await fetch(`http://local.dev:8000/api/contacts/${deletingContact.id}`, {
            method: "DELETE"
        });
        setDeletingContact(null);
        setConfirmModalOpen(false);
        fetchContacts();
    };

    return (
        <Layout>
            <SEO title="Home" />
            <h1>Contacts</h1>
            <p>Manage your contacts below.</p>

            <div style={{ marginBottom: `1.45rem` }}>
                {_isEmpty(contacts) ? (
                    <div>No contacts. You should add some.</div>
                ) : (
                    <div className="table">
                        <div className="table-header">
                            <div className="table-row">
                                <div className="table-cell"></div>
                                <div className="table-cell">
                                    Last Name
                                </div>
                                <div className="table-cell">
                                    First Name
                                </div>
                                <div className="table-cell">
                                    Email
                                </div>
                            </div>
                        </div>
                        <div className="table-body">
                            {_map(contacts, contact => (
                                <div className="table-row" key={contact.id}>
                                    <div className="table-cell">
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => confirmDeleteContact(contact)} />
                                        {" "}
                                        <FontAwesomeIcon icon={faEdit} onClick={() => editContact(contact)} />
                                    </div>
                                    <div className="table-cell">
                                        {contact.lastname}
                                    </div>
                                    <div className="table-cell">
                                        {contact.firstname}
                                    </div>
                                    <div className="table-cell">
                                        {contact.email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button type="button" onClick={ () => editContact(null) }><FontAwesomeIcon icon={faPlusSquare} /> Add Contact</button>

            <ContactModal isOpen={editModalOpen} contact={editingContact} onClose={closeEditContact} onSave={saveContact}/>
            <ConfirmModal isOpen={confirmModalOpen} title="Delete Contact" onClose={closeConfirmContact} onConfirm={deleteContact}>
                Confirm you wish to delete the contact: <em>{_get(deletingContact, "lastname")}, {_get(deletingContact, "firstname")}</em>
            </ConfirmModal>
        </Layout>
    );
}

export default IndexPage;
