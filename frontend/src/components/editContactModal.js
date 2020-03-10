//@flow
import React from "react";
import Modal from "react-modal";
import { Field, Form, Formik} from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import "./editContactModal.scss";

type Props = {
    isOpen: Boolean,
    contact: Contact,
    onSave: Function,
    onClose: Function,
}

const EditContactModal = (props: Props) => {
    return <Modal
        isOpen={props.isOpen}
        style={{ content: {
            maxWidth: "450px",
            position: "fixed",
            left: "50%",
            top: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
        }}}
        onRequestClose={props.onClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
    >
        <Formik
            initialValues={{
                id: null,
                firstname: "",
                lastname: "",
                email: "",
                ...props.contact
            }}
            onSubmit={props.onSave}
        >
        {() => {
            return (
                <Form>
                    <header className="edit-contact-header">
                        {props.contact ? "Edit" : "New" } Contact
                        <span className="close-button" onClick={props.onClose}><FontAwesomeIcon icon={faTimesCircle} /></span>
                    </header>
                    <section className="edit-contact-container">
                        <div className="edit-contact-label">Last Name</div>
                        <div className="edit-contact-control">
                            <Field
                                className="input"
                                name="lastname"
                                placeholder="Last Name"
                                required={true} />
                        </div>
                        <div className="edit-contact-label">First Name</div>
                        <div className="edit-contact-control">
                            <Field
                                className="input"
                                name="firstname"
                                placeholder="First Name"
                                required={true} />
                        </div>
                        <div className="edit-contact-label">Email</div>
                        <div className="edit-contact-control">
                            <Field
                                className="input"
                                name="email"
                                placeholder="Email"
                                required={true} />
                        </div>
                    </section>
                    <footer className="edit-contact-footer">
                        <button className="submit" type="submit">Save</button>
                        <button className="cancel" type="button" onClick={props.onClose}>Cancel</button>
                    </footer>
                </Form>
            );
        }}
        </Formik>
    </Modal>
};

export default EditContactModal;
