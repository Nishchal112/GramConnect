import { useState } from "react";


export default function Form({ isOpen, onClose, onCardAdded }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/addinitcard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) { // ✅ Refresh the list after adding a card
                setFormData({ title: "", description: "", image: "" }); // Clear form
                onClose(); // Close popup
                window.location.reload();
            } else {
                console.error("Error adding card:", result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <style jsx global>
                {`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .close-button {
      position: absolute;
  bottom: 80%;
  left: 80%;
  color: black;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  }

  form input,
  form textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  form button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }

  form button:hover {
    background: #0056b3;
  }
`}
            </style>


            <div className="modal">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h3>Add New Initiative</h3>
                    <form onSubmit={handleSubmit} >
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
