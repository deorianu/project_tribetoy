import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedFields(user);
  };

  const handleChange = (e) => {
    setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(updatedFields));
    setUser(updatedFields);
    setEditMode(false);
    context.setAlertBox({ open: true, msg: "Profile updated!", error: false });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signIn");
  };

  return (
    <section className="section MyAccount">
      <div className="container">
        <h2>My Account</h2>
        {user ? (
          <div className="account-details">
            {editMode ? (
              <>
                <input type="text" name="name" value={updatedFields.name} onChange={handleChange} />
                <input type="email" name="email" value={updatedFields.email} onChange={handleChange} />
                <input type="number" name="phone" value={updatedFields.phone} onChange={handleChange} />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button onClick={handleEdit}>Edit Profile</button>
              </>
            )}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>No user found. Please <a href="/signIn">Sign In</a>.</p>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
