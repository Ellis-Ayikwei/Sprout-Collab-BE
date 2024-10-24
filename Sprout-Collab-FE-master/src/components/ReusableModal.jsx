import React, { useEffect, useRef } from "react";
import Modal from "react-modal";

const customStyles = {
	overlay: {
		background: "rgba(68, 130, 56, 0.3)",
		boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
		backdropFilter: "blur(6.1px)",
		WebkitBackdropFilter: "blur(6.1px)",
		border: "1px solid rgba(68, 130, 56, 0.45)",
		zIndex: "1000",
		overflowY: "scroll",
	},
	content: {
		top: "50%",
		left: "50%",
		width: "80%",
		right: "auto",
		bottom: "auto",
		maxHeight: "80vh",
		scrollbars: "hide",

		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "16px",
		position: "relative",
		zIndex: "999",
		backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 70%)",
		boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
		backdropFilter: "blur(7.1px)",
		WebkitBackdropFilter: "blur(6.1px)",
		border: "1px solid rgba(255, 255, 255, 0.45)",
	},
};

const ReusableModal = ({ isOpen, onRequestClose, label, children }) => {
	const modalRef = useRef(null);

	const handleClickOutside = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			onRequestClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
			contentLabel={label}
			ariaHideApp={false}
		>
			<div ref={modalRef}>{children}</div>
		</Modal>
	);
};

export default ReusableModal;
