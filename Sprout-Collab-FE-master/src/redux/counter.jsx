import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Counter1 = ({ setItemData }) => {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleAddItem = () => {
		if (!inputValue) {
			setErrorMessage("Please enter an item");
			return;
		}

		if (items.includes(inputValue)) {
			setErrorMessage("Item already exists");
			return;
		}

		setItems((prevItems) => [...prevItems, inputValue]);
		setItemData(items);
		setInputValue("");
		setErrorMessage("");
	};

	useEffect(() => {
		items.map((item, index) => console.log(index, item));
	}, [items]);
	const handleDeleteItem = (itemToDelete) => {
		setItems(items.filter((item) => item !== itemToDelete));
	};

	return (
		<div className="cloneItems-container">
			<div className="new-item">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button
					className="btn--primary"
					onClick={handleAddItem}
				>
					Add
				</button>
			</div>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<span>{item}</span>
						<button
							className="delete-btn"
							onClick={() => handleDeleteItem(item)}
						>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Counter1;
