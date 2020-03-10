//@flow
import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import "./confirmModal.scss";

type Props = {
    isOpen: Boolean,
    onConfirm: Function,
    onClose: Function,
    children: Object,
    title: string
}

const ConfirmModal = (props: Props) => {
    return <Modal
        isOpen={props.isOpen}
        style={{ content: {
            maxWidth: "300px",
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
        <header className="confirm-header">
            {props.title}
            <span className="close-button" onClick={props.onClose}><FontAwesomeIcon icon={faTimesCircle} /></span>
        </header>
        <section className="confirm-container">
            {props.children}
        </section>
        <footer className="confirm-footer">
            <button className="submit" type="button" onClick={props.onConfirm}>Yes</button>
            <button className="cancel" type="button" onClick={props.onClose}>No</button>
        </footer>
    </Modal>
};

export default ConfirmModal;
